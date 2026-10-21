# Portfolio Sanity Studio

Standalone content editor for project `gy3g0tff`, dataset `production`.

```bash
npm install
npm run dev
npm run build
```

Run from this directory, or use `npm run dev:studio` / `npm run build:studio` from the repository root. Studio opens at http://localhost:3333.

`project.ts` supplies the project and dataset to both Studio and CLI. `schemaTypes/` is the schema source of truth; `../sanity/schemas/` contains compatibility exports.

Create and publish content for the frontend to use it. Project and article bodies are arrays of plain-text paragraphs. Social links accept HTTP(S), `mailto:` and `tel:` URLs. The frontend can fall back independently to seed content while CMS collections are empty.

See [the repository setup guide](../README.md#connect-sanity) for frontend environment variables, public dataset access, CORS, and regression checks. Deploy this Studio separately with `npm run deploy`.
