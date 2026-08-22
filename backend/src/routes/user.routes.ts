import { Router } from "express";
import { user_role } from "@prisma/client";

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

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  authorizeRoles(user_role.ADMIN),
  getAllUsers
);

router.get(
  "/:id",
  authenticate,
  authorizeRoles(user_role.ADMIN),
  getUserById
);

router.post(
  "/",
  authenticate,
  authorizeRoles(user_role.ADMIN),
  validateCreateUser,
  createUser
);

router.put(
  "/:id",
  authenticate,
  authorizeRoles(user_role.ADMIN),
  validateUpdateUser,
  updateUser
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles(user_role.ADMIN),
  deleteUser
);

export default router;