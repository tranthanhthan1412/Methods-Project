import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./config/db.js";
import taskRoute from "./routes/tasksRoutes.js";
import cors from "cors";

const PORT = process.env.PORT || 5001;

const app = express();

// middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/tasks", taskRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(" Server running on port: " + PORT);
  });
}); // ket noi csdl
