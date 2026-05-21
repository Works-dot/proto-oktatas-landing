FROM node:22-slim
WORKDIR /app

COPY dist-api ./dist-api
COPY public ./public
COPY drizzle ./drizzle

ENV NODE_ENV=production
ENV STATIC_DIR=/app/public
ENV MIGRATIONS_DIR=/app/drizzle
ENV PORT=3000

EXPOSE 3000
CMD ["node", "--enable-source-maps", "./dist-api/index.mjs"]
