FROM node:22-alpine AS base

FROM base AS builder

RUN apk add --no-cache openssl && npm i -g pnpm

WORKDIR /workspace

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY turbo.json ./
COPY ./apps/backend/package.json ./apps/backend/package.json
COPY ./apps/backend ./apps/backend
COPY ./packages ./packages

ARG DATABASE_URL

RUN pnpm install && pnpm predev && pnpm turbo run build --filter=@marble/backend

FROM base AS runner

WORKDIR /workspace

RUN apk add --no-cache openssl

USER node

COPY --from=builder --chown=node:node /workspace/ ./

ENV TZ=Asia/Seoul
ENV NODE_ENV=production
EXPOSE 8080

VOLUME ["./apps/backend/logs"]

CMD ["sh", "-c", "cd ./apps/backend/dist/src && node main.js"]
