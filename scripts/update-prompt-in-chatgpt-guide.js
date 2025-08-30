#!/usr/bin/env node

const fs = require('fs')
const https = require('https')

const GITHUB_URL = 'https://raw.githubusercontent.com/tscircuit/tscircuit-prompts/refs/heads/main/lib/prompts/tscircuit-syntax.ts'
const MDX_FILE_PATH = './docs/intro/quickstart-ChatGPT.mdx'

function fetchFromGitHub(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        resolve(data)
      })
    }).on('error', (err) => {
      reject(err)
    })
  })
}

async function updateMdxFile() {
  try {
    // Fetch content from GitHub
    console.log('Fetching tscircuit-syntax.ts from GitHub...')
    const tsContent = await fetchFromGitHub(GITHUB_URL)
    
    // Read the current MDX file
    console.log('Reading current MDX file...')
    const mdxContent = fs.readFileSync(MDX_FILE_PATH, 'utf8')
    
    // Find the markdown code fence and replace its content
    const codeBlockStart = mdxContent.indexOf('```md\n')
    const codeBlockEnd = mdxContent.indexOf('\n```', codeBlockStart)
    
    if (codeBlockStart === -1 || codeBlockEnd === -1) {
      throw new Error('Could not find markdown code block in MDX file')
    }
    
    // Extract the TypeScript content (remove export statement if present)
    const cleanTsContent = tsContent.replace(/^export\s+.*$/gm, '').trim()
    
    // Replace the content inside the code fence
    const beforeCodeBlock = mdxContent.substring(0, codeBlockStart + 6) // includes '```md\n'
    const afterCodeBlock = mdxContent.substring(codeBlockEnd)
    
    const newMdxContent = beforeCodeBlock + cleanTsContent + afterCodeBlock
    
    // Write the updated content back to the file
    console.log('Updating MDX file...')
    fs.writeFileSync(MDX_FILE_PATH, newMdxContent, 'utf8')
    
    console.log('Successfully updated the ChatGPT guide with latest tscircuit syntax!')
    
  } catch (error) {
    console.error('Error updating MDX file:', error.message)
    process.exit(1)
  }
}

updateMdxFile()