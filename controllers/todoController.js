import Todo from "../db/models/todoModel.js";

const allTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json({
      status: "success",
      data: todos,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const addTodo = async (req, res) => {
  const { title, description, isCompleted } = req.body;

  if (!title || !description) {
    res.status(401).json({
      status: "fail",
      message: "invalid credentials, please check",
    });
  }

  try {
    const todo = await Todo.create({
      title,
      description,
      isCompleted,
    });
    res.status(200).json({
      status: "success",
      message: "Todo Added Successfully !",
      todo,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;

  if (!id || isCompleted === undefined) {
    res.status(401).json({
      status: "fail",
      message: "invalid credentials, please check",
    });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      { _id: id },
      {
        isCompleted,
      },
    );
    res.status(200).json({
      status: "success",
      message: "sucessfully updated !",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(401).json({
      status: "fail",
      message: "invalid id, please check !",
    });
  }

  try {
    const deletedTodo = await Todo.deleteOne({
      _id: id,
    });
    res.status(200).json({
      status: "success",
      message: "Todo Deleted Successfully !",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

export { allTodos, addTodo, updateTodo, deleteTodo };
