import { Response, Request, NextFunction } from "express";
import user from "../mockDB/mock-db";
import db from "../db";
const { v4 } = require("uuid");

// Create a record
const createData = async (req: Request, res: Response) => {
  const { name, email, username, password } = req.body;

  // Check if no field is empty
  if (!name || !email || !username || !password) {
    return res.status(400).json({
      status: false,
      message: "No field should be empty",
    });
  }

  // Ensure no unexpected fields are present
  const allowedFields = ["name", "email", "username", "password"];
  for (const field in req.body) {
    if (!allowedFields.includes(field)) {
      return res.status(400).json({
        status: false,
        message: `Unexpected field: ${field}`,
      });
    }
  }

  // Proceed with DB insertion
  db.query(
    `INSERT INTO customer (id, name, email, username, password) VALUES ('${v4()}', '${name}', '${email}', '${username}', '${password}')`,
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          status: false,
          message: `${err.detail}`,
        });
      } else {
        res.status(201).json({
          status: true,
          message: "Customer created",
        });
      }
    }
  );
};

// Get all users
const getData = async (req: Request, res: Response) => {
  db.query(
    `SELECT id, name, email, username FROM customer`,
    (err: any, data: { rows: string | any[] }) => {
      if (err) {
        res.status(500).json({
          status: false,
          message: "Error retrieving data from the database",
        });
      } else {
        res.status(200).json({
          status: true,
          message: "Users fetched",
          length: data.rows.length,
          data: data.rows,
        });
      }
    }
  );
};

// Delete user
const deleteData = async (req: Request, res: Response) => {
  const { dataID } = req.params;

  if (!dataID) {
    return res.status(400).json({
      status: false,
      message: `User with the ID ${dataID} does not exist`,
    });
  }

  db.query(
    `DELETE FROM customer WHERE id = '${dataID}'`,
    (err: any, data: { rowCount: number }) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Error deleting data from the database",
        });
      } else {
        // console.log(data.rowCount);
        // Check if any rows to be deleted does not exist
        if (data.rowCount === 0) {
          res.status(404).json({
            status: false,
            message: "Customer not found",
          });
        } else {
          res.status(200).json({
            status: true,
            message: "Customer deleted successfully",
          });
        }
      }
    }
  );
};

// Update user
const updateData = async (req: Request, res: Response) => {
  const { dataID } = req.params;
  const { name, email, username, password } = req.body;

  if (!dataID) {
    return res.status(400).json({
      status: false,
      message: `User with the ID ${dataID} does not exist`,
    });
  }

  // Check if any data is provided for updating
  if (!name && !email && !username && !password) {
    return res.status(400).json({
      status: false,
      message: "No data provided for updating",
    });
  }

  let updateQuery = "UPDATE customer SET ";
  let updateFields = [];

  // Add fields to update if provided in the request body
  if (name) updateFields.push(`name = '${name}'`);
  if (email) updateFields.push(`email = '${email}'`);
  if (username) updateFields.push(`username = '${username}'`);
  if (password) updateFields.push(`password = '${password}'`);

  updateQuery += updateFields.join(", ") + ` WHERE id = '${dataID}'`;
  // console.log(updateQuery);

  db.query(updateQuery, (err: any, data: { rowCount: number }) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Error updating data in the database",
      });
    } else {
      // Check if any row to be updated does not exist
      if (data.rowCount === 0) {
        return res.status(404).json({
          status: false,
          message: "No customer found",
        });
      }
      res.status(200).json({
        status: true,
        message: "Customer updated successfully",
      });
    }
  });
};

module.exports = {
  createData,
  getData,
  deleteData,
  updateData,
};
