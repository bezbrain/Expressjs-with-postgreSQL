import { Response, Request, NextFunction } from "express";
import user from "../mockDB/mock-db";
import db from "../datasource/db";
import { create, get, getSingle } from "../repository/customer.repo";
import { BadRequestError, NotFoundError } from "../errors";
import { StatusCodes } from "http-status-codes";
const { v4 } = require("uuid");

// CREATE A RECORD
const createData = async (req: Request, res: Response) => {
  const { name, email, username, password } = req.body;

  // Check if no field is empty
  if (!name || !email || !username || !password) {
    throw new BadRequestError("No field should be empty");
  }

  // Ensure no unexpected fields are present
  const allowedFields = ["name", "email", "username", "password"];
  for (const field in req.body) {
    if (!allowedFields.includes(field)) {
      throw new BadRequestError(`Unexpected field: ${field}`);
    }
  }

  // Proceed with DB insertion
  await create(name, email, username, password);

  res.status(StatusCodes.CREATED).json({
    status: true,
    message: "Customer created",
  });
};

// GET ALL CUSTOMERS
const getData = async (req: Request, res: Response) => {
  const response = await get();

  res.status(StatusCodes.OK).json({
    status: true,
    rowCount: response.rowCount,
    data: response.rows,
  });
};

// GET SINGLE CUSTOMER
const getSingleData = async (req: Request, res: Response) => {
  const { dataID } = req.params;

  if (!dataID) {
    throw new NotFoundError(`User with the ID, ${dataID} does not exist`);
  }

  const customer = await getSingle(dataID);

  if (customer.rowCount === 0) {
    throw new NotFoundError(`User with the ID, ${dataID} does not exist`);
  }

  res.status(StatusCodes.OK).json({
    status: true,
    data: customer.rows,
  });
};

// DELETE CUSTOMER
const deleteData = async (req: Request, res: Response) => {
  const { dataID } = req.params;

  if (!dataID) {
    return res.status(400).json({
      status: false,
      message: `User with the ID ${dataID} does not exist`,
    });
  }

  db.query(`DELETE FROM customer WHERE id = '${dataID}'`, (err, data) => {
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
  });
};

// DELETE MANY ROWS BASED ON EMAIL
const deleteMultipleCustomers = async (req: Request, res: Response) => {
  db.query(
    `DELETE FROM customer WHERE email LIKE '%@gmail.com'`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Success");
      }
    }
  );
};

// UPDATE CUSTOMER
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

  db.query(updateQuery, (err: any, data) => {
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

export {
  createData,
  getData,
  getSingleData,
  deleteData,
  updateData,
  deleteMultipleCustomers,
};
