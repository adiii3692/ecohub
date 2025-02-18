import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const Pool = require('pg').Pool;
require('dotenv').config();

export const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl:{
        rejectUnauthorized: false
    }
});

export const testConnection = async () => {
    try {
      const client = await pool.connect();
      console.log("Connected to PostgreSQL!");
      client.release();
    } catch (err) {
      console.error("Error connecting to the database:", err);
    }
  };