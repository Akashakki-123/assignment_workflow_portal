# Assignment Workflow Portal Backend

A workflow-driven Assignment Management Portal backend with role-based access for Teachers and Students.

## API Routes Overview

| Method | Route | Description | Auth/Role |
|--------|-------|-------------|-----------|
| POST   | /v1/api/auth/register         | Register as teacher/student         | None        |
| POST   | /v1/api/auth/login            | Login, get JWT and role            | None        |
| POST   | /v1/api/assignments/create    | Create assignment                  | Teacher     |
| POST   | /v1/api/assignments/update    | Update assignment                  | Teacher     |
| GET    | /v1/api/assignments/list      | List assignments (filter, paginate)| Teacher     |
| GET    | /v1/api/assignments/submissions/:id | View all submissions for assignment | Teacher |
| PATCH  | /v1/api/assignments/review/:submissionId | Mark submission as reviewed | Teacher |
| GET    | /v1/api/assignments/published | List published assignments         | Student     |
| POST   | /v1/api/assignments/submit    | Submit answer                      | Student     |
| GET    | /v1/api/assignments/mysubmission/:id | View own submission for assignment | Student |

## Features
- Authentication & Role-Based Login (JWT)
- Teacher Dashboard: Assignment lifecycle management
- Student Dashboard: Assignment handling and submission
- Assignment listing, filtering, and pagination
- Submission management and review
- Secure, modular Node.js + Express.js + MongoDB backend

## Setup Instructionsr̥

1. **Clone the repository:**
	 ```sh
	 git clone <your-repo-url>
	 cd assignment_workflow_portal
	 ```
2. **Install dependencies:**
	 ```sh
	 npm install
	 ```
3. **Configure environment variables:**
	 - Copy `.env.example` to `.env` and set values for:
		 - `MONGODB_URI`
		 - `JWT_SECRET`
		 - `JWT_EXPIRES_IN`
		 - `BCRYPT_SALT_ROUNDS`
		 - `PORT`
4. **Start the server:**
	 ```sh
	 npm start
	 # or for development
	 npx nodemon index.js
	 ```

## API Endpoints

### Auth
- `POST /v1/api/auth/register` — Register (teacher/student)
- `POST /v1/api/auth/login` — Login (returns JWT, role)

### Assignments (Teacher)
- `POST /v1/api/assignments/create` — Create assignment
- `POST /v1/api/assignments/update` — Update assignment
- `GET /v1/api/assignments/list?status=Draft|Published|Completed&page=1&limit=10` — List assignments (filter, paginate)
- `GET /v1/api/assignments/submissions/:id` — View all submissions for assignment
- `PATCH /v1/api/assignments/review/:submissionId` — Mark submission as reviewed

### Assignments (Student)
- `GET /v1/api/assignments/published?page=1&limit=10` — List published assignments
- `POST /v1/api/assignments/submit` — Submit answer
- `GET /v1/api/assignments/mysubmission/:id` — View own submission for assignment

## API Documentation

A Postman collection is provided in `docs/AssignmentWorkflowPortal.postman_collection.json` (create this file if needed).

### Example Request: Register
```http
POST /v1/api/auth/register
Content-Type: application/json
{
	"fullName": "John Doe",
	"userName": "johndoe",
	"email": "john@example.com",
	"password": "yourpassword",
	"role": "teacher" // or "student"
}
```

### Example Request: Login
```http
POST /v1/api/auth/login
Content-Type: application/json
{
	"email": "john@example.com",
	"password": "yourpassword"
}
```

### Example Request: Create Assignment (Teacher)
```http
POST /v1/api/assignments/create
Authorization: Bearer <JWT>
Content-Type: application/json
{
	"title": "Assignment 1",
	"description": "Solve the problems.",
	"dueDate": "2025-10-01T23:59:59.000Z"
}
```

### Example Request: Submit Assignment (Student)
```http
POST /v1/api/assignments/submit
Authorization: Bearer <JWT>
Content-Type: application/json
{
	"assignmentId": "<assignment_id>",
	"answer": "My answer text."
}
```



