import { Request as IRequest } from "express";

interface IGetCurrentUserRequest extends IRequest {
  id: number;
}

export default IGetCurrentUserRequest;
