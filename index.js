import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./db/db.js";
import todoRouter from "./routes/todos.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/todos", todoRouter);

app.get("/", (req, res) => {
  res.send("Todo API is running!");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
