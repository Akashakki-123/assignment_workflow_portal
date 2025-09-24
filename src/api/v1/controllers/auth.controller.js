import { registerUser } from "../helpers/auth.helper.js";
export async function register(req, res) {
  try {
    const { status, message, data } = await registerUser(req);
    return status ? created(res, message, data) : badRequest(res, message);
  } catch (err) {
    return unknownError(res, err.message);
  }
}
import { badRequest, created, success, unknownError } from "../helpers/response.helper.js";
import { loginUser } from "../helpers/auth.helper.js";

export async function login(req, res) {
  try {
    const { status, message, data } = await loginUser(req);
    return status ? success(res, message, data) : badRequest(res, message);
  } catch (err) {
    return unknownError(res, err.message);
  }
}
