import { StatusCodes } from "http-status-codes";
import CustomError from "./customError";

class UnauthenticatedError extends CustomError {
  statusCode: StatusCodes;
  constructor(message: string | undefined) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
