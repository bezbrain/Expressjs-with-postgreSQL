import { StatusCodes } from "http-status-codes";
import { CustomError } from "./";

class NotFoundError extends CustomError {
  statusCode: StatusCodes;
  constructor(message: string | undefined) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
