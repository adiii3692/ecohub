import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const Pool = require('pg').Pool;
require('dotenv').config();

export const pool = new Pool({
    user:"postgres",
    password:process.env.pwd,
    host:'localhost',
    port:5432,
    database:'ecohub'
});