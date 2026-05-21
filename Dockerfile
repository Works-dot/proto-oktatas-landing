FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app

FROM base AS build
COPY . .
RUN pnpm install --frozen-lockfile
ENV BASE_PATH=/
RUN pnpm --filter @workspace/works-landing build \
 && pnpm --filter @workspace/api-server build

FROM base AS runtime
ENV NODE_ENV=production
ENV STATIC_DIR=/app/artifacts/works-landing/dist/public
ENV PORT=8080

COPY --from=build /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/artifacts/api-server/package.json ./artifacts/api-server/package.json
COPY --from=build /app/artifacts/api-server/dist ./artifacts/api-server/dist
COPY --from=build /app/artifacts/api-server/node_modules ./artifacts/api-server/node_modules
COPY --from=build /app/artifacts/works-landing/package.json ./artifacts/works-landing/package.json
COPY --from=build /app/artifacts/works-landing/dist ./artifacts/works-landing/dist
COPY --from=build /app/lib/db ./lib/db
# Ensure the migrations folder is present (drizzle-kit migrate reads from `out`)
COPY --from=build /app/lib/db/drizzle ./lib/db/drizzle
COPY --from=build /app/lib/api-zod ./lib/api-zod

EXPOSE 8080
CMD ["sh", "-c", "pnpm --filter @workspace/db run migrate && node --enable-source-maps ./artifacts/api-server/dist/index.mjs"]
