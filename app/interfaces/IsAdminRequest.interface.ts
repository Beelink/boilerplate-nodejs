import { Request as IRequest } from "express";

interface IIsAdminRequest extends IRequest {
  userId: number;
}

export default IIsAdminRequest;
