import db from "../datasource/db";
import { v4 } from "uuid";

const createUser = async (
  name: string,
  email: string,
  username: string,
  password: string
) => {
  return db.query(
    `INSERT INTO users (id, name, email, username, password) VALUES ('${v4()}', $1, $2, $3, $4)`,
    [name, email, username, password]
  );
};
