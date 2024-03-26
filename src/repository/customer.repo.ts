import db from "../datasource/db";
import { v4 } from "uuid";

const create = async (
  name: string,
  email: string,
  username: string,
  password: string
) => {
  return await db.query(
    `INSERT INTO customer (id, name, email, username, password) VALUES ('${v4()}', $1, $2, $3, $4)`,
    [name, email, username, password]
  );
};

const get = async () => {
  return await db.query(`SELECT id, name, email, username FROM customer`);
};

const getSingle = async (dataID: string) => {
  return await db.query(
    `SELECT id, name, email, username FROM customer WHERE id = $1`,
    [dataID]
  );
};

const update = async (setValue: string, dataID: string) => {
  return await db.query(
    `UPDATE customer SET ${setValue} WHERE id = '${dataID}'`
  );
};

const deleteCus = async (dataID: string) => {
  return await db.query(`DELETE FROM customer WHERE id = '${dataID}'`);
};

export { create, get, getSingle, update, deleteCus };
