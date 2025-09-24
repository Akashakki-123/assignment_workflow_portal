// Mark submission as reviewed (teacher)
export async function markSubmissionReviewed(submissionId) {
  try {
    const updated = await submissionModel.findByIdAndUpdate(
      submissionId,
      { reviewed: true },
      { new: true }
    );
    if (!updated) return returnFormatter(false, "Submission not found");
    return returnFormatter(true, "Submission marked as reviewed", updated);
  } catch (error) {
    return returnFormatter(false, error.message);
  }
}
// get student's own submission for an assignment
export async function getStudentSubmission(assignmentId, studentId) {
  try {
    const submission = await submissionModel.findOne({ assignmentId, studentId });
    if (!submission) return returnFormatter(false, "No submission found");
    return returnFormatter(true, "Submission found", submission);
  } catch (error) {
    return returnFormatter(false, error.message);
  }
}
import assignmentModel from "../models/assignment.model.js";
import submissionModel from "../models/submission.model.js";
import { assignmentFormatter, updateAssignmentFormatter } from "../formatters/assignment.formatter.js";
import { returnFormatter } from "../formatters/common.formatter.js";
import { AssignmentCreatedMessage, AssignmentSuccessMessage, SubmissionSuccessMessage } from "../constants/messageConstants.js";

// create
export async function createAssignment(request, teacherId) {
  try {
    const formatted = assignmentFormatter(request, teacherId);
    const newAssignment = await assignmentModel.create(formatted);
    return returnFormatter(true, AssignmentCreatedMessage, newAssignment);
  } catch (error) {
    return returnFormatter(false, error.message);
  }
}

// update
export async function updateAssignment(request) {
  try {
    const existing = await assignmentModel.findById(request.body.id);
    if (!existing) return returnFormatter(false, "Assignment not found");

    // rules
    if (existing.status === "Completed") {
      return returnFormatter(false, "Completed assignments cannot be updated");
    }

    // Draft editable, Published cannot be deleted (handled in routes/controllers)
    const formatted = updateAssignmentFormatter(request);
    // if status change from Published -> Completed allowed
    const updated = await assignmentModel.findByIdAndUpdate(request.body.id, formatted, { new: true });
    return returnFormatter(true, AssignmentSuccessMessage, updated);
  } catch (error) {
    return returnFormatter(false, error.message);
  }
}

// get assignments by status (teacher)
export async function getAssignmentsByStatus(status, teacherId, page = 1, limit = 10) {
  try {
    const filter = {};
    if (status) filter.status = status;
    if (teacherId) filter.createdBy = teacherId;
    const skip = (page - 1) * limit;
    const total = await assignmentModel.countDocuments(filter);
    const assignments = await assignmentModel.find(filter)
      .populate("createdBy", "fullName email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    return returnFormatter(true, AssignmentSuccessMessage, { assignments, total, page, limit });
  } catch (error) {
    return returnFormatter(false, error.message);
  }
}

// get published (student)
export async function getPublishedAssignments(page = 1, limit = 10) {
  try {
    const filter = { status: "Published" };
    const skip = (page - 1) * limit;
    const total = await assignmentModel.countDocuments(filter);
    const assignments = await assignmentModel.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    return returnFormatter(true, AssignmentSuccessMessage, { assignments, total, page, limit });
  } catch (error) {
    return returnFormatter(false, error.message);
  }
}

// submit answer (student)
export async function submitAssignmentAnswer(request, studentId) {
  try {
    const { assignmentId, answer } = request.body;

    // check assignment exists and published and not past due
    const assignment = await assignmentModel.findById(assignmentId);
    if (!assignment) return returnFormatter(false, "Assignment not found");
    if (assignment.status !== "Published") return returnFormatter(false, "Assignment not open for submissions");
    if (new Date() > new Date(assignment.dueDate)) return returnFormatter(false, "Due date passed");

    const existing = await submissionModel.findOne({ assignmentId, studentId });
    if (existing) return returnFormatter(false, "Already submitted");

    const submission = await submissionModel.create({ assignmentId, studentId, answer });
    return returnFormatter(true, SubmissionSuccessMessage, submission);
  } catch (error) {
    return returnFormatter(false, error.message);
  }
}

// get submissions for teacher
export async function getSubmissionsForAssignment(assignmentId) {
  try {
    const submissions = await submissionModel.find({ assignmentId })
      .populate("studentId", "fullName email");
    return returnFormatter(true, "Submissions list", submissions);
  } catch (error) {
    return returnFormatter(false, error.message);
  }
}
