const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl:{
        rejectUnauthorized: false
    }
});

const testConnection = async () => {
    try {
      const client = await pool.connect();
      console.log("Connected to PostgreSQL!");
      client.release();
    } catch (err) {
      console.error("Error connecting to the database:", err);
    }
  };

module.exports = {
  pool,testConnection
}