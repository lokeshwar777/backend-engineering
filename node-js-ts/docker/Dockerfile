# Stage 1 : build for dev

# node:image version from docker registry
FROM node:24.8.0-alpine3.21 AS dev

# name of folder inside container
WORKDIR /code

# copy host file pattern location -> container location
COPY package*.json .
RUN npm ci

# copy everything from location of dockerfile -> working directory in container
COPY . .

# compile TS -> JS
RUN npm run build

# default command for dev , can be overwritten by compose
CMD ["npm", "run", "dev:watch"]

# Stage 2 : build for prod

# node:image version from docker registry
FROM node:24.8.0-alpine3.21 AS prod

# name of folder inside container
WORKDIR /code

# copy host file pattern location -> container location
COPY package*.json .

# clean installation for prod
RUN npm ci --omit=dev

# copy build output from dev stage's dist to dist inside code
COPY --from=dev /code/dist  ./dist

# default command for prod , can be overwritten by compose
CMD ["npm", "run", "start"]