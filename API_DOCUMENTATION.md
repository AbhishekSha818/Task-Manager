# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All endpoints (except auth routes) require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### Auth Endpoints

#### 1. Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "username": "username"
  }
}
```

**Error (400 Bad Request):**
```json
{
  "errors": [
    {
      "param": "email",
      "msg": "Invalid email"
    }
  ]
}
```

---

#### 2. Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "username": "username"
  }
}
```

**Error (401 Unauthorized):**
```json
{
  "error": "Invalid email or password"
}
```

---

### Task Endpoints

All task endpoints require JWT authentication.

#### 1. Get All Tasks
**GET** `/tasks?status=Pending`

**Query Parameters:**
- `status` (optional) - Filter by status: `Pending`, `In Progress`, or `Completed`

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Complete project",
    "description": "Finish the task manager app",
    "status": "In Progress",
    "createdAt": "2024-03-13T10:00:00Z",
    "updatedAt": "2024-03-13T10:30:00Z"
  }
]
```

---

#### 2. Get Single Task
**GET** `/tasks/:id`

**Parameters:**
- `id` (required) - Task ID (MongoDB ObjectId)

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "title": "Complete project",
  "description": "Finish the task manager app",
  "status": "In Progress",
  "createdAt": "2024-03-13T10:00:00Z",
  "updatedAt": "2024-03-13T10:30:00Z"
}
```

**Error (404 Not Found):**
```json
{
  "error": "Task not found"
}
```

---

#### 3. Create Task
**POST** `/tasks`

**Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, bread, eggs",
  "status": "Pending"
}
```

**Note:** `description` and `status` are optional. Default status is `Pending`.

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "title": "Buy groceries",
  "description": "Milk, bread, eggs",
  "status": "Pending",
  "createdAt": "2024-03-13T10:00:00Z",
  "updatedAt": "2024-03-13T10:00:00Z"
}
```

**Error (400 Bad Request):**
```json
{
  "errors": [
    {
      "param": "title",
      "msg": "Title must be at least 3 characters"
    }
  ]
}
```

---

#### 4. Update Task
**PUT** `/tasks/:id`

**Parameters:**
- `id` (required) - Task ID

**Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, bread, eggs, butter",
  "status": "In Progress"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "507f1f77bcf86cd799439011",
  "title": "Buy groceries",
  "description": "Milk, bread, eggs, butter",
  "status": "In Progress",
  "createdAt": "2024-03-13T10:00:00Z",
  "updatedAt": "2024-03-13T10:45:00Z"
}
```

---

#### 5. Delete Task
**DELETE** `/tasks/:id`

**Parameters:**
- `id` (required) - Task ID

**Response (200 OK):**
```json
{
  "message": "Task deleted successfully"
}
```

**Error (404 Not Found):**
```json
{
  "error": "Task not found"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - Missing or invalid token |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

---

## Error Handling

All errors follow this format:

```json
{
  "error": "Error message",
  "errors": [
    {
      "param": "field_name",
      "msg": "Validation error message"
    }
  ]
}
```

---

## Task Status Values

Tasks can have one of three statuses:

- **Pending** - Task not yet started (default)
- **In Progress** - Task is being worked on
- **Completed** - Task is finished

---

## Example Workflow

### 1. Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "johndoe",
    "password": "password123"
  }'
```

### 2. Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete homework",
    "description": "Math and science"
  }'
```

### 3. Get All Tasks
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <token>"
```

### 4. Update Task
```bash
curl -X PUT http://localhost:5000/api/tasks/<task_id> \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "In Progress"
  }'
```

### 5. Delete Task
```bash
curl -X DELETE http://localhost:5000/api/tasks/<task_id> \
  -H "Authorization: Bearer <token>"
```

---

## Testing with Postman

1. Import the API endpoints into Postman
2. Set up environment variables:
   - `baseUrl` = `http://localhost:5000/api`
   - `token` = (JWT token from login response)
3. Use `{{baseUrl}}` and `{{token}}` in requests
4. Set Authorization header to `Bearer {{token}}`

---

## Rate Limiting

Currently not implemented. For production, consider adding rate limiting middleware.

---

## CORS

CORS is enabled for all origins. For production, restrict to specific domains.

---

## Notes

- Tokens expire after 7 days (configurable in `.env` with `JWT_EXPIRE`)
- Passwords are hashed using PBKDF2 with SHA512
- All timestamps are in UTC (ISO 8601 format)
- Task IDs are MongoDB ObjectIds (24-character hex strings)
- User sessions persist automatically on the frontend
