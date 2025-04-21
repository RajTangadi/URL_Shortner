import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import urlRoutes from "./routes/url.route.js";
import redirectRoutes from "./routes/redirect.route.js";
import analyticsRoutes from "./routes/analytics.js";
import connectDB from "./db/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/urls", urlRoutes);
app.use("/", redirectRoutes);
app.use("/api/analytics", analyticsRoutes);

// Connect to the database first, then start the server
const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

startServer();
