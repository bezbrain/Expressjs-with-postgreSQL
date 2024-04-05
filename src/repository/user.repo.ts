import db from "../datasource/db";
import { v4 } from "uuid";

const createUser = async (
  id: string,
  name: string,
  email: string,
  username: string,
  password: string
) => {
  return await db.query(
    `INSERT INTO users (id, name, email, username, password) VALUES ($1, $2, $3, $4, $5)`,
    [id, name, email, username, password]
  );
};

const findUserByEmail = async (username: string) => {
  return await db.query(
    `SELECT id, name, email, username, password FROM users WHERE username = $1`,
    [username]
  );
};

export { createUser, findUserByEmail };
