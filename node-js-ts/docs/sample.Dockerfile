# ---------- Stage 0: base ------------------

# FROM tells docker that previous stage has ended & new stage starts here
# node:image version from docker registry
FROM node:24.8.0-alpine3.21 AS base

# name of folder inside container
WORKDIR /code

# copy host file pattern location -> container location & install packages
COPY package*.json .

# install all deps (dev + prod) as they are needed for both dev & build
RUN npm ci


# ---------- Stage 1: dev ----------

# rename dev as output of base stage
FROM base AS dev

# code files need not be copied as we are linking using volumes instead in compose file

# default command for dev , can be overwritten by compose
CMD ["npm", "run", "dev"]


# ---------- Stage 2: builder ----------

# rename builder as output of base stage
FROM base AS builder

# copy only whats needed for build (JS-> TS) 
# from location of build context -> working directory in container
COPY src ./src
COPY tsconfig.json .

# compile TS -> JS
RUN npm run build


# ---------- Stage 3: production ----------

# rename prod as output of builder stage
FROM node:24.8.0-alpine3.21 AS prod

# set prod mode
ENV NODE_ENV=production

COPY package*.json .

# name of folder inside container
WORKDIR /code

# install only prod deps needed for production
RUN npm ci --omit=dev

# copy builder output from builder stage's dist to dist inside code
COPY --from=builder /code/dist  ./dist

# default command for prod , can be overwritten by compose
CMD ["npm", "run", "start"]