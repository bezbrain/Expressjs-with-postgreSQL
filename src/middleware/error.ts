import { Request, Response, NextFunction } from "express";

const ErrorMiddleware = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customError = {
    message: err.message || "Something went wrong. Please try again later!",
    statusCode: err.statusCode || 500,
  };

  // Uniqueness error
  if (err.message.includes("duplicate")) {
    const extractValue = err.constraint.split("_");
    const capitalizeErrorMsg = extractValue[1].toUpperCase();
    customError.message = `${capitalizeErrorMsg} already existed`;
  }

  res.status(customError.statusCode).json({
    status: false,
    message: customError.message,
  });
};

// module.exports = ErrorMiddleware;
export default ErrorMiddleware;
