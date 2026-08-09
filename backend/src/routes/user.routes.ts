import { Router } from "express";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import {
  validateCreateUser,
  validateUpdateUser,
} from "../validators/user.validator.js";

const router = Router();

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/", validateCreateUser, createUser);

router.put("/:id", validateUpdateUser, updateUser);

router.delete("/:id", deleteUser);

export default router;