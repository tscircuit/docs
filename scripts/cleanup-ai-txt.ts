import fs from "node:fs"
import path from "node:path"

const aiTxtPath = path.join(process.cwd(), "build/ai.txt")

// Read the file
let content = fs.readFileSync(aiTxtPath, "utf-8")

// Define regex patterns to remove
const importPatterns = [
  /import\s+CircuitPreview\s+from\s+["']@site\/src\/components\/CircuitPreview["'];?\n?/g,
  /import\s+TscircuitIframe\s+from\s+["']@site\/src\/components\/TscircuitIframe["'];?\n?/g,
]

// Apply each regex replacement
for (const pattern of importPatterns) {
  content = content.replace(pattern, "")
}

// Write back to the file
fs.writeFileSync(aiTxtPath, content, "utf-8")
