import mongoose from "mongoose";
import Todo from "../db/models/todoModel.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const allTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      results: todos.length,
      data: todos,
    });
  } catch (err) {
    console.log("Error fetching todos", err);
    res.status(500).json({
      status: "fail",
      message: "failed to fetch todos",
    });
  }
};

const addTodo = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({
      status: "fail",
      message: "Title and Description are required !",
    });
  }

  try {
    const todo = await Todo.create({
      title,
      description,
      isCompleted,
    });
    res.status(201).json({
      status: "success",
      message: "Todo Added Successfully !",
      todo,
    });
  } catch (err) {
    console.log("Error creating todo", err);
    res.status(500).json({
      status: "fail",
      message: "failed to create todo",
    });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;

  if (!id) {
    return res.status(400).json({
      status: "fail",
      message: "Todo ID is required !",
    });
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid todo ID format",
    });
  }

  if (isCompleted === undefined) {
    return res.status(400).json({
      status: "fail",
      message: "isCompleted field is required !",
    });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      { _id: id },
      {
        isCompleted,
      },
      { new: true, runValidators: true },
    );

    if (!updatedTodo) {
      return res.status(404).json({
        status: "fail",
        message: "Todo not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "sucessfully updated !",
      data: updatedTodo,
    });
  } catch (err) {
    console.log("Error updating todo", err);
    res.status(500).json({
      status: "fail",
      message: "failed to update todo",
    });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: "fail",
      message: "Todo ID is required",
    });
  }

  if(!isValidObjectId(id)){
    return res.status(400).json({
      status: "fail",
      message: 'Invalid todo ID format'
    })
  }

  try {
    const deletedTodo = await Todo.deleteOne({
      _id: id,
    });

    if(!deletedTodo) {
      return res.status(404).json({
        status: "fail",
        message: "Todo not found"
      })
    }
    
    res.status(200).json({
      status: "success",
      message: "Todo Deleted Successfully !",
      data: deletedTodo
    });
  } catch (err) {
    console.log("Error deleting todo", err)
    res.status(500).json({
      status: "fail",
      message: 'failed to delete todo',
    });
  }
};

export { allTodos, addTodo, updateTodo, deleteTodo };
