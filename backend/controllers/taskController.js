import Task from "../models/taskModel.js";
import Project from "../models/projectModel.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      project,
      priority,
      status,
      dueDate,
    } = req.body;

    const authorId = req.user;

    if (!title || !description || !project) {
      return res.status(400).json({
        success: false,
        message: "Title, description and project are required",
      });
    }

    // Check whether project belongs to current user
    const existingProject = await Project.findOne({
      _id: project,
      authorId,
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const task = await Task.create({
      title,
      description,
      project,
      priority,
      status,
      dueDate,
      authorId,
    });

    console.log("Task Created:", task._id);

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Create Task Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error in creating task",
      error: error.message,
    });
  }
};


// Get All Tasks
export const getTasks = async (req, res) => {
  try {
    const authorId = req.user;

    const tasks = await Task.find({ authorId })
      .populate("project", "projectName status")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    console.error("Get Tasks Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error in fetching tasks",
      error: error.message,
    });
  }
};


// Get Single Task
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.user;

    const task = await Task.findOne({
      _id: id,
      authorId,
    }).populate("project", "projectName status");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      task,
    });
  } catch (error) {
    console.error("Get Task Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error in fetching task",
      error: error.message,
    });
  }
};


// Get Tasks of Particular Project
export const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const authorId = req.user;

    // Check project belongs to current user
    const project = await Project.findOne({
      _id: projectId,
      authorId,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const tasks = await Task.find({
      project: projectId,
      authorId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Project tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    console.error("Get Project Tasks Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error in fetching project tasks",
      error: error.message,
    });
  }
};


// Update Task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      priority,
      status,
      dueDate,
    } = req.body;

    const authorId = req.user;

    const task = await Task.findOneAndUpdate(
      {
        _id: id,
        authorId,
      },
      {
        title,
        description,
        priority,
        status,
        dueDate,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("project", "projectName status");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    console.log("Task Updated:", task._id);

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Update Task Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error in updating task",
      error: error.message,
    });
  }
};


// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.user;

    const task = await Task.findOneAndDelete({
      _id: id,
      authorId,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    console.log("Task Deleted:", id);

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete Task Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error in deleting task",
      error: error.message,
    });
  }
};
