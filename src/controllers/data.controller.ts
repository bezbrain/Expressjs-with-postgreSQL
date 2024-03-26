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
const { v4 } = require("uuid");

// CREATE A RECORD
const createData = async (req: Request, res: Response) => {
  const { name, email, username, password } = req.body;

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

  // Check if ID is not present at all
  if (!dataID) {
    throw new NotFoundError(`Customer with the ID, ${dataID} does not exist`);
  }

  const customer = await getSingle(dataID);

  // Check if ID is present in the DB
  if (customer.rowCount === 0) {
    throw new NotFoundError(`Customer with the ID, ${dataID} does not exist`);
  }

  res.status(StatusCodes.OK).json({
    status: true,
    data: customer.rows,
  });
};

// DELETE CUSTOMER
const deleteData = async (req: Request, res: Response) => {
  const { dataID } = req.params;

  // Check if ID is provided at all
  if (!dataID) {
    return res.status(400).json({
      status: false,
      message: `User with the ID ${dataID} does not exist`,
    });
  }

  const customer = await deleteCus(dataID);

  // Check if ID provided in present in the DB
  if (customer.rowCount === 0) {
    throw new NotFoundError(`Customer with the ID, ${dataID} is not foind`);
  }

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

  // Find single customer
  const singleCustomer = await getSingle(dataID);

  // If ID doesn't have any customer
  if (singleCustomer.rowCount === 0) {
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

  let queryToUpdate = "";
  let updateFields = [];

  // Add fields to update if provided in the request body
  if (name) updateFields.push(`name = '${name}'`);
  if (email) updateFields.push(`email = '${email}'`);
  if (username) updateFields.push(`username = '${username}'`);
  if (password) updateFields.push(`password = '${password}'`);

  queryToUpdate += updateFields.join(", ");
  // console.log(queryToUpdate);

  await update(queryToUpdate, dataID);

  res.status(200).json({
    status: true,
    message: "Customer updated successfully",
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
