import { Router } from "express";
import UserController from "./user.controller";
import { body, check } from "express-validator";
import { authMiddleware } from "../../middlewares";
const router = Router();

const { register, login, logout, editUser, getUsers } = UserController;

const authBaseApiUrl: string = "/api/auth";

router
  .post(
    `${authBaseApiUrl}/register`,
    [
      body("email").isEmail().notEmpty(),
      body("password").isLength({ min: 8, max: 24 }).notEmpty()
    ],
    register
  )
  .post(`${authBaseApiUrl}/login`, login)
  .get(`${authBaseApiUrl}/logout`, authMiddleware(), logout)
  .get(`${authBaseApiUrl}/users`, authMiddleware(), getUsers)
  .put(
    `${authBaseApiUrl}/user`,
    [authMiddleware(), check(["first_name", "second_name"]).notEmpty()],
    editUser
  );

export default router;
