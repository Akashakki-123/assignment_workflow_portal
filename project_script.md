# Video Script: Assignment Workflow Portal - Detailed Functionality Explanation

## Introduction (0:00 - 0:45)
"Hello everyone! Welcome to this video where I'll explain my project called 'Assignment Workflow Portal'. This is a complete assignment management system built with Node.js, Express.js, and MongoDB. It has role-based access for teachers and students. In this video, I'll walk you through all the functionalities step by step, explaining what each API does and how the system works. By the end, you'll understand how this portal manages the entire assignment lifecycle from creation to submission and review."

## Project Overview & Tech Stack (0:45 - 2:00)
"This project is a backend API for an educational platform where teachers can create and manage assignments, and students can view and submit them. It's built using:

- Node.js and Express.js for the server
- MongoDB with Mongoose for database operations
- JWT (JSON Web Tokens) for authentication
- bcrypt for password hashing
- Express middlewares for validation and security

The system has two main user roles: Teachers and Students. Teachers handle assignment creation and management, while students interact with published assignments.

The project structure is modular with separate folders for:
- Controllers: Handle API request/response logic
- Models: Define database schemas
- Helpers: Contain business logic functions
- Middlewares: Authentication and validation
- Routes: Define API endpoints
- Formatters: Format response data"

## Database Models Explanation (2:00 - 4:00)
"Let me explain the three main database models:

1. User Model:
   - Stores user information: fullName, userName, email, password (hashed), role
   - Role can be either 'teacher' or 'student'
   - Email is unique to prevent duplicate accounts

2. Assignment Model:
   - Contains: title, description, dueDate, status, createdBy
   - Status can be: 'Draft' (not visible to students), 'Published' (visible to students), 'Completed' (past due date)
   - createdBy field links to the teacher who created it

3. Submission Model:
   - Links assignmentId and studentId
   - Contains: answer (student's submission), submittedAt timestamp, reviewed status
   - Has a unique compound index on (assignmentId, studentId) - meaning one student can only submit once per assignment

This design ensures data integrity and prevents duplicate submissions."

## Authentication System (4:00 - 6:00)
"Now let's look at how users authenticate and access the system.

First, user registration:
- API: POST /v1/api/auth/register
- Takes: fullName, userName, email, password, role
- What it does: Creates a new user account, hashes the password with bcrypt, stores in database
- Returns: Success message with user data (without password)

Then, user login:
- API: POST /v1/api/auth/login
- Takes: email, password
- What it does: Verifies credentials, generates JWT token containing user ID and role
- Returns: JWT token and user info

The JWT token is required for all other API calls. The system uses middlewares:
- authenticate: Verifies the JWT token is valid
- authorize: Checks if user has the required role (teacher/student) for that endpoint"

## Teacher Functionalities - Part 1 (6:00 - 8:00)
"Let's explore what teachers can do in this system.

1. Create Assignment:
   - API: POST /v1/api/assignments/create
   - Requires: JWT token with teacher role
   - Takes: title, description, dueDate
   - What it does: Creates new assignment with status 'Draft', links to teacher ID
   - Returns: Created assignment details

2. Update Assignment:
   - API: POST /v1/api/assignments/update
   - Requires: JWT token with teacher role
   - Takes: assignmentId, and fields to update (title, description, dueDate, status)
   - What it does: Updates existing assignment, validates the teacher owns it
   - Returns: Updated assignment data

3. List Assignments:
   - API: GET /v1/api/assignments/list
   - Query params: status (optional filter), page, limit (for pagination)
   - What it does: Returns assignments created by the logged-in teacher
   - Can filter by status: Draft, Published, or Completed
   - Supports pagination for large lists"

## Teacher Functionalities - Part 2 (8:00 - 10:00)
"Continuing with teacher features:

4. View Submissions for an Assignment:
   - API: GET /v1/api/assignments/submissions/:assignmentId
   - What it does: Retrieves all submissions for a specific assignment
   - Returns: List of submissions with student details, answers, submission time
   - Only the teacher who created the assignment can view its submissions

5. Review Submission:
   - API: PATCH /v1/api/assignments/review/:submissionId
   - What it does: Marks a specific submission as 'reviewed'
   - Updates the reviewed field to true
   - Helps teachers track which submissions they've checked"

## Student Functionalities (10:00 - 12:00)
"Now let's see what students can do:

1. View Published Assignments:
   - API: GET /v1/api/assignments/published
   - Query params: page, limit for pagination
   - What it does: Returns all assignments with status 'Published'
   - Students can browse available assignments to work on

2. Submit Assignment Answer:
   - API: POST /v1/api/assignments/submit
   - Takes: assignmentId, answer (text)
   - What it does: Creates a new submission record
   - Validates: Assignment is published, not past due date, student hasn't already submitted
   - Prevents duplicate submissions per student per assignment

3. View Own Submission:
   - API: GET /v1/api/assignments/mysubmission/:assignmentId
   - What it does: Returns the student's submission for a specific assignment
   - Shows: Their answer, submission time, review status"

## Security & Validation Features (12:00 - 14:00)
"The system has several security measures:

- Password Security: All passwords are hashed using bcrypt before storage
- JWT Authentication: Stateless tokens that expire, no server-side sessions
- Role-Based Access: Teachers and students have different permissions
- Input Validation: All inputs are validated using middleware
- Error Handling: Consistent error responses with appropriate HTTP status codes

Workflow Validations:
- Only teachers can create/update assignments
- Only students can submit answers
- Submissions only allowed for published assignments
- No submissions after due date
- One submission per student per assignment
- Teachers can only view submissions for their own assignments"

## Setup & Demo Walkthrough (14:00 - 16:00)
"To run this project locally:

1. Clone the repository
2. Run 'npm install' to install dependencies
3. Set up environment variables in .env file:
   - MONGODB_URI for database connection
   - JWT_SECRET for token signing
   - Other configs like PORT, BCRYPT_ROUNDS
4. Start the server with 'npm start'

For testing, use the Postman collection provided in docs/ folder.

Demo Flow:
- Register as teacher and student
- Login to get JWT tokens
- Teacher: Create assignment, publish it, view submissions
- Student: View published assignments, submit answer
- Teacher: Review the submission"

## Code Structure Walkthrough (16:00 - 18:00)
"Let me show you the key code files:

- Routes: Define API endpoints and link to controllers
- Controllers: Handle HTTP requests, call helper functions
- Helpers: Contain the main business logic (createAssignment, submitAnswer, etc.)
- Models: Database schemas with validation
- Middlewares: Authentication and input validation
- Formatters: Clean up response data before sending to client

This separation makes the code maintainable and testable."

#