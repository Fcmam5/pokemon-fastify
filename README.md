# Fastify & Typescript App

## Description

Fastify & TypeScript starter repository.

## Installation

```bash
$ git clone git@github.com:Fcmam5/pokemon-fastify.git
$ cd pokemon-fastify
$ npm install
```

## Requirements

** Node.js ** `12.9.0` or higher; Or just run [`nvm use`](./.nvmrc) to use the recommended version

## Usage

```bash
# development: hot reload with nodemon
$ npm run dev

# debug
$ npm run debug

# test
$ npm test

# test (watch mode)
$ npm run test:watch


# check linting
$ npm run lint

# format with prettier
$ npm run format

# build for production
$ npm run build

# production
$ npm run prod
```


### Using Docker

```bash
# Build the image
docker build . -t "fcmam5/poke:$(jq .version package.json -r)" # You may need to install "jq"; or use: grep version package.json | awk -F \" '{print $4}'

# Run the image (v0.1.0-SNAPSHOT as example)
docker run -p 3000:3000 fcmam5/poke:0.1.0-SNAPSHOT

```

The image is public on [Docker Hub](https://hub.docker.com/r/fcmam5/poke) and can be pulled using `docker pull fcmam5/poke` command.