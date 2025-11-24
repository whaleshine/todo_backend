import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, require: true, trim: true },
    description: { type: String, require: true },
    isCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Todo = mongoose.model("Todos", todoSchema);

export default Todo;
