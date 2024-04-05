const express = require("express");
const router = express.Router();

import {
  getData,
  createData,
  deleteData,
  updateData,
  deleteMultipleCustomers,
  getSingleData,
} from "../controllers/customers.controller";

router.get("/customers", getData);
router.get("/customers/:dataID", getSingleData);
router.post("/customers", createData);
router.delete("/customers/:dataID", deleteData);
router.delete("/customers", deleteMultipleCustomers);
router.patch("/customers/:dataID", updateData);

// module.exports = router;
export default router;
