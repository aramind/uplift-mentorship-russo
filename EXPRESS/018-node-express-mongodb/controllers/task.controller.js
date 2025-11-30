import Task from "../models/Task.js";


const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    const responseObj = {
      data: tasks,
      results: tasks.length,
      message: 'Successfully fetched all data!',
    }

    res.status(200).json(responseObj);

  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching data!', 
      error: error.message, 
    });
  }
};

const createNewTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({
      title,
      description,
    });

    await newTask.save();

    const responseObj = {
      data: newTask,
      status: 'success',
      message: 'Successfully created a task!',
    };

    res.status(201).json(responseObj);
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    })
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        status: 'fail',
        message: `No task found with id: ${id}`,
      });
    };

    const responseObj = {
      data: deletedTask,
      status: 'success',
      message: 'Successfully deleted a task!',
    };

    res.status(200).json(responseObj);
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  };
};

const updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if(!updatedTask) {
      return res.status(404).json({
        status: 'fail',
        message: `No task found with id: ${id}`,
      })
    };

    const responseObj = {
      data: updatedTask,
      status: 'success',
      message: 'Successfully updated a task!',
    };

    res.status(200).json(responseObj);
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  };
};

export {
  getAllTasks,
  createNewTask,
  updateTaskById,
  deleteTaskById,
};