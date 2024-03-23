"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
// const {
//   createData,
//   getData,
//   deleteData,
//   updateData,
// } = require("../controllers/data.controller");
const data_controller_1 = require("../controllers/data.controller");
router.get("/getData", data_controller_1.getData);
router.post("/create", data_controller_1.createData);
router.delete("/deleteData/:dataID", data_controller_1.deleteData);
router.patch("/updateData/:dataID", data_controller_1.updateData);
// module.exports = router;
exports.default = router;
