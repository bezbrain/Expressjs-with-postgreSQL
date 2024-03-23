// const Pool = require("pg").Pool;
import { Pool } from "pg";
// require("dotenv").config();
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  database: process.env.DB_NAME,
});

export default pool;
