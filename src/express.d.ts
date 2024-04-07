import { JwtPayload } from "./schemaValidation/jwtSign";

// Add this in a separate file, for example, express.d.ts
declare module "express" {
  interface Request {
    user?: JwtPayload;
  }
}
