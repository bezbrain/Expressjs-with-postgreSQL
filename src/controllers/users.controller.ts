import { Request, Response } from "express";
import UserSchema from "../schemaValidation/user.validation";
import { comparePassword, hashPass } from "../schemaValidation/hashPassword";
import { createUser, findUserByEmail } from "../repository/user.repo";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors";
import { v4 } from "uuid";
import { signUser } from "../schemaValidation/jwtSign";

const register = async (req: Request, res: Response) => {
  const { name, email, username } = req.body;

  const userId = v4(); // Generate user id

  //   Validate user inputs
  const user = await UserSchema.validateAsync(req.body);

  //   Hash the password
  const hashPassword = await hashPass(user.password);

  //   Call the create user repository function
  const userCreate = await createUser(
    userId,
    name,
    email,
    username,
    hashPassword
  );

  //   Check if user was not successfully created
  if (userCreate.rowCount === 0) {
    throw new BadRequestError("Something went wrong!");
  }

  //   Extract userPassword using rest operator
  const { password, ...jwtData } = req.body;
  jwtData.userId = userId; // Create the userId id key in jwtData

  //   Invoke sign a user if user registration successful
  const token = await signUser(jwtData);

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

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Username and password must be provided");
  }

  const user = await findUserByEmail(username);
  //   Check if the user does not exist
  if (user.rows.length === 0) {
    throw new NotFoundError("Username does not exist");
  }

  //   Compare passwords if correct or not
  const isPasswordCorrect = await comparePassword(
    password,
    user.rows[0].password
  );
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Password is incorrect");
  }

  //   Check if password creation is succesful
  if (user.rows.length === 0) {
    throw new BadRequestError("Login not successful");
  }

  //   Invoke sign a user if user login is successful
  const token = await signUser({
    userId: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    username: user.rows[0].username,
  });

  return res.status(StatusCodes.OK).json({
    status: true,
    message: "Login successful",
    user: {
      name: user.rows[0].name,
      email: user.rows[0].email,
      username: user.rows[0].username,
    },
    token,
  });
};

export { register, login };
