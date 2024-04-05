import db from "../datasource/db";

const createTable = () => {
  db.query(
    `CREATE TABLE IF NOT EXISTS customers (
        id varchar PRIMARY KEY,
        name varchar NOT NULL,
        email varchar UNIQUE NOT NULL,
        username varchar UNIQUE NOT NULL,
        age int NOT NULL,
        createdAt timestamp default current_timestamp,
        updatedAt timestamp default current_timestamp
      )`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table created");
      }
    }
  );
};

// module.exports = createTable;
export default createTable;
