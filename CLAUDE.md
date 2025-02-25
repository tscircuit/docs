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