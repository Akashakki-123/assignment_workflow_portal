import { Router } from "express";
import * as assignmentController from "../controllers/assignment.controller.js";
import { authenticate, authorize, validateAssignment, validateAssignmentUpdate, validateSubmission } from "../middlewares/auth.middleware.js";

const router = Router();

// Teacher routes
router.post("/create", authenticate, authorize("teacher"), validateAssignment, assignmentController.saveAssignment);
router.post("/update", authenticate, authorize("teacher"), validateAssignmentUpdate, assignmentController.editAssignment);
router.get("/list", authenticate, authorize("teacher"), assignmentController.listAssignments);
router.get("/submissions/:id", authenticate, authorize("teacher"), assignmentController.submissions);
router.patch("/review/:submissionId", authenticate, authorize("teacher"), assignmentController.reviewSubmission);

// Student routes
router.get("/published", authenticate, authorize("student"), assignmentController.publishedAssignments);
router.post("/submit", authenticate, authorize("student"), validateSubmission, assignmentController.submitAnswer);
router.get("/mysubmission/:id", authenticate, authorize("student"), assignmentController.mySubmission);

export default router;
