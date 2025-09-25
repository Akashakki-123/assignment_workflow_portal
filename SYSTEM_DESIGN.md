# System Design: Assignment Workflow Portal

## Overview
A workflow-driven assignment management system for teachers and students, supporting role-based access, assignment lifecycle, and secure submissions.

## Architecture
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (stateless), bcrypt for password hashing
- **Frontend:** (Optional) React.js

## Key Schema Design
- **User:**
  - `fullName`, `userName`, `email`, `password`, `role` (teacher/student)
- **Assignment:**
  - `title`, `description`, `dueDate`, `status` (Draft/Published/Completed), `createdBy`
- **Submission:**
  - `assignmentId`, `studentId`, `answer`, `submittedAt`, `reviewed`
  - Unique index on (`assignmentId`, `studentId`) ensures one submission per student per assignment

## Workflow & Access Control
- All routes protected by JWT authentication
- Role-based middleware restricts teacher-only and student-only actions
- Assignment state transitions enforced in business logic
- Submissions only allowed for published assignments before due date

## Scaling Considerations
- **Stateless API:** Horizontal scaling is easy (add more app servers)
- **Database:** Use MongoDB replica sets for high availability
- **Indexes:** On user email, assignment status, and submission (assignmentId, studentId)
- **Caching:** Use Redis for frequently accessed assignment lists and user sessions if needed
- **API Rate Limiting:** Add middleware (e.g., express-rate-limit) to prevent abuse

## Handling Failures
- **Critical Flows:**
  - Submissions: Use transactions or retry logic to ensure no duplicate/failed submissions
  - Assignment state: Only allow valid transitions, prevent race conditions
- **Validation:** All input validated on server
- **Error Handling:** Consistent error responses with HTTP status codes

## Security Best Practices
- Passwords hashed with bcrypt
- JWT secrets stored in environment variables
- No sensitive data in JWT payload
- Only teachers can access/manage assignments and submissions
- Only students can submit/view their own answers

## Analytics & Bonus Features
- Count of submissions per assignment (aggregation query)
- Pagination on all list endpoints
- Teachers can mark submissions as reviewed

## How to Scale for 100x Traffic
- Use load balancers and multiple app servers
- Move static assets to CDN
- Optimize DB queries and add more read replicas
- Use Redis/memory cache for hot data
- Monitor with logging and alerting

## Where to Add Caching
- Assignment lists (teacher/student dashboard)
- Frequently accessed user/session data

## Handling Deadlines & Failures
- Prevent submissions after due date at DB and API level
- Log failed submissions and alert admin if needed

---
This design ensures security, scalability, and a smooth workflow for both teachers and students.
