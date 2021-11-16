import { Response as IResponse } from "express";
import TDataResponse from "../types/DataResponse.type";

function sendDataResponse(
  res: IResponse,
  dataResponse: TDataResponse
): IResponse {
  return res.status(200).send({
    error: dataResponse.error || false,
    message: dataResponse.message,
    data: dataResponse.data || {},
  });
}

const HttpHelper = {
  sendDataResponse,
};

export default HttpHelper;
