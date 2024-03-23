"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import express
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
// Instantiate the express server
const app = (0, express_1.default)();
// Initialize error async library
require("express-async-errors");
app.use(express_1.default.json());
// NotFound middleware
const not_found_1 = __importDefault(require("./middleware/not-found"));
// Error handling middleware
const error_1 = __importDefault(require("./middleware/error"));
const data_route_1 = __importDefault(require("./routes/data.route"));
const query_tables_1 = __importDefault(require("./tables/query.tables"));
// Set server port
const port = 5000;
// Send a response to request
app.get("/", (req, res) => {
    console.log("It is working!!!");
    res.send("It is working");
});
// Create data request
app.use("/", data_route_1.default);
// Middleware invoked
app.use(not_found_1.default);
app.use(error_1.default);
// Start DB
const startDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.connect();
        (0, query_tables_1.default)(); // Create a table if it does not exist
        /// Server listens to event
        app.listen(port, function () {
            console.log(`Server running on port: ${port}`);
        });
        // Create table
    }
    catch (error) {
        console.log("Error occurred while connecting to PostgreSQL", error);
    }
});
startDB();
