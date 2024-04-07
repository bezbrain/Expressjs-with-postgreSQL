import jwt from "jsonwebtoken";
import crypto from "crypto";
import { BadRequestError, UnauthenticatedError } from "../errors";

export interface JwtPayload {
  userId: string;
  name: string;
  email: string;
  username: string;
}

// Generate secret (Used this to generate the one time jwt secret)
function generateJwtSecret(length = 64) {
  const jwtSecret = crypto.randomBytes(length).toString("hex");
  console.log(jwtSecret);
  return jwtSecret;
}

// Sign a user
export const signUser = async (body: string | object) => {
  if (!process.env.JWT_SECRET) {
    throw new BadRequestError("Secret is not defined");
  }
  return jwt.sign(body, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export const verifyUserToken = async (token: string): Promise<JwtPayload> => {
  if (!process.env.JWT_SECRET) {
    throw new BadRequestError("Secret is not defined");
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
  return payload;
};
