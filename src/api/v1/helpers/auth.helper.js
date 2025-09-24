export async function registerUser(request) {
  try {
    const { fullName, userName, email, password, role } = request.body;
    if (!fullName || !userName || !email || !password || !role) {
      return returnFormatter(false, "All fields are required");
    }
    const existingUser = await userModel.findOne({ $or: [ { email }, { userName } ] });
    if (existingUser) {
      return returnFormatter(false, "Email or username already exists");
    }
    const hashedPassword = encryptPassword(password);
    const user = await userModel.create({ fullName, userName, email, password: hashedPassword, role });
    return returnFormatter(true, "Registration successful", { userId: user._id, role: user.role, fullName: user.fullName });
  } catch (err) {
    return returnFormatter(false, err.message);
  }
}
import userModel from "../models/user.model.js";
import { verifyPassword } from "../utills/encrypt.js";
import { signJwt } from "../utills/jwt.js";
import { returnFormatter } from "../formatters/common.formatter.js";

export async function loginUser(request) {
  try {
    const { email, password } = request.body;
    if (!email || !password) return returnFormatter(false, "Missing credentials");

    const user = await userModel.findOne({ email });
    if (!user) return returnFormatter(false, "Invalid credentials");

    const isValid = verifyPassword(password, user.password);
    if (!isValid) return returnFormatter(false, "Invalid credentials");

    const token = signJwt({ id: user._id, role: user.role });
    const data = { token, role: user.role, userId: user._id, fullName: user.fullName };
    return returnFormatter(true, "Login successful", data);
  } catch (err) {
    return returnFormatter(false, err.message);
  }
}

