import { createHash } from "node:crypto"
import { readFileSync, readdirSync, writeFileSync } from "node:fs"
import { join, relative } from "node:path"

const projectRoot = import.meta.dir
const optionValue = (name: string) => {
  const index = process.argv.indexOf(name)
  return index === -1 ? undefined : process.argv[index + 1]
}

const svgDirectory = optionValue("--svg-dir")
const jsonDirectory = optionValue("--json-dir")
const reportPath = optionValue("--report")
const expectVariation = process.argv.includes("--expect-variation")
const expectStable = process.argv.includes("--expect-stable")

if (!svgDirectory && !jsonDirectory) {
  throw new Error("--svg-dir or --json-dir is required")
}
if (expectVariation && expectStable) {
  throw new Error("Choose only one expectation")
}
if (!reportPath) {
  throw new Error("--report is required")
}

const sha256 = (value: Buffer | string) =>
  createHash("sha256").update(value).digest("hex")

const listFiles = (directory: string, pattern: RegExp) =>
  readdirSync(directory)
    .filter((name) => pattern.test(name))
    .sort((left, right) =>
      left.localeCompare(right, undefined, { numeric: true }),
    )
    .map((name) => join(directory, name))

const addField = (
  fields: Map<
    string,
    {
      field: string
      classification: string
      occurrences: number
      examples: unknown[]
    }
  >,
  field: string,
  classification: string,
  example: unknown,
) => {
  const current = fields.get(field)
  if (current) {
    current.occurrences += 1
    if (current.examples.length < 5) current.examples.push(example)
    return
  }
  fields.set(field, {
    field,
    classification,
    occurrences: 1,
    examples: [example],
  })
}

const linePairs = (oldLines: string[], newLines: string[]) => {
  const table = Array.from({ length: oldLines.length + 1 }, () =>
    new Array<number>(newLines.length + 1).fill(0),
  )
  for (let oldIndex = oldLines.length - 1; oldIndex >= 0; oldIndex -= 1) {
    for (let newIndex = newLines.length - 1; newIndex >= 0; newIndex -= 1) {
      table[oldIndex][newIndex] =
        oldLines[oldIndex] === newLines[newIndex]
          ? table[oldIndex + 1][newIndex + 1] + 1
          : Math.max(
              table[oldIndex + 1][newIndex],
              table[oldIndex][newIndex + 1],
            )
    }
  }
  const pairs: { oldIndex?: number; newIndex?: number }[] = []
  let oldIndex = 0
  let newIndex = 0
  while (oldIndex < oldLines.length && newIndex < newLines.length) {
    if (oldLines[oldIndex] === newLines[newIndex]) {
      pairs.push({ oldIndex, newIndex })
      oldIndex += 1
      newIndex += 1
    } else if (table[oldIndex + 1][newIndex] >= table[oldIndex][newIndex + 1]) {
      pairs.push({ oldIndex })
      oldIndex += 1
    } else {
      pairs.push({ newIndex })
      newIndex += 1
    }
  }
  while (oldIndex < oldLines.length) pairs.push({ oldIndex: oldIndex++ })
  while (newIndex < newLines.length) pairs.push({ newIndex: newIndex++ })
  return pairs
}

const attributeMap = (line: string) => {
  const attributes = new Map<string, string>()
  const tagPattern = /<([\w:-]+)([^>]*)>/g
  while (true) {
    const tagMatch = tagPattern.exec(line)
    if (!tagMatch) break
    const attributePattern = /([:\w-]+)="([^"]*)"/g
    while (true) {
      const attributeMatch = attributePattern.exec(tagMatch[2])
      if (!attributeMatch) break
      attributes.set(`${tagMatch[1]}.${attributeMatch[1]}`, attributeMatch[2])
    }
  }
  return attributes
}

