const pino = require('pino');
const env = require('../config/env');

const isDevelopment = env.NODE_ENV === 'development';

const logger = pino({
  level: env.LOG_LEVEL || 'info',

  // In development we want human-readable logs.
  // In production we want pure JSON (machine-readable).
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      }
    : undefined,

  // Base fields that will appear in every log line
  base: {
    service: 'shortly',
  },

  // Redact sensitive fields if they ever appear in logs
  redact: {
    paths: ['password', 'passwordHash', 'token', 'authorization', 'cookie'],
    remove: true,
  },
});

module.exports = logger;