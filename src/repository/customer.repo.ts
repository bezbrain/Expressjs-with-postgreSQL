import db from "../datasource/db";
import { v4 } from "uuid";

const create = async (
  name: string,
  email: string,
  username: string,
  password: string
) => {
  // const id = v4()
  return await db.query(
    `INSERT INTO customer (id, name, email, username, password) VALUES ('${v4()}', $1, $2, $3, $4)`,
    [name, email, username, password]
  );
};

export { create };
