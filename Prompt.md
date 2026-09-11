# TaskMatrix – Prompts & AI-Assisted Development

This document records the main prompts and AI-assisted development activities used during the development of TaskMatrix.

AI tools were used mainly as a supporting resource for understanding requirements, debugging errors, reviewing specific implementation issues, and improving documentation. The core coding, feature implementation, integration, testing, and project decisions were handled as part of my own development work.

---

# 1. Development Approach

The development process followed a practical full-stack workflow:

1. Understand the sprint requirements.
2. Plan the required features.
3. Implement the backend APIs and database models.
4. Build and connect the frontend pages and components.
5. Test the application locally.
6. Debug issues based on actual errors.
7. Improve the UI and user experience where required.
8. Document the completed work.

AI assistance was used only where it was useful during these stages. Suggestions were reviewed and adapted to the existing codebase instead of directly adding unrelated generated functionality.

---

# 2. Project Understanding

### Prompt

```text
I am building TaskMatrix, a full-stack Agile Project Management Platform.

Help me understand the sprint requirements and break them into practical frontend, backend, database, API, and UI tasks.

Keep the implementation suitable for my existing project structure and avoid adding unnecessary features.
```

### Purpose

Used to understand the sprint requirements and organize the implementation work.

---

# 3. Authentication Development

### Prompt

```text
Review my existing MERN authentication implementation.

Check the registration, login, JWT, HttpOnly cookie, logout, authentication middleware, protected routes, and current-user flow.

If there is an error, explain the actual problem and suggest the smallest practical fix instead of rewriting the whole project.
```

### Purpose

Used mainly for debugging and reviewing authentication issues during development.

---

# 4. API and Route Debugging

### Prompt

```text
I am getting an API error in my TaskMatrix project.

Review the frontend API call, Express route, controller, and backend response.

Identify why the request is failing and tell me exactly which file and line of logic should be corrected.

Do not redesign the existing implementation.
```

### Purpose

Used when frontend and backend routes were not matching or an API request returned an unexpected error.

---

# 5. Project Management CRUD

### Prompt

```text
I want to add Project CRUD functionality to my existing TaskMatrix MERN application.

The project should support:

- Create project
- Get projects
- Get a single project
- Update project
- Delete project

Use the existing authentication system so each user can access only their own projects.

Keep the implementation simple and consistent with my current folder structure.
```

### Purpose

Used as a reference while planning the Project CRUD feature. The implementation was integrated into the existing application structure and tested locally.

---

# 6. Project Model and Controller Review

### Prompt

```text
Review my Project Mongoose model and controller.

The project needs:

- projectName
- description
- status
- authorId
- timestamps

Check the validation, user ownership, CRUD operations, and MongoDB queries.

Point out only the issues that need to be fixed.
```

### Purpose

Used for reviewing the Project model and CRUD controller logic.

---

# 7. Task Management Design

### Prompt

```text
I have Projects in TaskMatrix and now I need Tasks inside each project.

Explain the correct relationship between Project and Task in MongoDB/Mongoose.

A task should belong to one project and one user.

Suggest a simple Task model and API structure that fits my existing Project CRUD implementation.
```

### Purpose

Used to understand the Project → Task relationship before implementing Task Management.

---

# 8. Task CRUD Implementation

### Prompt

```text
Help me implement Task CRUD in my existing TaskMatrix backend.

Task fields:

- title
- description
- project
- priority
- status
- dueDate
- authorId

Required operations:

- Create task
- Get all tasks
- Get tasks for a project
- Get single task
- Update task
- Delete task

A task should only be created for a project owned by the logged-in user.

Keep the implementation consistent with my existing controllers, routes, authentication middleware, and Mongoose models.
```

### Purpose

Used as a reference while implementing Task Management. The task APIs were then tested with actual project and task data.

---

# 9. Task API Debugging

### Prompt

```text
Review this Task API error from my TaskMatrix project.

Check whether the issue is related to the route, controller, project ID, authentication middleware, or request body.

Explain the cause and give the smallest correction required.
```

### Purpose

Used for debugging Task API issues during local development.

---

# 10. Project and Task Frontend Integration

### Prompt

```text
I already have Project CRUD working in my React application.

Now connect Tasks with Projects without changing the existing UI unnecessarily.

The flow should be:

Projects → View Project → Project Details → Create Task → Task appears inside that project.

Use the existing Context API and Axios setup.
```

