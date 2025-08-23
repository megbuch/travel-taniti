const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database')
});

pool.on('error', err => {
  console.error('Could not connect to PostgreSQL database:', err)
});

module.exports = pool;