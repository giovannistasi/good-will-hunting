const { Pool } = require('pg')

const pool = new Pool({
  user: 'rich',
  host: 'localhost',
  database: 'thesis',
  // password: '1234',
})

module.exports = pool;