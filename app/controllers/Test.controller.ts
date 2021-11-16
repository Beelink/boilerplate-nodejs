import { Request as IRequest, Response as IResponse } from "express";
import HttpHelper from "../helpers/Http.helper";

function test(req: IRequest, res: IResponse): void {
  HttpHelper.sendDataResponse(res, {
    message: "Test route",
  });
}

const TestController = {
  test,
};

export default TestController;
