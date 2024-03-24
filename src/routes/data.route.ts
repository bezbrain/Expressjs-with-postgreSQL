const express = require("express");
const router = express.Router();

import {
  getData,
  createData,
  deleteData,
  updateData,
  deleteMultipleCustomers,
  getSingleData,
} from "../controllers/data.controller";

router.get("/getData", getData);
router.get("/getData/:dataID", getSingleData);
router.post("/create", createData);
router.delete("/deleteData/:dataID", deleteData);
router.delete("/deleteManyData", deleteMultipleCustomers);
router.patch("/updateData/:dataID", updateData);

// module.exports = router;
export default router;
