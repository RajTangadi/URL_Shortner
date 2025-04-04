import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
import connectDB from "./db/connectDB.js";

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
