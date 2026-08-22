import { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service.js";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, password } = req.body;

    const user = await authService.register(
      userId,
      password
    );

    res.status(201).json({
      success: true,
      message: "Authentication credentials created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const result = await authService.login({
      email,
      password,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { currentPassword, newPassword } = req.body;

    const result = await authService.changePassword(
      req.user.userId,
      currentPassword,
      newPassword
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
}