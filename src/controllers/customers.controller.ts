import { Response, Request, NextFunction } from "express";
import user from "../mockDB/mock-db";
import db from "../datasource/db";
import {
  create,
  deleteCus,
  get,
  getSingle,
  update,
} from "../repository/customer.repo";
import { BadRequestError, NotFoundError } from "../errors";
import { StatusCodes } from "http-status-codes";
// const { v4 } = require("uuid");

// CREATE A RECORD
const createCustomer = async (req: Request, res: Response) => {
  const { name, email, username, age } = req.body;

  // Check if any field is empty
  if (!name || !email || !username || !age) {
    throw new BadRequestError("No field should be empty");
  }

  // Ensure no unexpected fields are present
  const allowedFields = ["name", "email", "username", "age"];
  for (const field in req.body) {
    if (!allowedFields.includes(field)) {
      throw new BadRequestError(`Unexpected field: ${field}`);
    }
  }

  // Proceed with DB insertion
  await create(name, email, username, age);

  res.status(StatusCodes.CREATED).json({
    status: true,
    message: "Customer created",
  });
};

// GET ALL CUSTOMERS
const getCustomers = async (req: Request, res: Response) => {
  const response = await get();

  res.status(StatusCodes.OK).json({
    status: true,
    rowCount: response.rowCount,
    data: response.rows,
  });
};

// GET SINGLE CUSTOMER
const getSingleCustomer = async (req: Request, res: Response) => {
  const { customerID } = req.params;

  const customer = await getSingle(customerID);

  // Check if ID is present in the DB
  if (customer.rowCount === 0) {
    throw new NotFoundError(
      `Customer with the ID, ${customerID} does not exist`
    );
  }

  res.status(StatusCodes.OK).json({
    status: true,
    data: customer.rows,
  });
};

// DELETE CUSTOMER
const deleteCustomer = async (req: Request, res: Response) => {
  const { customerID } = req.params;

  const customer = await getSingle(customerID);

  // Check if ID is present in the DB
  if (customer.rowCount === 0) {
    throw new NotFoundError(
      `Customer with the ID, ${customerID} does not exist`
    );
  }

  // Delete data
  await deleteCus(customerID);

  res.status(StatusCodes.OK).json({
    status: true,
    message: "Deleted successfully",
  });
};

// DELETE MANY ROWS BASED ON EMAIL
const deleteMultipleCustomers = async (req: Request, res: Response) => {
  db.query(
    `DELETE FROM customer WHERE email LIKE '%@gmail.com'`,
    (err, data) => {
      if (err) {
        // console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: "false",
          message: "Not successful",
        });
      } else {
        // console.log("Success");
        return res.status(StatusCodes.OK).json({
          status: "true",
          message: "All rows deleted successful",
        });
      }
    }
  );
};

// UPDATE CUSTOMER
const updateCustomer = async (req: Request, res: Response) => {
  const { customerID } = req.params;
  const { name, email, username, age } = req.body;

  // Find single customer
  const customer = await getSingle(customerID);

  // Check if ID is present in the DB
  if (customer.rowCount === 0) {
    throw new NotFoundError(
      `Customer with the ID, ${customerID} does not exist`
    );
  }

  // Check if any data is provided for updating
  if (!name && !email && !username && !age) {
    throw new BadRequestError("No data provided for updating");
  }

  // Ensure no unexpected fields are present
  const allowedFields = ["name", "email", "username", "age"];
  for (const field in req.body) {
    if (!allowedFields.includes(field)) {
      throw new BadRequestError(`Unexpected field: ${field}`);
    }
  }

  let queryToUpdate = "";
  let updateFields = [];

  // Add fields to update if provided in the request body
  if (name) updateFields.push(`name = '${name}'`);
  if (email) updateFields.push(`email = '${email}'`);
  if (username) updateFields.push(`username = '${username}'`);
  if (age) updateFields.push(`age = '${age}'`);

  // Update timestamp
  updateFields.push(`updatedAt = current_timestamp`);

  queryToUpdate += updateFields.join(", ");
  // console.log(queryToUpdate);

  await update(queryToUpdate, customerID);

  res.status(200).json({
    status: true,
    message: "Customer updated successfully",
  });
};

export {
  createCustomer,
  getCustomers,
  getSingleCustomer,
  deleteCustomer,
  updateCustomer,
  deleteMultipleCustomers,
};
