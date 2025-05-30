FROM node:20-alpine as base

FROM base AS builder

WORKDIR /workspace

COPY package.json ./
COPY yarn.lock ./
COPY turbo.json ./
COPY ./apps/backend/package.json ./apps/backend/package.json
COPY ./apps/backend ./apps/backend
COPY ./packages ./packages

ARG DATABASE_URL

RUN pnpm install && pnpm prepare && pnpm predev && pnpm turbo run build --filter=backend

FROM base AS runner

WORKDIR /workspace

USER node

COPY --from=builder --chown=node:node /workspace/ ./

ENV TZ Asia/Seoul
ENV NODE_ENV production
EXPOSE 8080

VOLUME ["./apps/backend/logs"]

CMD cd ./apps/backend && pnpm start --filter=backend
