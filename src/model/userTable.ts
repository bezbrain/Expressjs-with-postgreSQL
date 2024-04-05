import db from "../datasource/db";

const createUsers = () => {
  db.query(
    `CREATE TABLE IF NOT EXISTS users (
        id varchar PRIMARY KEY,
        name varchar NOT NULL,
        email varchar UNIQUE NOT NULL,
        username varchar UNIQUE NOT NULL,
        password varchar NOT NULL,
        createdAt timestamp default current_timestamp,
        updatedAt timestamp default current_timestamp
      )`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("User Table created");
      }
    }
  );
};

// module.exports = createUsers;
export default createUsers;
