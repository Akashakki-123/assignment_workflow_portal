import { addUserSuccessMessage, UserSuccessMessage, UserUpdateSuccessMessage } from "../constants/messageConstants.js";
import { returnFormatter } from "../formatters/common.formatter.js";
import { userDeatailsFormatter, userUpdateDeatailsFormatter } from "../formatters/user.formatter.js";
import userModel from "../models/user.model.js";

// add user
export async function addUser(requestsObject) {
  try {
    const formattedData = userDeatailsFormatter(requestsObject);
    const newUserData = await userModel.create(formattedData);
    return returnFormatter(true, addUserSuccessMessage , newUserData);
  } catch (error) {
    return returnFormatter(false, error.message);
  }
}

// update user
export async function updateUserInfo(requestsObject) {
  try {
    console.log(requestsObject.body.id);
    let userDAta = await userModel.findById(requestsObject.body.id);
    if(!userDAta){
      return returnFormatter(false,"User not exist");
    }
    const formattedData = userUpdateDeatailsFormatter(requestsObject);
    const updatedUser = await userModel.findByIdAndUpdate(requestsObject.body.id,formattedData,{new:true});
    return returnFormatter(true, UserUpdateSuccessMessage , updatedUser);
  } catch (error) {
    return returnFormatter(false, error.message);
  }
}

// get user
export async function getUserInfo(id) {
  try {
    const userData = await userModel.findById(id).select("-password");
    return returnFormatter(true, UserSuccessMessage , userData);
  } catch (error) {
    return returnFormatter(false, error.message);
  }
}

// get all users
export async function getAllUserInfo() {
  try {
    const userData = await userModel.find().select("-password");
    return returnFormatter(true, UserSuccessMessage , userData);
  } catch (error) {
    return returnFormatter(false, error.message);
  }
}
