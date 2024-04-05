import { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
  res.send("Register a user");
};

export { register };
