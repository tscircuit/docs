# tscircuit docs - Development Guidelines

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
