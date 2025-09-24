import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/add", userController.saveUser); // open: create users (you can choose to protect later)
router.post("/update", authenticate, userController.updateUser);
router.get("/get/:id", authenticate, userController.getProfile);
router.get("/all", authenticate, authorize("teacher"), userController.getAllUsers); // only teacher can list all

export default router;
