import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { MongoConnection } from "./lib/db.js";

//!express calling
const app = express();
const PORT = process.env.PORT || 5001; // port
app.use(cookieParser());

//!middlewares
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//!Routing
app.use("/api/auth", authRoute); //Auth route
app.use("/api/message", messageRoute); //Message route

//!express server is listening
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
  MongoConnection();
});
