import { CallbackError as TCallbackError } from "mongoose";

type TDataResponse = {
  error?: boolean;
  message: string | TCallbackError;
  data?: object;
};

export default TDataResponse;
