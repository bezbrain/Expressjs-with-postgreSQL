import { Request, Response } from "express";
import UserSchema from "../schemaValidation/user.validation";
import { hashPass } from "../schemaValidation/hashPassword";
import { createUser } from "../repository/user.repo";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";

const register = async (req: Request, res: Response) => {
  const { name, email, username, password } = req.body;

  //   Validate user inputs
  const user = await UserSchema.validateAsync(req.body);

  //   Hash the password
  const hashPassword = await hashPass(user.password);

  const userCreate = await createUser(name, email, username, hashPassword);

  console.log(userCreate);

  //   Check if user was not successfully created
  if (userCreate.rowCount === 0) {
    throw new BadRequestError("Something went wrong!");
  }

  return res.status(StatusCodes.CREATED).json({
    status: "true",
    message: "Registration successful",
    user: {
      name,
      email,
      username,
    },
  });
  // res.send("Register a user");
};

export { register };
