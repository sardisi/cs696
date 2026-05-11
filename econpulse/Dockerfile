FROM node:22-alpine AS build
WORKDIR /build
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

FROM node:22-alpine
WORKDIR /Pace-app
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY server/src ./src
COPY server/.env ./.env
COPY --from=build /build/build ./public
EXPOSE 3001
CMD ["node", "src/app.js"]
