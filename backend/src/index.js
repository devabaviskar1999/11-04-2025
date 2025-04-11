import express from "express";
import dotenv from "dotenv";

import authRoute from "./routes/auth.route.js";
import { MongoConnection } from "./lib/db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/auth", authRoute);
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
  MongoConnection();
});
 