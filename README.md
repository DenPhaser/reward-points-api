# WebAPI using NestJS

## Installation

Install node_modules.
```bash
$ npm install
```

Create a `.env` file. Refer to `.env.example`. Set up correct database connection.
Use `create.sql` in `/scripts` to create a database, or simply run `docker-compose up`:

```bash
# from scripts folder
$ docker-compose up --force-recreate -V

# from root folder
$ docker-compose -f ./scripts/docker-compose.yml up --force-recreate -V
```

This will create a mysql database and run an instance of phpMyAdmin on [localhost:8080](http://localhost:8080/).

## Running API

```bash
$ npm run start

$ npm run start:dev
```