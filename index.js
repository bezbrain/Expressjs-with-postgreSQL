// Import express
const express = require("express");
const db = require("./db");
// const { uuid } = require('uuidv4');
// Instantiate the express server
const app = express();
// Initialize error async library
require("express-async-errors");

app.use(express.json());

// NotFound middleware
const NotFoundMiddleware = require("./middleware/not-found");
// Error handling middleware
const ErrorMiddleware = require("./middleware/error");

const dataRouter = require("./routes/data.route");
const createTable = require("./tables/query.tables");

// Set server port
const port = 5000;

// Send a response to request

app.get("/", function (req, res) {
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
    /// Server listens to event
    createTable();
    app.listen(port, function () {
      console.log(`Server running on port: ${port}`);
    });
    // Create table
  } catch (error) {
    console.log("Error occurred while connecting to PostgreSQL", error);
  }
};

startDB();
