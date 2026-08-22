import { Router } from "express";

import {
  register,
  login,
  changePassword,
} from "../controllers/auth.controller.js";

import {
  validateRegister,
  validateLogin,
  validateChangePassword,
} from "../validators/auth.validator.js";

import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  validateRegister,
  register
);

router.post(
  "/login",
  validateLogin,
  login
);

router.put(
  "/change-password",
  authenticate,
  validateChangePassword,
  changePassword
);

export default router;