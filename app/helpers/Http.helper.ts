import { Response as IResponse } from "express";
import apiConfig from "../config/Api.config";
import TDataResponse from "../types/DataResponse.type";

function sendDataResponse(res: IResponse, dataResponse: TDataResponse): void {
  res.status(200).send({
    error: dataResponse.error || false,
    message: dataResponse.message,
    data: dataResponse.data || {},
  });
}

function sendFileUrl(res: IResponse): void {
  res.sendFile(`${apiConfig.apiPrefix}/`);
}

const HttpHelper = {
  sendDataResponse,
  sendFileUrl,
};

export default HttpHelper;
