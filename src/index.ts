// Import express
import express, { Request, Response, NextFunction } from "express";
import db from "./datasource/db";
// Instantiate the express server
const app = express();
// Initialize error async library
import "express-async-errors";

app.use(express.json());

// NotFound middleware
import NotFoundMiddleware from "./middleware/not-found";
// Error handling middleware
import ErrorMiddleware from "./middleware/error";

// Impoer routes
import customerRouter from "./routes/customers.route";

// Import models
import createUsers from "./model/userTable";
import createCustomers from "./model/customerTable";

// Set server port
const port = 5000;

// Send a response to request

app.get("/", (req: Request, res: Response) => {
  console.log("It is working!!!");
  res.send("It is working");
});

// Create data request
app.use("/", customerRouter);

// Middleware invoked
app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);

// Start DB
const startDB = async () => {
  try {
    await db.connect();
    createUsers(); // Create a user table if it does not exist
    createCustomers(); // Create a customer table if it does not exist
    /// Server listens to event
    app.listen(port, function () {
      console.log(`Server running on port: ${port}`);
    });
    // Create table
  } catch (error) {
    console.log("Error occurred while connecting to PostgreSQL", error);
  }
};

startDB();
