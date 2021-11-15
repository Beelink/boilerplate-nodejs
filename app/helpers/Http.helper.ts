import { Response as IResponse } from "express";
import TDataResponse from "../types/DataResponse.type";

function sendDataResponse(res: IResponse, dataResponse: TDataResponse) {
  if (dataResponse.error) {
    res.status(200).send({ error: true, message: dataResponse.message });
  } else {
    res.status(200).send({
      error: false,
      message: dataResponse.message?.toString(),
      data: dataResponse.data,
    });
  }
}

const HttpHelper = {
  sendDataResponse,
};

export default HttpHelper;
