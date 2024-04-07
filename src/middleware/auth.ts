import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors";
import { JwtPayload, verifyUserToken } from "../schemaValidation/jwtSign";

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  // Check if token exist and in the right format
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthenticatedError(
      "User authentication failed. Please try to login again"
    );
  }

  const extractToken = authorization.split(" ")[1];

  try {
    const { userId, name, email, username }: JwtPayload = await verifyUserToken(
      extractToken
    );
    req.user = { userId, name, email, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError(
      "You are not authorized to access this resources. Please try to login in again"
    );
  }
};

export { authMiddleware };
