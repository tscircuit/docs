# tscircuit docs - Development Guidelines

- Use `bun` not `node`/`npx`/`npm`

## Commands

- **Start development server**: `bun run start`
- **Build site**: `bun run build`
- **Serve built site**: `bun run serve`
- **Type check**: `bun run typecheck`
- **Format code**: `bunx @biomejs/biome format --write .`
- **Lint code**: `bunx @biomejs/biome lint .`

## Code Style

- **Formatting**: Use Biome formatter with space indentation
- **Imports**: Use organized imports (auto-sortable by Biome)
- **JSX**: Use double quotes for JSX attributes
- **Semicolons**: Prefer to omit except when necessary
- **Naming**: Use kebab-case for filenames
- **Types**: TypeScript is used throughout, explicit "any" is allowed
- **Error handling**: Follow React/Docusaurus error boundary patterns
- **Markdown**: Follow standard Docusaurus MDX patterns

## Documentation Standards

- Keep documentation concise and example-focused
- Include working code examples where possible
- Use proper heading hierarchy (h1 → h2 → h3)
- Images should include descriptive alt text

## Testing tscircuit TSX Code

- To test tscircuit TSX code, create a new file in the `codetestingplayground`
  directory and add the code you want to test, then run `tsci build <filename>.circuit.tsx`
- You may also want to generate snapshots via `tsci snapshot <filename>.circuit.tsx`
  and inspect the results
- The autorouter and DRC often throws errors and this is expected since the
  product is in early stages of development, use `tsci build --ignore-errors` to ignore
  non-fatal errors
- Prefer `bunx` over `npx`

## Error Tracking Source Maps

- `bun run build` generates hidden source maps and, when PostHog credentials
  are present, uploads them so Error Tracking can symbolicate JavaScript stack
  traces from docs.tscircuit.com (see `scripts/upload-sourcemaps.ts`).
- The upload only runs when `POSTHOG_CLI_API_KEY` and `POSTHOG_CLI_PROJECT_ID`
  are set. Configure these in the Vercel project settings (project id `114805`).
  Without them the build strips the `.map` files and skips the upload, so local
  and PR builds are unaffected.
