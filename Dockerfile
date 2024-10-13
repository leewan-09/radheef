# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
FROM node:20.18.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk update
RUN apk add --no-cache make gcc g++ libc6-compat bash python3
WORKDIR /app

COPY prisma ./
COPY package.json pnpm-lock.yaml ./

RUN npm install -g node-gyp

RUN corepack enable pnpm && pnpm i

FROM base AS builder
WORKDIR /app
RUN mkdir -p /app/.next/cache
VOLUME ["/app/.next/cache"]
COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN corepack enable pnpm && SKIP_ENV_VALIDATION=1 pnpm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV PORT 5004
CMD ["node", "server.js"]