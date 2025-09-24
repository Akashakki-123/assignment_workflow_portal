import { markSubmissionReviewed } from "../helpers/assignment.helper.js";
// Teacher: mark a submission as reviewed
export async function reviewSubmission(req, res) {
  try {
    const { status, message, data } = await markSubmissionReviewed(req.params.submissionId);
    return status ? success(res, message, data) : badRequest(res, message);
  } catch (error) {
    return unknownError(res, error.message);
  }
}
import { getStudentSubmission } from "../helpers/assignment.helper.js";
// Student: view their own submission for an assignment
export async function mySubmission(req, res) {
  try {
    const { status, message, data } = await getStudentSubmission(req.params.id, req.user.id);
    return status ? success(res, message, data) : badRequest(res, message);
  } catch (error) {
    return unknownError(res, error.message);
  }
}
import { created, success, badRequest, unknownError } from "../helpers/response.helper.js";
import {
  createAssignment,
  updateAssignment,
  getAssignmentsByStatus,
  getPublishedAssignments,
  submitAssignmentAnswer,
  getSubmissionsForAssignment
} from "../helpers/assignment.helper.js";

export async function saveAssignment(req, res) {
  try {
    const { status, message, data } = await createAssignment(req, req.user.id);
    return status ? created(res, message, data) : badRequest(res, message);
  } catch (error) {
    return unknownError(res, error.message);
  }
}

export async function editAssignment(req, res) {
  try {
    const { status, message, data } = await updateAssignment(req);
    return status ? success(res, message, data) : badRequest(res, message);
  } catch (error) {
    return unknownError(res, error.message);
  }
}

export async function listAssignments(req, res) {
  try {
    const { status: ok, message, data } = await getAssignmentsByStatus(
      req.query.status,
      req.user.id,
      parseInt(req.query.page) || 1,
      parseInt(req.query.limit) || 10
    );
    return ok ? success(res, message, data) : badRequest(res, message);
  } catch (error) {
    return unknownError(res, error.message);
  }
}

export async function publishedAssignments(req, res) {
  try {
    const { status: ok, message, data } = await getPublishedAssignments(
      parseInt(req.query.page) || 1,
      parseInt(req.query.limit) || 10
    );
    return ok ? success(res, message, data) : badRequest(res, message);
  } catch (error) {
    return unknownError(res, error.message);
  }
}

export async function submitAnswer(req, res) {
  try {
    const { status, message, data } = await submitAssignmentAnswer(req, req.user.id);
    return status ? created(res, message, data) : badRequest(res, message);
  } catch (error) {
    return unknownError(res, error.message);
  }
}

export async function submissions(req, res) {
  try {
    const { status, message, data } = await getSubmissionsForAssignment(req.params.id);
    return status ? success(res, message, data) : badRequest(res, message);
  } catch (error) {
    return unknownError(res, error.message);
  }
}
