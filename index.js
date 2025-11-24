import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./db/db.js";
import todoRouter from "./routes/todos.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const PORT = 5000;

connectDB();

app.use("/todos", todoRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
