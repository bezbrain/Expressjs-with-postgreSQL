import { Request, Response, NextFunction } from "express";

const ErrorMiddleware = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err);

  const customError = {
    message: err.message || "Something went wrong. Please try again later!",
    statusCode: err.statusCode || 500,
  };

  // Absence of key value
  if (err.code === "23502") {
    console.log("Key needed");
    const extractErrorValue = err.column;
    customError.message = `${extractErrorValue} should be provided`;
  }

  // Uniqueness error
  if (err.code === "23505") {
    console.log("There is error");
    const extractValue = err.constraint.split("_");
    const capitalizeErrorMsg = extractValue[1].toUpperCase();
    customError.message = `${capitalizeErrorMsg} already existed`;
  }

  // res.status(customError.statusCode).json({
  //   status: false,
  //   message: err,
  // });
  res.status(customError.statusCode).json({
    status: false,
    message: customError.message,
  });
};

// module.exports = ErrorMiddleware;
export default ErrorMiddleware;
