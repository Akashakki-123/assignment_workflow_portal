// Simple validation middleware for assignment creation
export function validateAssignment(req, res, next) {
  const { title, description, dueDate } = req.body;
  if (!title || !description || !dueDate) {
    return res.status(400).json({ status: false, message: "Title, description, and due date are required." });
  }
  next();
}

// Simple validation middleware for assignment update
export function validateAssignmentUpdate(req, res, next) {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ status: false, message: "Assignment id is required." });
  }
  next();
}

// Simple validation middleware for submission
export function validateSubmission(req, res, next) {
  const { assignmentId, answer } = req.body;
  if (!assignmentId || !answer) {
    return res.status(400).json({ status: false, message: "Assignment ID and answer are required." });
  }
  next();
}
import { verifyJwt } from "../utills/jwt.js";
import userModel from "../models/user.model.js";
import { unauthorized, forbidden } from "../helpers/response.helper.js";

// authenticate middleware
export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return unauthorized(res, "No token provided");
    const token = authHeader.split(" ")[1];
    const payload = verifyJwt(token);
    if (!payload) return unauthorized(res, "Invalid token");
    const user = await userModel.findById(payload.id).select("-password");
    if (!user) return unauthorized(res, "User not found");
    req.user = { id: user._id.toString(), role: user.role, fullName: user.fullName };
    next();
  } catch (err) {
    return unauthorized(res, "Authentication failed");
  }
}

// authorize middleware factory
export function authorize(role) {
  return (req, res, next) => {
    if (!req.user) return unauthorized(res, "Not authenticated");
    if (req.user.role !== role) return forbidden(res, "Not authorized");
    next();
  };
}
