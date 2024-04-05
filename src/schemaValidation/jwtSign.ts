import jwt from "jsonwebtoken";
import crypto from "crypto";
import { BadRequestError } from "../errors";

// Generate secret (Used this to generate the one time jwt secret)
function generateJwtSecret(length = 64) {
  const jwtSecret = crypto.randomBytes(length).toString("hex");
  console.log(jwtSecret);
  return jwtSecret;
}

// Sign a user
export const signUser = async (body: string | object) => {
  if (!process.env.JWT_SECRET) {
    throw new BadRequestError("JWT_SECRET is not defined");
  }
  return jwt.sign(body, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
