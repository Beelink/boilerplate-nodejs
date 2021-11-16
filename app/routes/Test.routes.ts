import { Router } from "express";
import TestController from "../controllers/Test.controller";

const router = Router();

router.get("/test", TestController.test);

export default router;
