import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import urlRoutes from "./routes/url.route.js";
import redirectRoutes from "./routes/redirect.route.js";
dotenv.config();
const app = express();
import connectDB from "./db/connectDB.js";

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use('/api/urls', urlRoutes);  
app.use('/', redirectRoutes);        


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