const classifySvgLine = (oldLine: string, newLine: string) => {
  if (
    `${oldLine}\n`.replace("\r\n", "\n") ===
    `${newLine}\n`.replace("\r\n", "\n")
  ) {
    return { field: "line-ending", classification: "line-ending" }
  }
  const oldAttributes = attributeMap(oldLine)
  const newAttributes = attributeMap(newLine)
  const changedAttributes = [
    ...new Set([...oldAttributes.keys(), ...newAttributes.keys()]),
  ].filter((key) => oldAttributes.get(key) !== newAttributes.get(key))
  if (changedAttributes.length > 0) {
    return {
      field: changedAttributes.sort().join(","),
      classification: "svg-attribute",
    }
  }
  if (oldLine.includes("<style") || newLine.includes("<style")) {
    return { field: "style.css-template", classification: "svg-style" }
  }
  if (oldLine.trim() === "" || newLine.trim() === "") {
    return { field: "whitespace", classification: "whitespace" }
  }
  return { field: "svg-text", classification: "svg-text" }
}

const analyzeSvg = (directory: string) => {
  const files = listFiles(directory, /\.svg$/i)
  if (files.length < 1) throw new Error(`No SVG captures in ${directory}`)
  const records = files.map((path) => {
    const bytes = readFileSync(path)
    const text = bytes.toString("utf8")
    return {
      path: relative(projectRoot, path),
      bytes: bytes.length,
      sha256: sha256(bytes),
      normalizedSha256: sha256(text.replace(/\r\n/g, "\n")),
      lines: text.split("\n"),
    }
  })
  const reference = records[0]
  const fields = new Map<
    string,
    {
      field: string
      classification: string
      occurrences: number
      examples: unknown[]
    }
  >()
  const byteDiffs: unknown[] = []
  let unclassified = 0
  const comparableLines = (lines: string[]) =>
    lines.map((line) => (line.endsWith("\r") ? line.slice(0, -1) : line))
  for (const current of records.slice(1)) {
    const pairs = linePairs(
      comparableLines(reference.lines),
      comparableLines(current.lines),
    )
    let oldLineOffset = 0
    let newLineOffset = 0
    for (const pair of pairs) {
      const oldLine =
        pair.oldIndex === undefined ? undefined : reference.lines[pair.oldIndex]
      const newLine =
        pair.newIndex === undefined ? undefined : current.lines[pair.newIndex]
      if (
        oldLine === undefined ||
        newLine === undefined ||
        oldLine !== newLine
      ) {
        const oldBytes = Buffer.from(oldLine ?? "")
        const newBytes = Buffer.from(newLine ?? "")
        const classification = classifySvgLine(oldLine ?? "", newLine ?? "")
        addField(fields, classification.field, classification.classification, {
          file: current.path,
          old: oldLine ?? null,
          new: newLine ?? null,
        })
        byteDiffs.push({
          file: current.path,
          oldLine: pair.oldIndex === undefined ? null : pair.oldIndex + 1,
          newLine: pair.newIndex === undefined ? null : pair.newIndex + 1,
          oldByteStart: oldLineOffset,
          oldByteEnd: oldLineOffset + oldBytes.length,
          newByteStart: newLineOffset,
          newByteEnd: newLineOffset + newBytes.length,
          oldHex: oldBytes.toString("hex"),
          newHex: newBytes.toString("hex"),
          oldText: oldLine ?? null,
          newText: newLine ?? null,
          field: classification.field,
          classification: classification.classification,
        })
        if (!classification.field) unclassified += 1
      }
      if (pair.oldIndex !== undefined) {
        oldLineOffset += Buffer.byteLength(reference.lines[pair.oldIndex]) + 1
      }
      if (pair.newIndex !== undefined) {
        newLineOffset += Buffer.byteLength(current.lines[pair.newIndex]) + 1
      }
    }
  }
  return {
    directory: relative(projectRoot, directory),
    files: records.map(({ lines: _lines, ...record }) => record),
    uniqueSha256: new Set(records.map((record) => record.sha256)).size,
    uniqueNormalizedSha256: new Set(
      records.map((record) => record.normalizedSha256),
    ).size,
    varyingFields: [...fields.values()].sort((left, right) =>
      left.field.localeCompare(right.field),
    ),
    byteDiffs,
    unclassified,
  }
}

