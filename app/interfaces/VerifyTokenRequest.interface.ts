import { JwtPayload as IJwtPayload } from "jsonwebtoken";
import { Request as IRequest } from "express";

interface IVerifyTokenRequest extends IRequest {
  user: IJwtPayload | undefined;
}

export default IVerifyTokenRequest;
