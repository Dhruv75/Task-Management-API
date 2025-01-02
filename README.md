
# Task Management API

## Overview

This is a simple Node.js and Express-based REST API for managing tasks. Tasks are stored in a `tasks.json` file to persist data across server restarts. The API allows you to:

- Create a new task
- Fetch all tasks
- Fetch a task by its ID
- Update the status of a task
- Delete a task

## Prerequisites

- Node.js and npm installed on your system
- Postman or another API testing tool (optional but recommended)

## Setup Instructions

1. Clone the repository or download the code files.
2. Navigate to the project folder in your terminal.
3. Install the required dependencies by running:
   ```
   npm install
   ```
4. Ensure there is a `tasks.json` file in the project folder. If it doesn't exist, create it and add an empty array:
   ```
   []
   ```
5. Start the server using nodemon:
   ```
   nodemon index.js
   ```
6. The server will run at `http://localhost:3000`.

## Endpoints

### 1. Create a New Task

- **URL:** POST `/tasks`
- **Description:** Creates a new task with a title, description, and default status (pending).
- **Body:**
  ```
  {
    "title": "Task Title",
    "description": "Task Description"
  }
  ```
- **Response:**
  ```
  {
    "id": "unique-task-id",
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending"
  }
  ```

### 2. Fetch All Tasks

- **URL:** GET `/tasks`
- **Description:** Fetches all tasks.
- **Response:**
  ```
  [
    {
      "id": "unique-task-id",
      "title": "Task Title",
      "description": "Task Description",
      "status": "pending"
    }
  ]
  ```

### 3. Fetch a Task by ID

- **URL:** GET `/tasks/:id`
- **Description:** Fetches a specific task by its ID.
- **Response:**
  ```
  {
    "id": "unique-task-id",
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending"
  }
  ```

### 4. Update a Task Status

- **URL:** PUT `/tasks/:id`
- **Description:** Updates the status of a specific task.
- **Body:**
  ```
  {
    "status": "in-progress"
  }
  ```
- **Valid statuses:** `pending`, `in-progress`, `completed`
- **Response:**
  ```
  {
    "id": "unique-task-id",
    "title": "Task Title",
    "description": "Task Description",
    "status": "in-progress"
  }
  ```

### 5. Delete a Task

- **URL:** DELETE `/tasks/:id`
- **Description:** Deletes a task by its ID.
- **Response:** Status code 204 No Content.

## Error Handling

The API returns appropriate error messages and HTTP status codes:

- 400 Bad Request: Missing or invalid input.
- 404 Not Found: Task not found.

## Dependencies

- Express
- Body-Parser
- UUID
- Nodemon (for development)

## Notes

- Data is stored in the `tasks.json` file, so make sure it is writable by the application.
- This implementation is for learning and prototyping purposes. In a production setting, use a proper database like MongoDB or PostgreSQL.

## Author

Dhruv
