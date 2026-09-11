import Project from "../models/projectModel.js";

// ================= CREATE PROJECT =================
export const projectCreate = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const authorId = req.user;
    console.log("REQ BODY:", req.body);
    console.log("REQ USER:", req.user);

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const project = await Project.create({
      projectName:title,
      description,
      status,
      authorId,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: {
        id: project._id,
        projectName: project.projectName,
        description: project.description,
        status: project.status,
        authorId: project.authorId,
      },
    });
  } catch (error) {
    console.error("Project Create Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error in creating project",
      error: error.message,
    });
  }
};


// ================= GET ALL PROJECTS =================
export const getProjects = async (req, res) => {
  try {
    const authorId = req.user;

    const projects = await Project.find({ authorId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    console.error("Get Projects Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error in fetching projects",
      error: error.message,
    });
  }
};


// ================= GET SINGLE PROJECT =================
export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.user;

    const project = await Project.findOne({
      _id: id,
      authorId,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      project,
    });
  } catch (error) {
    console.error("Get Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error in fetching project",
      error: error.message,
    });
  }
};


// ================= UPDATE PROJECT =================
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectName, description, status } = req.body;
    const authorId = req.user;

    const project = await Project.findOneAndUpdate(
      {
        _id: id,
        authorId,
      },
      {
        projectName,
        description,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Update Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error in updating project",
      error: error.message,
    });
  }
};


// ================= DELETE PROJECT =================
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.user;

    const project = await Project.findOneAndDelete({
      _id: id,
      authorId,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error in deleting project",
      error: error.message,
    });
  }
};
