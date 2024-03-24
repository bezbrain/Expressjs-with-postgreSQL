const express = require("express");
const router = express.Router();

import {
  getData,
  createData,
  deleteData,
  updateData,
  deleteMultipleCustomers,
} from "../controllers/data.controller";

router.get("/getData", getData);
router.post("/create", createData);
router.delete("/deleteData/:dataID", deleteData);
router.delete("/deleteManyData", deleteMultipleCustomers);
router.patch("/updateData/:dataID", updateData);

// module.exports = router;
export default router;
