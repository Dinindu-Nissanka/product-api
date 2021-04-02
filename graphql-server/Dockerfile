FROM node:14.5.0-alpine as builder
WORKDIR /build

ENV NODE_ENV=development

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm set progress=false
RUN npm install

COPY ./config ./config
COPY ./src ./src
COPY ./tsconfig.json ./tsconfig.json

RUN npm run build

# --------------

FROM node:14.5.0-alpine
ENV NODE_ENV=development

WORKDIR /application

RUN chown -R node:node /application
USER node

COPY --from=builder /build/dist/ ./dist/
COPY --from=builder /build/package.json/ ./
COPY --from=builder /build/node_modules/ ./node_modules
COPY --from=builder /build/config/ ./config
EXPOSE 4000
CMD ["npm", "run", "server:docker"]