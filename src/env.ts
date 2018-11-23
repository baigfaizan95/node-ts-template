import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'prod') {
  dotenv.config({ path: '.env' }); // prod env variables
} else if (process.env.NODE_ENV === 'dev') {
  dotenv.config({ path: '.env.dev' }); // dev env variables
} else {
  dotenv.config({ path: '.env.local' }); // local env variables
}
