import { encryptPassword } from "../utills/encrypt.js";

export function userDeatailsFormatter(reqData) {
  const { userName, email, password, fullName, role } = reqData.body;
  let encryptedPassword = encryptPassword(password);
  return {
    fullName,
    userName,
    email,
    password: encryptedPassword,
    role: role || "student"
  };
}

export function userUpdateDeatailsFormatter(reqData) {
  const { fullName } = reqData.body;
  return { fullName };
}
