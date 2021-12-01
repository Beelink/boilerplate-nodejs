import { Request as IRequest, Response as IResponse } from "express";
import HttpHelper from "../helpers/Http.helper";
import UploadUtils from "../utils/Upload.utils";

function uploadSingleFile(req: IRequest, res: IResponse): void {
  HttpHelper.sendDataResponse(res, {
    message: "Test route",
  });
}

function getSingleFile(req: IRequest, res: IResponse): void {
  // HttpHelper.sendDataResponse(res, {
  //   message: "Test route",
  // });
  res.sendFile(UploadUtils.getFilePath(req.params.fileName));
}

const UploadController = {
  uploadSingleFile,
  getSingleFile,
};

export default UploadController;
