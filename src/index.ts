// Import express
import express, { Request, Response, NextFunction } from "express";
import db from "./db";
// Instantiate the express server
const app = express();
// Initialize error async library
import "express-async-errors";

app.use(express.json());

// NotFound middleware
import NotFoundMiddleware from "./middleware/not-found";
// Error handling middleware
import ErrorMiddleware from "./middleware/error";

import dataRouter from "./routes/data.route";
import createTable from "./tables/query.tables";

// Set server port
const port = 5000;

// Send a response to request

app.get("/", (req: Request, res: Response) => {
  console.log("It is working!!!");
  res.send("It is working");
});

// Create data request
app.use("/", dataRouter);

// Middleware invoked
app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);

// Start DB
const startDB = async () => {
  try {
    await db.connect();
    createTable(); // Create a table if it does not exist
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
