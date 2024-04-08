import db from "../datasource/db";

const createCustomers = () => {
  db.query(
    `CREATE TABLE IF NOT EXISTS customers (
      id varchar PRIMARY KEY,
      name varchar NOT NULL,
      email varchar UNIQUE NOT NULL,
      username varchar UNIQUE NOT NULL,
      createdBy varchar NOT NULL,
      age int NOT NULL,
      createdAt timestamp default current_timestamp,
      updatedAt timestamp default current_timestamp,
      UNIQUE (email, createdBy),
      UNIQUE (username, createdBy)
      )`,

    // This part of the table:
    // UNIQUE (email, createdBy), -- Unique constraint for email and createdBy. Meaning that the uniqueness of email is only tyed to a user
    // UNIQUE (username, createdBy) -- Unique constraint for username and createdBy. Meaning that the uniqueness of username is only tyed to a user
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Customer Table created");
      }
    }
  );
};

// module.exports = createCustomers;
export default createCustomers;
