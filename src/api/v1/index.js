import { Router } from 'express';

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import assignmentRoutes from "./routes/assignment.routes.js";



const router = Router();




router.use("/api/auth", authRoutes);
router.use("/api/users", userRoutes);
router.use("/api/assignments", assignmentRoutes);


export default router;
