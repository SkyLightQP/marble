FROM node:22-alpine as base

FROM base AS builder

WORKDIR /workspace

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY turbo.json ./
COPY ./apps/backend/package.json ./apps/backend/package.json
COPY ./apps/backend ./apps/backend
COPY ./packages ./packages

ARG DATABASE_URL

RUN pnpm install && pnpm prepare && pnpm predev && pnpm turbo run build --filter=@marble/backend

FROM base AS runner

WORKDIR /workspace

USER node

COPY --from=builder --chown=node:node /workspace/ ./

ENV TZ Asia/Seoul
ENV NODE_ENV production
EXPOSE 8080

VOLUME ["./apps/backend/logs"]

CMD cd ./apps/backend && pnpm start --filter=@marble/backend
