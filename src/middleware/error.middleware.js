// src/middleware/error.middleware.js

const logger = require('../lib/logger');
const { AppError } = require('../utils/errors');
const env = require('../config/env');

/**
 * Global error handling middleware.
 * Must be registered LAST in app.js (after all routes).
 */
function errorMiddleware(err, req, res, next) {
  // Default values for unexpected errors
  let statusCode = 500;
  let message = 'Internal Server Error';
  let code = 'INTERNAL_ERROR';
  let isOperational = false;

  // If it is one of our known AppErrors
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    code = err.code;
    isOperational = err.isOperational;
  }

  // Log the error
  if (isOperational) {
    // Expected errors (validation, not found, etc.)
    logger.warn(
      {
        err: {
          message: err.message,
          code: err.code,
          statusCode: err.statusCode,
        },
        path: req.originalUrl,
        method: req.method,
      },
      'Operational error'
    );
  } else {
    // Unexpected / programming errors – log full stack
    logger.error(
      {
        err: {
          message: err.message,
          stack: err.stack,
          name: err.name,
        },
        path: req.originalUrl,
        method: req.method,
      },
      'Unexpected error'
    );
  }

  // Build the response body
  const response = {
    success: false,
    message,
    code,
  };

  // In development we can also send the stack for easier debugging
  if (env.NODE_ENV === 'development' && !isOperational) {
    response.stack = err.stack;
  }

  // Send the response
  res.status(statusCode).json(response);
}

module.exports = errorMiddleware;