### Purpose

Used to plan the frontend flow between Projects and Tasks.

---

# 11. React Context Review

### Prompt

```text
Review my existing ProjectContext and TaskContext.

Check:

- API endpoints
- loading state
- error handling
- state updates after create/update/delete
- correct use of MongoDB _id
- consistency with the backend routes

Do not add unnecessary abstractions.
```

### Purpose

Used to review Context API state management and fix small frontend integration issues.

---

# 12. Dashboard Data

### Prompt

```text
Review my TaskMatrix dashboard data.

The dashboard should show:

- Total projects
- Total tasks
- Completed tasks
- In-progress tasks
- Recent tasks
- Recent projects

Check whether the frontend is using the correct task and project properties and MongoDB _id values.
```

### Purpose

Used to debug dashboard counts, task/project data mapping, and React key warnings.

---

# 13. UI and Navigation Review

### Prompt

```text
Review my existing TaskMatrix navigation and page flow.

The main navigation should support:

Dashboard
Projects
Tasks
Profile
Logout

Projects should allow opening a project and then managing its tasks.

Keep the existing design and avoid unnecessary UI redesign.
```

### Purpose

Used to review navigation and make the Project → Task workflow easier to use.

---

# 14. Toast Notifications

### Prompt

```text
I want to add simple success and error toast notifications to my existing TaskMatrix application.

Use react-hot-toast.

Show notifications for important actions such as:

- Login
- Registration
- Logout
- Project create/update/delete
- Task create/update/delete
- API errors

Do not add notifications for every data-fetching request.
```

### Purpose

Used to add lightweight feedback for important user actions without changing the existing UI.

---

# 15. Code Review and Debugging

### Prompt

```text
Review the specific code I provide from my TaskMatrix project.

Check for:

- API route mismatches
- MongoDB/Mongoose issues
- Authentication problems
- Incorrect IDs
- React state issues
- Context API issues
- Routing problems
- Unnecessary code

Explain the problem first and then provide the smallest practical fix.

Do not rewrite unrelated parts of the project.
```

### Purpose

This was one of the main ways AI assistance was used during development: targeted debugging and code review of specific issues rather than generating the complete application.

---

# 16. Documentation

### Prompt

```text
Update the TaskMatrix documentation according to the features that are actually implemented.

Include the current Project CRUD, Task CRUD, authentication, dashboard, notifications, project-task relationship, API endpoints, setup instructions, and sprint outcome.

Do not document features as completed if they are only planned.
```

### Purpose

Used to keep the README consistent with the actual implementation.

---

# 17. AI Usage Philosophy

AI tools were used as a supporting development resource rather than as the primary source of the project implementation.

The main use cases were:

- Understanding requirements
- Debugging specific errors
- Reviewing code
- Checking API and route issues
- Understanding technical concepts
- Improving documentation
- Getting implementation guidance when stuck

The project was not built by simply generating the complete application with AI. Code suggestions were reviewed, modified where necessary, integrated into the existing codebase, and tested locally.

The overall architecture, feature selection, coding workflow, integration, testing, debugging, and final implementation decisions were handled as part of my own development process.

---

# 18. Key Learning Outcomes

Through the development of TaskMatrix, I strengthened my understanding of:

- MERN application architecture
- REST API development
- MongoDB and Mongoose
- CRUD operations
- JWT authentication
- HttpOnly cookies
- Express middleware
- React Context API
- React Router
- Axios API integration
- Project and Task data relationships
- Protected API routes
- CORS and credentials
- Environment variables
- Error handling
- Toast notifications
- Git and GitHub workflow
- Deployment and production debugging

---

# 19. Development Ownership

TaskMatrix was developed as a hands-on full-stack implementation project.

AI assistance was mainly used for:

- Debugging
- Technical reference
- Code review
- Error analysis
- Understanding implementation approaches
- Documentation support

The actual application structure, feature scope, coding, frontend-backend integration, database usage, testing, debugging, and final implementation decisions were part of my development work.

---

# Conclusion

This document records the major areas where AI assistance was used during TaskMatrix development.

The purpose is to maintain transparency about AI-assisted development while accurately representing the level of AI involvement. AI was primarily used as a development assistant for specific problems and reviews, while the project implementation and final decisions remained under my ownership.
