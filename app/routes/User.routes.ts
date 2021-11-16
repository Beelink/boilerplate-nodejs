import { Router } from "express";
import AuthJwtMiddleware from "../middlewares/AuthJwt.middleware";
import UserController from "../controllers/User.controller";

const router = Router();

router.get(
  "/user",
  [AuthJwtMiddleware.verifyToken],
  UserController.getCurrentUser
);

export default router;
