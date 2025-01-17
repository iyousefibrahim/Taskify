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
  - **Mark Task as Complete:** Added an endpoint to mark tasks as completed.
- **Error Handling:**
  - Centralized error handling using a custom `AppError` class.
  - Middleware for handling async errors.
- **Rate Limiting:**
  - Implemented rate limiting using `express-rate-limit` to prevent abuse.
  - Limits the number of requests from a single IP address within a given time window (e.g., 20 requests per minute).
  - Returns a custom JSON response when the rate limit is exceeded:

## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- validator.js
- express-rate-limit

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