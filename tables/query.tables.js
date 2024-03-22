const db = require("../db");

const createTable = () => {
  db.query(
    `CREATE TABLE IF NOT EXISTS customer (
        id varchar PRIMARY KEY,
        name varchar NOT NULL,
        email varchar UNIQUE NOT NULL,
        username varchar UNIQUE NOT NULL,
        password varchar NOT NULL
      )`,
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Table created");
      }
    }
  );
};

module.exports = createTable;
