# Taskify

Taskify is a task management application built using Node.js, Express, MongoDB, and Mongoose for the backend. The frontend will be developed using Angular but is currently empty as it is under development.

## Features Implemented

### Backend
- **Node.js & Express:** Server-side setup and API endpoints for CRUD operations.
- **MongoDB & Mongoose:** Database integration and schema design.
- **User Authentication:**
  - JWT-based authentication.
  - Password hashing using `bcryptjs`.
  - Token verification middleware.
- **User Model & Routes:**
  - Register new users.
  - Login users with token generation.
  - Password validation and hashing.
  - `createdBy` field added to tasks referencing `User`.
- **Task Model & Routes:**
  - CRUD operations for tasks.
  - Tasks linked to specific users.
  - `createdBy` field added for task ownership.
- **Error Handling:**
  - Centralized error handling using a custom `AppError` class.
  - Middleware for handling async errors.

## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- validator.js

## Project Structure
```
|-- controllers
|-- middlewares
|-- models
|-- routes
|-- utils
|-- .env
|-- server.js
|-- README.md
```

## Frontend (Upcoming)
The frontend will be developed using Angular and is currently not implemented.