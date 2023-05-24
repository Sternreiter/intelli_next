switch (process.env.NODE_ENV){
  case 'development':
    require('dotenv').config({ path: '.env.development' });
    break;
  case 'production':
    require('dotenv').config({ path: '.env.production' });
    break;
}

console.log({PRUEBA: process.env.NODE_ENV})

const config = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASS: process.env.DATABASE_PASS,
  URL: process.env.URL,
  NODE_ENV: process.env.NODE_ENV
};

export default config;