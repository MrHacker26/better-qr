FROM oven/bun:1.3.6-alpine AS base

WORKDIR /app

ENV PORT=4000

COPY . .

RUN bun install --production --frozen-lockfile
RUN bun run build:server

FROM oven/bun:1.3.6-alpine AS production

WORKDIR /app

COPY --from=base /app/apps/server/dist ./dist

EXPOSE 4000
CMD ["bun", "run", "dist/index.js"]
