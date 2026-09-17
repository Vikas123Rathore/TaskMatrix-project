import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


/* =====================================================
   PROJECT AI
===================================================== */

const projectSystemPrompt = `
You are TaskMatrix AI.

The user will provide a project title.

Based only on the project title, generate a clear and useful
description for that project.

Return ONLY valid JSON in this exact structure:

{
  "projectName": "string",
  "description": "string"
}

Rules:
- Do not change the project name.
- Generate only the project description.
- Description should explain what the project is about.
- Description should be clear and useful.
- Keep it concise.
- Do not generate tasks.
- Do not generate subtasks.
- Do not generate priority.
- Do not generate complexity.
- Do not add markdown.
- Do not add explanation outside JSON.
`;


/* =====================================================
   TASK AI
===================================================== */

const taskSystemPrompt = `
You are TaskMatrix AI.

The user will provide a task title.

Based only on the task title, generate useful details
about that software development task.

Return ONLY valid JSON in this exact structure:

{
  "title": "string",
  "description": "string",
  "priority": "Low | Medium | High",
  "subtasks": ["string", "string", "string"],
  "complexity": "Low | Medium | High"
}

Rules:
- Do not change the task title.
- Explain what the task is about.
- Description should be clear and useful.
- Give 3 to 5 practical subtasks.
- Priority must be Low, Medium, or High.
- Complexity must be Low, Medium, or High.
- Do not generate project information.
- Do not require project information.
- Do not add markdown.
- Do not add explanation outside JSON.
`;


/* =====================================================
   GENERATE PROJECT DESCRIPTION
===================================================== */

export const generateProjectWithAI = async (req, res) => {
  try {
    const { projectName } = req.body;

    if (!projectName || !projectName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }

    console.log("Project Request:", projectName);

    const chatCompletion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: projectSystemPrompt,
          },
          {
            role: "user",
            content: `Project Title: ${projectName}`,
          },
        ],

        model: "openai/gpt-oss-20b",

        response_format: {
          type: "json_object",
        },
      });

    const aiResponse =
      chatCompletion.choices[0]?.message?.content || "";

    console.log("Project AI Response:", aiResponse);

    return res.status(200).json({
      success: true,
      response: aiResponse,
    });

  } catch (error) {
    console.error(
      "AI Project Generation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to generate project description",
    });
  }
};


/* =====================================================
   GENERATE TASK DETAILS
===================================================== */

export const generateTaskWithAI = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    console.log("Task Request:", title);

    const chatCompletion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: taskSystemPrompt,
          },
          {
            role: "user",
            content: `Task Title: ${title}`,
          },
        ],

        model: "openai/gpt-oss-20b",

        response_format: {
          type: "json_object",
        },
      });

    const aiResponse =
      chatCompletion.choices[0]?.message?.content || "";

    console.log("Task AI Response:", aiResponse);

    return res.status(200).json({
      success: true,
      response: aiResponse,
    });

  } catch (error) {
    console.error(
      "AI Task Generation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to generate task details",
    });
  }
};
