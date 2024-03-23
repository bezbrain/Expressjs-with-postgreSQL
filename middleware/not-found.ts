import { Request, Response, NextFunction } from "express";

const NotFoundMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(404).send("Route does not exist");
};

// module.exports = NotFoundMiddleware;
export default NotFoundMiddleware;
