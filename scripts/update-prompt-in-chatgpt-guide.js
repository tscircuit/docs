#!/usr/bin/env node

const fs = require("fs")
const https = require("https")

const GITHUB_URL =
  "https://raw.githubusercontent.com/tscircuit/tscircuit-prompts/refs/heads/main/lib/prompts/tscircuit-syntax.ts"
const MDX_FILE_PATH = "./docs/intro/quickstart-ChatGPT.mdx"

function fetchFromGitHub(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = ""
        res.on("data", (chunk) => {
          data += chunk
        })
        res.on("end", () => {
          resolve(data)
        })
      })
      .on("error", (err) => {
        reject(err)
      })
  })
}

async function updateMdxFile() {
  try {
    // Fetch content from GitHub
    console.log("Fetching tscircuit-syntax.ts from GitHub...")
    const tsContent = await fetchFromGitHub(GITHUB_URL)

    // Read the current MDX file
    console.log("Reading current MDX file...")
    const mdxContent = fs.readFileSync(MDX_FILE_PATH, "utf8")

    // Find the markdown code fence and replace only the primer section
    const fenceHeader = "```md\n"
    const codeBlockStart = mdxContent.indexOf(fenceHeader)
    const codeBlockEnd = mdxContent.indexOf("\n```", codeBlockStart)

    if (codeBlockStart === -1 || codeBlockEnd === -1) {
      throw new Error("Could not find markdown code block in MDX file")
    }

    // Extract the TypeScript content inside the template literal
    const tsMatch = tsContent.match(
      /export const [^=]*=`([\s\S]*?)`\s*\.trim\(\)\s*$/,
    )
    if (!tsMatch) {
      throw new Error(
        "Could not extract template literal from fetched tscircuit syntax file",
      )
    }
    const cleanTsContent = tsMatch[1].trim()

    // Identify the primer region in both the fetched content and the existing MDX code fence
    const primerMarker = "Here's a quick primer on how to use tscircuit:"
    const tsPrimerStart = cleanTsContent.indexOf(primerMarker)
    if (tsPrimerStart === -1) {
      throw new Error("Could not find primer marker in fetched content")
    }
    const newPrimerSection = cleanTsContent.substring(tsPrimerStart)

    const codeBlockBodyStart = codeBlockStart + fenceHeader.length
    const codeBlockBody = mdxContent.substring(codeBlockBodyStart, codeBlockEnd)
    const mdxPrimerStart = codeBlockBody.indexOf(primerMarker)
    if (mdxPrimerStart === -1) {
      throw new Error("Could not find primer marker in MDX code block")
    }

    const preservedIntro = codeBlockBody.substring(0, mdxPrimerStart)
    // Unescape backticks in the new primer section
    const unescapedPrimerSection = newPrimerSection.replace(/\\`/g, "`")
    const newCodeBlockBody = preservedIntro + unescapedPrimerSection

    const beforeCodeBlock = mdxContent.substring(0, codeBlockBodyStart)
    const afterCodeBlock = mdxContent.substring(codeBlockEnd)

    const newMdxContent = beforeCodeBlock + newCodeBlockBody + afterCodeBlock

    // Write the updated content back to the file
    console.log("Updating MDX file...")
    fs.writeFileSync(MDX_FILE_PATH, newMdxContent, "utf8")

    console.log(
      "Successfully updated the ChatGPT guide with latest tscircuit syntax!",
    )
  } catch (error) {
    console.error("Error updating MDX file:", error.message)
    process.exit(1)
  }
}

updateMdxFile()
