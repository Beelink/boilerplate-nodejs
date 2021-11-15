import jwt, { JwtPayload as IJwtPayload } from "jsonwebtoken";
import {
  Request as IRequest,
  Response as IResponse,
  NextFunction as INextFunction,
} from "express";
import AuthConfig from "../config/auth.config.js";
import UserModel from "../models/User.model";
import HttpHelper from "../helpers/Http.helper";
import EUserRole from "../enums/UserRole.enum";

interface IVerifyTokenRequest extends IRequest {
  user: IJwtPayload | undefined;
}

const verifyToken = (
  req: IVerifyTokenRequest,
  res: IResponse,
  next: INextFunction
) => {
  const token: string = req.headers["x-access-token"]
    ? req.headers["x-access-token"].toString()
    : "";

  if (!token) {
    return HttpHelper.sendDataResponse(res, {
      error: true,
      message: "No auth token provided!",
    });
  }

  jwt.verify(token, AuthConfig.secret, (err, user) => {
    if (err) {
      return HttpHelper.sendDataResponse(res, {
        error: true,
        message: "Unauthorized!",
      });
    }
    req.user = user;
    next();
  });
};

interface IIsAdminRequest extends IRequest {
  userId: number;
}

const isAdmin = (req: IIsAdminRequest, res: IResponse, next: INextFunction) => {
  UserModel.findById(req.userId).exec((err, user) => {
    if (err) {
      return HttpHelper.sendDataResponse(res, {
        error: true,
        message: err.toString(),
      });
    }

    if (!user) {
      return HttpHelper.sendDataResponse(res, {
        error: true,
        message: "User not found!",
      });
    }

    if (user.role === EUserRole.admin) {
      next();
    } else {
      return HttpHelper.sendDataResponse(res, {
        error: true,
        message: "Require Admin Role!",
      });
    }
  });
};

const AuthJwtMiddleware = {
  verifyToken,
  isAdmin,
};

export default AuthJwtMiddleware;
