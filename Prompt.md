## TaskMatrix – Sprint 14: The Walking Skeleton

This document records the main prompts and AI-assisted development activities used during the development of TaskMatrix.

AI tools were used primarily as a development assistant for debugging, reviewing implementation approaches, improving code quality, understanding errors, validating technical decisions, and documentation support.

The overall project structure, feature decisions, implementation flow, and integration were developed and reviewed by me.

---

# 1. Development Approach

The development process followed a practical full-stack development workflow:

1. Understand the Sprint 14 requirements.
2. Define the authentication flow.
3. Design the frontend and backend structure.
4. Implement the required functionality.
5. Integrate frontend with backend APIs.
6. Test authentication and protected routes.
7. Debug issues during local development.
8. Configure production deployment.
9. Verify the deployed application.
10. Document the completed work.

AI assistance was used when required during these stages, but the generated suggestions were reviewed and adapted before being included in the project.

---

# 2. Project Understanding

### Prompt

```text
I am building TaskMatrix, a full-stack Agile Project Management Platform.

For Sprint 14, the main objective is to create a Walking Skeleton with a working authentication foundation.

Help me break down the Sprint 14 requirements into practical frontend, backend, database, authentication, API, and deployment tasks.
````

### Purpose

Used to organize the Sprint 14 requirements into an implementation plan before development.

---

# 3. Authentication Architecture

### Prompt

```text
Help me design a secure authentication flow for a MERN application using:

- React
- Node.js
- Express.js
- MongoDB
- JWT
- bcrypt
- HttpOnly cookies

The required flow is:

Register → Login → Protected Dashboard → Logout

Explain how the frontend, backend, database, JWT, cookies, and authentication middleware should interact.
```

### Purpose

Used as a reference while designing the authentication architecture and request flow.

---

# 4. Backend Folder Structure

### Prompt

```text
Suggest a clean Express.js backend structure for an authentication-based MERN application using controllers, routes, models, middleware, configuration, and utility functions.

Keep the structure simple and suitable for a small production-oriented project.
```

### Purpose

Used to validate the backend organization and separation of responsibilities.

---

# 5. MongoDB User Model

### Prompt

```text
Review the structure of a MongoDB/Mongoose user model for an authentication system.

The model should contain the basic user information required for registration and login, while ensuring passwords are handled securely.
```

### Purpose

Used to review the user schema and authentication-related data requirements.

---

# 6. Registration API

### Prompt

```text
Review the logic for a user registration API in Express.js.

Requirements:

- Validate required fields
- Check whether the email already exists
- Hash the password using bcrypt
- Create the user in MongoDB
- Do not return the password
- Return an appropriate success/error response

Keep the implementation simple and secure.
```

### Purpose

Used to review validation, password hashing, duplicate-user handling, and API responses.

---

# 7. Login and JWT Authentication

### Prompt

```text
Review a login implementation using JWT authentication.

Requirements:

- Find the user using email
- Compare the password using bcrypt
- Generate a JWT containing the user identifier
- Store the JWT in an HttpOnly cookie
- Configure the cookie correctly for development and production
- Return basic user information without the password
```

### Purpose

Used to validate the login and JWT implementation.

---

# 8. Authentication Middleware

### Prompt

```text
Review an Express authentication middleware that reads a JWT from an HttpOnly cookie.

The middleware should:

1. Check whether the token exists.
2. Verify the token using JWT_SECRET.
3. Extract the user ID.
4. Attach the user ID to req.user.
5. Reject missing, invalid, or expired tokens.
6. Continue to the next middleware when authentication succeeds.
```

### Purpose

Used for reviewing protected-route authentication and error handling.

---

# 9. Axios API Configuration

### Prompt

```text
Review an Axios configuration for a React frontend communicating with an Express backend.

Requirements:

- Use VITE_API_URL as the API base URL.
- Send HttpOnly authentication cookies with requests.
- Keep the configuration reusable across API calls.
```

### Purpose

Used to review frontend-backend API communication and credential configuration.

---

# 10. React Authentication State

### Prompt

```text
Review a React Context API based authentication state.

The application needs to maintain:

