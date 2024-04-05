import { Request, Response } from "express";
import UserSchema from "../schemaValidation/user.validation";
import { hashPass } from "../schemaValidation/hashPassword";

const register = async (req: Request, res: Response) => {
  //   Validate user inputs
  const user = await UserSchema.validateAsync(req.body);

  const hashPassword = await hashPass(user.password);

  console.log(hashPassword);

  res.send("Register a user");
};

export { register };
