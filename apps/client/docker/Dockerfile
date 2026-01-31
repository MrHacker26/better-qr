FROM oven/bun:1.3.6-alpine AS base

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile
RUN bun run build:client

# Set build environment variables
ENV VITE_API_BASE_URL=/server

FROM joseluisq/static-web-server:2.30-alpine AS release

RUN apk add --no-cache curl

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=base /app/apps/client/dist/ ./

# Change the ownership of the /app directory to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

EXPOSE 80

HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
  CMD curl -f http://127.0.0.1/health || exit 1

CMD [ "static-web-server", "--health", "--port", "80", "--page-fallback", "index.html", "--root", "." ]