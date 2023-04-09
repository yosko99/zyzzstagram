# Zyzzstagram

Purpose of this project is to practice with Socket.IO, NestJS, Prisma (postgresql).

## Technologies used:

- Socket.IO
- NestJS
- React (Typescript)
- React Bootstrap
- Postgresql

## Instructions

After cloning the repository go to the main directory and run the following command to install the necessary npm packages.

```
npm install
```

Next run the following command

```
npm run installPackages
```

This command will concurrently install the necessary npm packages for both backend and frontend.

### Migrating the database

Make sure you have your database running, or use the dockerized one in the main directory using `docker-compose up`.
You need to create `.env` file in `backend` directory and populate it by following `.env.example` file. </br>

Next run the following command

```
npm run migrateDB
```

This command will migrate the prisma schema to the database.

#

## Running the project

### Running in development

Make sure you have your database running.

After everything is set, next time if you want to start the project all you need to do is run this command `npm run dev`
from the main directory which will start server side and back side concurrently.

You can start them independently with the following commands.

```
npm run server - start server side
npm run client - start frontend side
```
