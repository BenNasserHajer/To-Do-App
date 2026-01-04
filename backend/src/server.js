import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
