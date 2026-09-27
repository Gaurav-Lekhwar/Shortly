const dotenv = require('dotenv');

// Load variables from .env into process.env
dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',

  // Safely parse PORT so we never get NaN
  port: (() => {
    const parsed = parseInt(process.env.PORT, 10);
    return Number.isNaN(parsed) ? 3001 : parsed;
  })(),

  appUrl: process.env.APP_URL || 'http://localhost:3001',

  // Database
  databaseUrl: process.env.DATABASE_URL,

  // Redis – keep 6380 only if that is what your docker-compose exposes
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6380',

  // Session
  sessionSecret: process.env.SESSION_SECRET,
};

// Fail fast if required variables are missing
function requireEnv(key, value) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

requireEnv('DATABASE_URL', env.databaseUrl);
requireEnv('SESSION_SECRET', env.sessionSecret);

module.exports = env;