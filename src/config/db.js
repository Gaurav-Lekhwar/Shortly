const { Pool } = require('pg');
const env = require('./env');

const pool = new Pool({
  connectionString: env.databaseUrl,
  // Optional but useful settings for development
  max: 20,                    // maximum number of clients in the pool
  idleTimeoutMillis: 30000,   // close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // return an error after 2 seconds if connection could not be established
});

// Optional: log when a new client is connected (helpful while learning)
pool.on('connect', () => {
  console.log('New client connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};