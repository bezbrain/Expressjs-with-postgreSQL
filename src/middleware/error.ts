import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

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

  // Check if err.details exists and has a lease one element
  if (err.details && err.details.length > 0) {
    // Required Field error(caught by JOI). And if email is not in the right format. And if passowrd does not contain require characters and others
    if (
      err.details[0].type === "any.required" ||
      err.details[0].type === "string.empty" ||
      err.details[0].type === "string.email" ||
      err.details[0].type === "string.pattern.base" ||
      err.details[0].type === "string.max" ||
      err.details[0].type === "string.min"
    ) {
      const errorValue = err.details[0].context.key;
      // console.log(errorValue);
      customError.message = `${errorValue} is required`;
      if (err.details[0].type === "string.email") {
        customError.message = `${errorValue} is not in the right format`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
      }
      if (err.details[0].type === "string.max") {
        customError.message = `${errorValue} length must be less than or equal to 10 characters long`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
      }
      if (err.details[0].type === "string.min") {
        customError.message = `${errorValue} length must be at least 3 characters long`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
      }
      if (err.details[0].type === "string.pattern.base") {
        customError.message = `${errorValue} should contain at least one capital letter, special character and number`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
      }
    }
  }

  // Absence of key value (caught by pgAdmin)
  if (err.code === "23502") {
    // console.log("Key needed");
    const extractErrorValue = err.column;
    customError.message = `${extractErrorValue} should be provided`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Uniqueness error
  if (err.code === "23505") {
    // console.log("There is error");
    const extractValue = err.constraint.split("_");
    const capitalizeErrorMsg = extractValue[1].toUpperCase();
    customError.message = `${capitalizeErrorMsg} already existed`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
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
