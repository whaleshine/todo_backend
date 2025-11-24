import express from "express";
import {
  addTodo,
  allTodos,
  deleteTodo,
  updateTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.get("/all", allTodos);

router.post("/create", addTodo);

router.put("/update/:id", updateTodo);

router.delete("/delete/:id", deleteTodo);

export default router;
