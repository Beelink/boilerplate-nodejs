import { Router } from "express";
import UploadController from "../controllers/Upload.controller";
import AuthJwtMiddleware from "../middlewares/AuthJwt.middleware";

const router = Router();

router.post(
  "/upload",
  [AuthJwtMiddleware.verifyToken],
  UploadController.uploadSingleFile
);

router.get("/upload/:fileName", UploadController.getSingleFile);

export default router;
