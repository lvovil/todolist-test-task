# Build image
FROM node:16 as build

RUN mkdir /tmp-build
WORKDIR /tmp-build
COPY . .

RUN npm ci && \
    npm run build && \
    npm prune --production

# Runtime image
FROM node:16-alpine

RUN mkdir /opt/app
WORKDIR /opt/app

ENV NODE_ENV production
USER node
COPY --from=build --chown=node:node /tmp-build/ ./

EXPOSE 8000
CMD ["node", "dist/main.js"]
