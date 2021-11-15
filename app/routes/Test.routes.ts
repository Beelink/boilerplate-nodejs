import { Request as IRequest, Response as IResponse, Router } from "express";
import HttpHelper from "../helpers/Http.helper";

const router = Router();

router.get("/test", (req: IRequest, res: IResponse) => {
  return HttpHelper.sendDataResponse(res, {
    message: "Test route",
  });
});

export default router;
