import { Request, Response } from "express";
import UserSchema from "../schemaValidation/user.validation";

const register = async (req: Request, res: Response) => {
  const { name, email, username, password } = req.body;

  await UserSchema.validateAsync({ name, email, username, password });

  res.send("Register a user");
};

export { register };
