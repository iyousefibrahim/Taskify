# Taskify

Taskify is a task management application built using Node.js, Express, MongoDB, and Mongoose for the backend. The frontend is developed by using Angular (v19). This project was primarily a training exercise focused on backend development, with greater emphasis on implementing and refining server-side functionality than on frontend development.

---

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
  - Returns a custom JSON response when the rate limit is exceeded.

### Backend Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- validator.js
- express-rate-limit

---

## Frontend

The frontend was developed using **Angular v19** and includes the following implemented features:  
- **Bootstrap Integration:** Utilized `ng-bootstrap` for responsive and interactive UI components.  
- **Signals:** Implemented Angular Signals for efficient state management and reactivity.  
- **Authentication System:**  
  - User registration and login functionality.  
- **Home Page Features:**  
  - Displays all tasks assigned to the logged-in user.  
  - Includes options to mark tasks as complete.  
  - Allows users to delete tasks.  
  - Shows the total count of all tasks.  

### Frontend Technologies Used
- Angular v19
- ng-bootstrap
- Angular Signals

---