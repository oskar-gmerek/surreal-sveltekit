# Stage 1: Build
FROM node:20 as builder
WORKDIR /app
COPY . .
RUN curl -fsSL https://bun.sh/install | bash && \ 
    /root/.bun/bin/bun install --frozen-lockfile && \
    /root/.bun/bin/bun svelte-kit sync && \
    /root/.bun/bin/bun run check && \
    /root/.bun/bin/bun run build 

# Stage 2: Copy build artifacts and dependencies
FROM node:20-slim as deps
WORKDIR /app
COPY --from=builder /app/build ./build/
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lockb ./bun.lockb
COPY --from=builder /root/.bun/bin/bun /usr/local/bin/bun
RUN bun install --production

# Stage 3: Run sveltekit in production mode with node runner
FROM gcr.io/distroless/nodejs20-debian11 as runner
WORKDIR /app
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/build ./build/
COPY /static ./static/
COPY --from=deps /app/node_modules ./node_modules/
EXPOSE 3000
CMD ["build"]