# Assignment Workflow Backend

## Setup
1. copy files into folder
2. cp .env.example .env and set MONGO_URI, JWT_SECRET
3. npm install
4. npm run dev

## Endpoints
- POST /api/auth/login { email, password } -> { token, role }
- POST /api/users/add -> create user
- POST /api/users/update -> (auth) update
- GET /api/users/get/:id -> (auth)
- GET /api/users/all -> (auth teacher)
- POST /api/assignments/create -> (auth teacher)
- POST /api/assignments/update -> (auth teacher)
- GET /api/assignments/list?status=Draft -> (auth teacher)
- GET /api/assignments/submissions/:id -> (auth teacher)
- GET /api/assignments/published -> (auth student)
- POST /api/assignments/submit -> (auth student) { assignmentId, answer }

## Notes
- Protect /users/add if you want only admins to create users.
- Add pagination easily by using .limit() and .skip() in helpers.
