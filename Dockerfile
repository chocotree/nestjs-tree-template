FROM node:16.18-alpine as base

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

# # docker run --target dev
# FROM base as dev
# RUN npm install -g @nestjs/cli
# RUN npm i
# COPY . .
# CMD ["npm", "run", "start:dev"]

# docker run --target prod
FROM base as prod
ENV NODE_ENV=production
RUN npm install --production

# make sure to add .dockerignore for node_modules and dist
COPY . .

RUN npm install -g @nestjs/cli
RUN npm run build

# make sure only import code in src folder
CMD ["node", "dist/main"]