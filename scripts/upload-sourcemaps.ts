import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"

// Uploads the production source maps emitted by the build to PostHog so that
// Error Tracking can symbolicate stack traces from docs.tscircuit.com. Runs
// as part of `bun run build` (see package.json), after `docusaurus build`.
//
// Required environment variables (set these in the Vercel project settings so
// the upload only happens for real deployments):
//   POSTHOG_CLI_API_KEY     A PostHog personal API key with error tracking
//                           write scope (also accepts POSTHOG_CLI_TOKEN).
//   POSTHOG_CLI_PROJECT_ID  The tscircuit project id, 114805 (also accepts
//                           POSTHOG_CLI_ENV_ID).
//   POSTHOG_CLI_HOST        Optional, defaults to https://us.posthog.com.
//
// When the credentials are absent (local builds, PR CI, preview deploys
// without secrets) the upload is skipped and any generated .map files are
// removed so raw source maps are never shipped to production.

const buildDir = path.join(process.cwd(), "build")

function findMapFiles(dir: string, acc: string[] = []): string[] {
  if (!fs.existsSync(dir)) return acc
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      findMapFiles(full, acc)
    } else if (entry.name.endsWith(".map")) {
      acc.push(full)
    }
  }
  return acc
}

if (!fs.existsSync(buildDir)) {
  console.log(
    "[upload-sourcemaps] build/ not found - run 'docusaurus build' first, skipping",
  )
  process.exit(0)
}

const apiKey = process.env.POSTHOG_CLI_API_KEY || process.env.POSTHOG_CLI_TOKEN
const projectId =
  process.env.POSTHOG_CLI_PROJECT_ID || process.env.POSTHOG_CLI_ENV_ID

if (!apiKey || !projectId) {
  const maps = findMapFiles(buildDir)
  for (const file of maps) fs.rmSync(file)
  console.log(
    "[upload-sourcemaps] POSTHOG_CLI_API_KEY / POSTHOG_CLI_PROJECT_ID not set - skipping upload" +
      (maps.length ? ` (removed ${maps.length} local .map files)` : ""),
  )
  process.exit(0)
}

// `--delete-after` uploads the maps and then strips them (and any
// sourceMappingURL comments) from the build output so they are not deployed.
const args = [
  "@posthog/cli",
  "sourcemap",
  "process",
  "--directory",
  buildDir,
  "--delete-after",
  "--release-name",
  "tscircuit-docs",
]

const releaseVersion =
  process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA
if (releaseVersion) {
  args.push("--release-version", releaseVersion)
}

console.log("[upload-sourcemaps] uploading source maps to PostHog...")
execFileSync("bunx", args, { stdio: "inherit" })
console.log("[upload-sourcemaps] done")
