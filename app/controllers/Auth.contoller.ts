import AuthConfig from "../config/Auth.config";
import { Request as IRequest, Response as IResponse } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../models/User.model";
import HttpHelper from "../helpers/Http.helper";
import EUserRole from "../enums/UserRole.enum";

function signUp(req: IRequest, res: IResponse): void {
  const user = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password ? bcrypt.hashSync(req.body.password, 8) : "",
    role: req.body.role || EUserRole.user,
  });

  user.save((err, user) => {
    if (err) {
      return HttpHelper.sendDataResponse(res, {
        error: true,
        message: err.toString(),
      });
    }
    return HttpHelper.sendDataResponse(res, {
      message: "User was registered successfully!",
    });
  });
}

function getCurrentUser(req: IRequest, res: IResponse): void {
  HttpHelper.sendDataResponse(res, {
    message: "* NEED TO BE IMPLEMENTED *",
  });
}

function signIn(req: IRequest, res: IResponse): void {
  UserModel.findOne({
    email: req.body.email,
  }).exec((err, user) => {
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

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return HttpHelper.sendDataResponse(res, {
        error: true,
        message: "Invalid password!",
      });
    }

    const token = jwt.sign({ id: user.id }, AuthConfig.secret, {
      expiresIn: 86400, // 24 hours
    });

    return HttpHelper.sendDataResponse(res, {
      message: "User was signed in successfully!",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        accessToken: token,
      },
    });
  });
}

const AuthController = {
  signUp,
  signIn,
  getCurrentUser,
};

export default AuthController;
