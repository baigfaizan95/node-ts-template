# NODE.js API

#### How to run locally

 - Clone the repo
 - Install `Node8.x` & `npm`
 - Run `npm install`
 - Run `npm run dev-server` to start the local server.
 - Now any changes you make to the `src/` directory will be automatically compiled and webserver will restart.

#### .env variables

 - `.env` - for production server
 - `.env.dev` - for development/staging server
 - `.env.local` - for local development

#### Run Development Server

 - To run development/staging server, first build the project using `npm run build`.
 - Run `NODE_ENV=dev npm run start` to start the development server.

#### Run Production Server

 - To run production server, first build the project using `npm run build`.
 - Run `NODE_ENV=prod npm run start` to start the production server.
