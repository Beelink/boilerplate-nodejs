import { Request as IRequest, Response as IResponse, Router } from "express";
import HttpHelper from "../helpers/Http.helper";
import AuthJwtMiddleware from "../middlewares/AuthJwt.middleware";
import AuthController from "../controllers/Auth.contoller";

const router = Router();

router.get("/test", (req: IRequest, res: IResponse) => {
  return HttpHelper.sendDataResponse(res, {
    message: "Test route",
  });
});

router.get(
  "/test/user",
  [AuthJwtMiddleware.verifyToken],
  AuthController.getCurrentUser
);

router.get(
  "/test/admin",
  [AuthJwtMiddleware.verifyToken, AuthJwtMiddleware.isAdmin],
  AuthController.getCurrentUser
);

export default router;
