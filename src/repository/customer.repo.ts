import db from "../datasource/db";
import { v4 } from "uuid";

const create = async (
  name: string,
  email: string,
  username: string,
  age: string,
  createdBy: string
) => {
  return await db.query(
    `INSERT INTO customers (id, name, email, username, age, createdBy) VALUES ('${v4()}', $1, $2, $3, $4, $5)`,
    [name, email, username, age, createdBy]
  );
};

const get = async (createdBy: string) => {
  return await db.query(`SELECT * FROM customers WHERE createdBy = $1`, [
    createdBy,
  ]);
};

const getSingle = async (dataID: string) => {
  return await db.query(
    `SELECT id, name, email, username, createdBy FROM customers WHERE id = $1`,
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