- Current user
- Initial authentication loading state
- Login
- Register
- Logout
- Current-user verification

The authentication state should be available to the application without creating a custom useAuth hook.
```

### Purpose

Used to review global authentication-state management using React Context API.

---

# 11. Protected Frontend Routes

### Prompt

```text
Review React Router authentication logic for these routes:

/login
/register
/dashboard

Requirements:

- Unauthenticated users should not access /dashboard.
- Authenticated users should be redirected to /dashboard when accessing login/register.
- Authentication should be checked when the application starts.
- Avoid creating multiple BrowserRouter instances.
```

### Purpose

Used to verify frontend route protection and authentication-based navigation.

---

# 12. CORS Configuration

### Prompt

```text
Help me configure Express CORS for a React frontend hosted separately from the backend.

The application uses HttpOnly cookies, so credentials must be supported.

The frontend URL should come from an environment variable instead of being hardcoded.
```

### Purpose

Used while configuring local and production frontend-backend communication.

---

# 13. Production Cookie Configuration

### Prompt

```text
Explain the correct cookie configuration for JWT authentication when a React frontend and Express backend are deployed on different HTTPS domains.

The authentication cookie should work securely in production while still allowing local development.
```

### Purpose

Used to understand and configure secure cookie behavior for production.

---

# 14. Environment Variables

### Prompt

```text
Review the environment variable setup for a MERN application.

The backend requires:

- MONGO_URI
- JWT_SECRET
- CLIENT_URL
- NODE_ENV
- PORT

The frontend requires:

- VITE_API_URL

Explain which variables should be kept secret and how local and production environments should be configured.
```

### Purpose

Used to review environment-based configuration and prevent sensitive configuration from being hardcoded.

---

# 15. Code Review

### Prompt

```text
Review my implementation without rewriting the entire project.

Check specifically for:

- Authentication bugs
- Incorrect API routes
- JWT handling issues
- Cookie configuration
- CORS issues
- React Router issues
- Context API issues
- Environment variable mistakes
- Unnecessary code

Explain the problem and suggest the smallest practical correction.
```

### Purpose

Used for targeted code review and debugging instead of generating the entire application.

---

# 16. README Documentation

### Prompt

```text
Create professional README documentation for my TaskMatrix Sprint 14 project.

The documentation should describe:

- Project overview
- Sprint objective
- Features implemented
- Tech stack
- Project structure
- Authentication flow
- API endpoints
- Environment variables
- Local setup
- Deployment
- Live demo
- GitHub repository
- Sprint outcome

Keep the documentation consistent with the actual implementation.
```

### Purpose

Used to organize and document the completed Sprint 14 implementation.

---

# 17. AI Usage Philosophy

AI tools were used as a supporting development resource, similar to technical documentation, debugging assistance, and code review.

The following principles were followed:

* I first understood the requirement before implementing it.
* AI suggestions were reviewed before use.
* Generated code was adapted to the existing project structure.
* Errors were investigated and fixed based on the actual application behavior.
* Unnecessary generated functionality was not added.
* Security-related suggestions were reviewed carefully.
* Final implementation and integration were tested in the application.

---

# 18. Key Learning Outcomes

Through the development of Sprint 14, I strengthened my understanding of:

* MERN application architecture
* REST API development
* MongoDB and Mongoose
* Password hashing with bcrypt
* JWT authentication
* HttpOnly cookies
* Express middleware
* React Context API
* Protected routes
* Axios API integration
* CORS and credentials
* Environment variables
* Vercel deployment
* Render deployment
* Production debugging
* Git and GitHub workflow

---

# 19. Development Ownership

The TaskMatrix project was developed as a hands-on implementation project.

AI assistance was mainly used for:

* Debugging
* Technical reference
* Code review
* Error analysis
* Documentation support
* Understanding deployment issues

The application architecture, feature scope, project integration, testing, debugging, and final implementation decisions were reviewed and handled as part of the development process.

---

## Conclusion

Prompts in this document represent the major areas where AI assistance was used during Sprint 14.

The purpose of maintaining this file is to keep the development process transparent and document how AI-assisted development was incorporated into the project while maintaining developer ownership of the implementation.

```

