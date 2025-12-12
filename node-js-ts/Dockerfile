# ---------- Stage 0: base ------------------
FROM node:24.8.0-alpine3.21 AS base
WORKDIR /code
COPY package*.json .
RUN npm ci

# ---------- Stage 1: dev ----------
FROM base AS dev
CMD ["npm", "run", "dev"]

# ---------- Stage 2: builder ----------
FROM base AS builder
COPY src ./src
COPY tsconfig.json .
RUN npm run build

# ---------- Stage 3: production ----------
FROM node:24.8.0-alpine3.21 AS prod
ENV NODE_ENV=production
COPY package*.json .
WORKDIR /code
RUN npm ci --omit=dev
COPY --from=builder /code/dist  ./dist
CMD ["npm", "run", "start"]