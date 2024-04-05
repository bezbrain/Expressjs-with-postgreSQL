import { Request, Response } from "express";
import UserSchema from "../schemaValidation/user.validation";
import { hashPass } from "../schemaValidation/hashPassword";
import { createUser } from "../repository/user.repo";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import { v4 } from "uuid";
import { signUser } from "../schemaValidation/jwtSign";

const register = async (req: Request, res: Response) => {
  const { id, name, email, username, password } = req.body;

  //   Extract userId using rest operator
  const { userId, ...userData } = req.body;
  //   Extract userPassword using rest operator
  const { userPassword, ...jwtData } = req.body;

  //   Validate user inputs
  const user = await UserSchema.validateAsync(userData);

  //   Hash the password
  const hashPassword = await hashPass(user.password);

  const userCreate = await createUser(
    v4(),
    name,
    email,
    username,
    hashPassword
  );

  //   Invoke sign a user if user registration successful
  const token = await signUser(jwtData);

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
    token,
  });
  //   res.send("Register a user");
};

export { register };
