const dotenv = require('dotenv');

// Load .env file into process.env (only in non-production usually, but fine for now)
dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3001,
  appUrl: process.env.APP_URL || 'http://localhost:3001',

  // Database
  databaseUrl: process.env.DATABASE_URL,

  // Redis
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6380',

  // Session
  sessionSecret: process.env.SESSION_SECRET,
};

// Simple required-variable check (we will improve this later with Zod if needed)
function requireEnv(key, value) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

requireEnv('DATABASE_URL', env.databaseUrl);
requireEnv('SESSION_SECRET', env.sessionSecret);

module.exports = env;