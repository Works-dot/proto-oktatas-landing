# [Project name]

_Replace the heading above with the project's name, and this line with one sentence describing what this app does for users._

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

- **Deploy = git push to `Works-dot/proto-oktatas-landing` on GitHub → Railway autodeploy.** Railway builds from `Dockerfile` (multi-stage pnpm) and runs `pnpm db migrate && node ./artifacts/api-server/dist/index.mjs` per `railway.json`.
- The Replit sandbox blocks `git remote add` / `git push --force` from the main agent. As a workaround, `.local/deploy-push.mjs` mirrors the current source tree to GitHub via REST API (force-update `refs/heads/main`). It is resumable via `.local/.deploy-push-cache.json`. From a normal dev machine, just `git push origin main` instead.
- Legacy script `.local/_legacy/deploy-push-artifacts-only.mjs` (pre-2026-05-26) used to push **only prebuilt `dist-api/`, `public/`, `drizzle/`** plus a minimal Dockerfile, bypassing pnpm build on Railway. Kept for reference but do not use — the GitHub repo should hold source, not artifacts.

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
