"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateData = exports.deleteData = exports.getData = exports.createData = void 0;
const db_1 = __importDefault(require("../db"));
const { v4 } = require("uuid");
// Create a record
const createData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    db_1.default.query(`INSERT INTO customer (id, name, email, username, password) VALUES ('${v4()}', '${name}', '${email}', '${username}', '${password}')`, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).json({
                status: false,
                message: `${err}`,
            });
        }
        else {
            res.status(201).json({
                status: true,
                message: "Customer created",
            });
        }
    });
});
exports.createData = createData;
// Get all users
const getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    db_1.default.query(`SELECT id, name, email, username FROM customer`, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: "Error retrieving data from the database",
            });
        }
        else {
            res.status(200).json({
                status: true,
                message: "Users fetched",
                length: data.rows.length,
                data: data.rows,
            });
        }
    });
});
exports.getData = getData;
// Delete user
const deleteData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dataID } = req.params;
    if (!dataID) {
        return res.status(400).json({
            status: false,
            message: `User with the ID ${dataID} does not exist`,
        });
    }
    db_1.default.query(`DELETE FROM customer WHERE id = '${dataID}'`, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: "Error deleting data from the database",
            });
        }
        else {
            // console.log(data.rowCount);
            // Check if any rows to be deleted does not exist
            if (data.rowCount === 0) {
                res.status(404).json({
                    status: false,
                    message: "Customer not found",
                });
            }
            else {
                res.status(200).json({
                    status: true,
                    message: "Customer deleted successfully",
                });
            }
        }
    });
});
exports.deleteData = deleteData;
// Update user
const updateData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    if (name)
        updateFields.push(`name = '${name}'`);
    if (email)
        updateFields.push(`email = '${email}'`);
    if (username)
        updateFields.push(`username = '${username}'`);
    if (password)
        updateFields.push(`password = '${password}'`);
    updateQuery += updateFields.join(", ") + ` WHERE id = '${dataID}'`;
    // console.log(updateQuery);
    db_1.default.query(updateQuery, (err, data) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: "Error updating data in the database",
            });
        }
        else {
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
});
exports.updateData = updateData;
