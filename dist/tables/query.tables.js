"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const createTable = () => {
    db_1.default.query(`CREATE TABLE IF NOT EXISTS customer (
        id varchar PRIMARY KEY,
        name varchar NOT NULL,
        email varchar UNIQUE NOT NULL,
        username varchar UNIQUE NOT NULL,
        password varchar NOT NULL
      )`, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Table created");
        }
    });
};
// module.exports = createTable;
exports.default = createTable;
