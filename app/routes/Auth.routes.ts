import SignUpMiddleware from "../middlewares/SignUp.middleware";
import AuthController from "../controllers/Auth.contoller";
import { Router } from "express";

const router = Router();

router.get("/auth/user", AuthController.getCurrentUser);

router.post(
  "/auth/signup",
  [SignUpMiddleware.checkDuplicateUsernameOrEmail],
  AuthController.signUp
);

router.post("/auth/signin", AuthController.signIn);

export default router;
