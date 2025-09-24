# node:image version from docker registry
FROM node:24.8.0-alpine3.21

# name of folder inside container
WORKDIR /code

# copy host file pattern location -> container location
COPY package*.json .

# clean installation
RUN npm ci

# copy everything from location of dockerfile -> working directory in container
COPY . .

# npm run dev (exection)
CMD ["npm", "run", "dev:watch"]