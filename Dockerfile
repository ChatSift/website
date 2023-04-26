FROM node:16-alpine
LABEL name "website"

WORKDIR /usr/website

RUN apk add --update \
&& apk add --no-cache ca-certificates \
&& apk add --no-cache --virtual .build-deps curl git python3 alpine-sdk openssl1.1-compat

COPY turbo.json package.json tsconfig.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

COPY packages/api/package.json ./packages/api/package.json
COPY packages/frontend/package.json ./packages/frontend/package.json

RUN yarn --immutable

COPY prisma ./prisma
RUN yarn prisma generate

COPY packages/api ./packages/api
COPY packages/frontend ./packages/frontend

RUN yarn turbo run build

RUN yarn workspaces focus --all --production
