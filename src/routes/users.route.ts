import express from "express";
const router = express.Router();

import { login, register } from "../controllers/users.controller";

router.post("/register", register);
router.post("/login", login);

export default router;
