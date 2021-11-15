import {
  Request as IRequest,
  Response as IResponse,
  NextFunction as INextFunction,
} from "express";
import UserModel from "../models/User.model";
import HttpHelper from "../helpers/Http.helper";

const checkDuplicateUsernameOrEmail = (
  req: IRequest,
  res: IResponse,
  next: INextFunction
) => {
  // Username
  UserModel.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      HttpHelper.sendDataResponse(res, {
        error: true,
        message: err.toString(),
      });
      return;
    }

    if (user) {
      HttpHelper.sendDataResponse(res, {
        error: true,
        message: "Failed! Username is already in use!",
      });
      return;
    }

    // Email
    UserModel.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        HttpHelper.sendDataResponse(res, {
          error: true,
          message: err.toString(),
        });
        return;
      }

      if (user) {
        HttpHelper.sendDataResponse(res, {
          error: true,
          message: "Failed! Email is already in use!",
        });
        return;
      }

      next();
    });
  });
};

const SignUpMiddleware = {
  checkDuplicateUsernameOrEmail,
};

export default SignUpMiddleware;
