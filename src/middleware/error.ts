import { Request, Response, NextFunction } from "express";

const ErrorMiddleware = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message);

  const customError = {
    message: err.message || "Something went wrong. Please try again later!",
    statusCode: err.statusCode || 500,
  };

  res.status(customError.statusCode).json({
    status: false,
    message: customError.message,
  });
};

// module.exports = ErrorMiddleware;
export default ErrorMiddleware;
