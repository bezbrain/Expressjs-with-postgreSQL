const express = require("express");
const router = express.Router();

import {
  getCustomers,
  createCustomer,
  deleteCustomer,
  updateCustomer,
  deleteMultipleCustomers,
  getSingleCustomer,
} from "../controllers/customers.controller";

router.get("/customers", getCustomers);
router.get("/customers/:dataID", getSingleCustomer);
router.post("/customers", createCustomer);
router.delete("/customers/:dataID", deleteCustomer);
router.delete("/customers", deleteMultipleCustomers);
router.patch("/customers/:dataID", updateCustomer);

// module.exports = router;
export default router;
