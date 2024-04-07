import db from "../datasource/db";
import { v4 } from "uuid";

const create = async (
  name: string,
  email: string,
  username: string,
  age: string
) => {
  return await db.query(
    `INSERT INTO customers (id, name, email, username, age) VALUES ('${v4()}', $1, $2, $3, $4)`,
    [name, email, username, age]
  );
};

const get = async () => {
  return await db.query(`SELECT id, name, email, username FROM customers`);
};

const getSingle = async (dataID: string) => {
  return await db.query(
    `SELECT id, name, email, username FROM customers WHERE id = $1`,
    [dataID]
  );
};

const update = async (setValue: string, dataID: string) => {
  return await db.query(
    `UPDATE customers SET ${setValue} WHERE id = '${dataID}'`
  );
};

const deleteCus = async (dataID: string) => {
  return await db.query(`DELETE FROM customers WHERE id = '${dataID}'`);
};

export { create, get, getSingle, update, deleteCus };
