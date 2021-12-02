import jwt from "jsonwebtoken";
import {
  Request as IRequest,
  Response as IResponse,
  NextFunction as INextFunction,
} from "express";
import AuthConfig from "../config/Auth.config";
import UserModel from "../models/User.model";
import HttpHelper from "../helpers/Http.helper";
import EUserRole from "../enums/UserRole.enum";
import IVerifyTokenRequest from "../interfaces/VerifyTokenRequest.interface";
import IIsAdminRequest from "../interfaces/IsAdminRequest.interface";

function verifyToken(req: IRequest, res: IResponse, next: INextFunction): void {
  verifyTokenExtended(req as IVerifyTokenRequest, res, next);
}

function verifyTokenExtended(
  req: IVerifyTokenRequest,
  res: IResponse,
  next: INextFunction
): void {
  const token: string =
    req.headers[AuthConfig.accessTokenName]?.toString() || "";

  if (!token) {
    HttpHelper.sendDataResponse(res, {
      error: true,
      message: "No auth token provided!",
    });
    return;
  }

  jwt.verify(token, AuthConfig.secret, (err, user): void => {
    if (err) {
      HttpHelper.sendDataResponse(res, {
        error: true,
        message: "Unauthorized!",
      });
      return;
    }
    req.user = user;
    next();
  });
}

function isAdmin(req: IRequest, res: IResponse, next: INextFunction): void {
  isAdminExtended(req as IIsAdminRequest, res, next);
}

function isAdminExtended(
  req: IIsAdminRequest,
  res: IResponse,
  next: INextFunction
): void {
  UserModel.findById(req.userId).exec((err, user) => {
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

    if (user.role === EUserRole.admin) {
      next();
    } else {
      HttpHelper.sendDataResponse(res, {
        error: true,
        message: "Require admin role!",
      });
    }
  });
}

const AuthJwtMiddleware = {
  verifyToken,
  isAdmin,
};

export default AuthJwtMiddleware;
