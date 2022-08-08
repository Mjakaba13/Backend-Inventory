import { Router } from "express";
import {
  getAllUsers,
  createUser,
  deleteUser,
  getUser,
  updateUser,
  loginUser,
} from "../controllers/users.js";
import { checkForUser, checkUserPassword } from "../middleware/user.js";
import { createUserValidation } from "../middleware/validation.js";

const router = Router();

router.post("/user/create", createUserValidation, createUser);
router.post("/user/update", checkForUser, updateUser);
router.post("/user/delete", checkForUser, deleteUser);
router.post("/user", checkForUser, getUser);
router.post("/login", loginUser);

router.get("/users", getAllUsers);

export default router;
