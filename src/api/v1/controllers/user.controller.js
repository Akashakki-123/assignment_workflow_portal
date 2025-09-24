import { badRequest, created, success, unknownError } from "../helpers/response.helper.js";
import { addUser, getAllUserInfo, getUserInfo, updateUserInfo } from "../helpers/user.helper.js";

export async function saveUser(req, res) {
  try {
    const { status, message, data } = await addUser(req);
    return status ? created(res, message, data) : badRequest(res, message);
  } catch (error) {
    return unknownError(res, error.message);
  }
}

export async function updateUser(req, res) {
  try {
    console.log(req.body.id);
    const { status, message, data } = await updateUserInfo(req);
    return status ? success(res, message, data) : badRequest(res, message);
  } catch (error) {
    return unknownError(res, error.message);
  }
}

export async function getProfile(req, res) {
  try {
    const { status, message, data } = await getUserInfo(req.params.id);
    return status ? success(res, message, data) : badRequest(res, message);
  } catch (error) {
    return unknownError(res, error.message);
  }
}

export async function getAllUsers(req, res) {
  try {
    const { status, message, data } = await getAllUserInfo();
    return status ? success(res, message, data) : badRequest(res, message);
  } catch (error) {
    return unknownError(res, error.message);
  }
}
