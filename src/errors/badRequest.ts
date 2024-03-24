import { CustomError } from "./";
import { StatusCodes } from "http-status-codes";

class BadRequestError extends CustomError {
  statusCode: StatusCodes;
  constructor(message: string | undefined) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
