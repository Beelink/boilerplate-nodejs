import { Request as IRequest, Response as IResponse } from "express";
import IGetCurrentUserRequest from "../interfaces/GetCurrentUserRequest.interface";
import IGetCurrentUserPayload from "../interfaces/GetCurrentUserPayload.interface";
import UserModel from "../models/User.model";
import AuthConfig from "../config/Auth.config";
import HttpHelper from "../helpers/Http.helper";
import jwt from "jsonwebtoken";

function getCurrentUser(req: IRequest, res: IResponse): void {
  getCurrentUserExtended(req as IGetCurrentUserRequest, res);
}

function getCurrentUserExtended(
  req: IGetCurrentUserRequest,
  res: IResponse
): void {
  const token: string =
    req.headers[AuthConfig.accessTokenName]?.toString() || "";
  if (token) {
    const payload = jwt.decode(token) as IGetCurrentUserPayload;
    UserModel.findById(payload.id).exec((err, user) => {
      if (err) {
        HttpHelper.sendDataResponse(res, {
          error: true,
          message: err.toString(),
        });
        return;
      }

      if (!user) {
        HttpHelper.sendDataResponse(res, {
          error: true,
          message: "User not found!",
        });
        return;
      }

      HttpHelper.sendDataResponse(res, {
        message: "Current user was successfully retrieved!",
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    });
  } else {
    HttpHelper.sendDataResponse(res, {
      error: true,
      message: "No auth token provided!",
    });
  }
}

const UserController = {
  getCurrentUser,
};

export default UserController;