const canonical = (value: unknown) => JSON.stringify(value)

const analyzeJson = (directory: string) => {
  const files = listFiles(directory, /^circuit_json-\d+$/)
  if (files.length < 1)
    throw new Error(`No Circuit JSON captures in ${directory}`)
  const records = files.map((path) => {
    const bytes = readFileSync(path)
    return {
      path: relative(projectRoot, path),
      bytes: bytes.length,
      sha256: sha256(bytes),
      value: JSON.parse(bytes.toString("utf8")) as unknown[],
    }
  })
  const fields = new Map<
    string,
    {
      field: string
      classification: string
      occurrences: number
      examples: unknown[]
    }
  >()
  let diffCount = 0
  const reference = records[0].value
  const walk = (oldValue: unknown, newValue: unknown, path: string) => {
    if (canonical(oldValue) === canonical(newValue)) return
    diffCount += 1
    if (Array.isArray(oldValue) && Array.isArray(newValue)) {
      const length = Math.max(oldValue.length, newValue.length)
      for (let index = 0; index < length; index += 1) {
        walk(oldValue[index], newValue[index], `${path}[${index}]`)
      }
      return
    }
    if (
      oldValue &&
      newValue &&
      typeof oldValue === "object" &&
      typeof newValue === "object" &&
      !Array.isArray(oldValue) &&
      !Array.isArray(newValue)
    ) {
      const oldObject = oldValue as Record<string, unknown>
      const newObject = newValue as Record<string, unknown>
      for (const key of new Set([
        ...Object.keys(oldObject),
        ...Object.keys(newObject),
      ])) {
        walk(oldObject[key], newObject[key], path ? `${path}.${key}` : key)
      }
      return
    }
    const normalizedField = path.replace(/\[\d+\]/g, "[]")
    const classification = normalizedField.includes(
      "source_unnamed_trace_warning",
    )
      ? "warning-record"
      : normalizedField.includes("_id") ||
          normalizedField.includes("source_trace")
        ? "identifier-order"
        : normalizedField.includes("edges") ||
            normalizedField.includes("center") ||
            normalizedField.includes("position")
          ? "schematic-geometry"
          : normalizedField.includes("connected_source") ||
              normalizedField.includes("connectivity")
            ? "source-connectivity"
            : "circuit-json-value"
    addField(fields, normalizedField, classification, {
      path,
      old: oldValue,
      new: newValue,
    })
  }
  for (const current of records.slice(1)) walk(reference, current.value, "")
  return {
    directory: relative(projectRoot, directory),
    files: records.map(({ value: _value, ...record }) => record),
    uniqueSha256: new Set(records.map((record) => record.sha256)).size,
    diffCount,
    varyingFields: [...fields.values()].sort((left, right) =>
      left.field.localeCompare(right.field),
    ),
  }
}

const svg = svgDirectory ? analyzeSvg(svgDirectory) : undefined
const circuitJson = jsonDirectory ? analyzeJson(jsonDirectory) : undefined
const uniqueSha256 = Math.max(
  svg?.uniqueSha256 ?? 0,
  circuitJson?.uniqueSha256 ?? 0,
)
const varyingFieldCount =
  (svg?.varyingFields.length ?? 0) + (circuitJson?.varyingFields.length ?? 0)
const hasVariation = uniqueSha256 > 1 && varyingFieldCount > 0
if (expectVariation && !hasVariation) {
  throw new Error(
    "Expected captured output variation, but the report found none",
  )
}
if (expectStable && hasVariation) {
  throw new Error(
    "Expected stable captured output, but the report found variation",
  )
}
const report = {
  svg,
  circuitJson,
  uniqueSha256,
  varyingFieldCount,
  allSvgDiffsClassified: (svg?.unclassified ?? 0) === 0,
}
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`)
console.log(
  `${svg?.files.length ?? 0} SVG outputs; ${uniqueSha256} unique SHA-256 values; ${varyingFieldCount} varying fields classified`,
)
