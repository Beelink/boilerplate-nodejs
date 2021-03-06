import AuthConfig from "../config/Auth.config";
import { Request as IRequest, Response as IResponse } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserModel from "../models/User.model";
import HttpHelper from "../helpers/Http.helper";
import EUserRole from "../enums/UserRole.enum";
import UploadUtils from "../utils/Upload.utils";
import PasswordUtils from "../utils/Password.utils";

function signUp(req: IRequest, res: IResponse): void {
  if (PasswordUtils.check(req.body.password)) {
    const user = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password ? bcrypt.hashSync(req.body.password, 8) : "",
      role: req.body.role || EUserRole.user,
      image: UploadUtils.getFileUrl("blank-user-image.png"),
    });

    user.save((err) => {
      if (err) {
        HttpHelper.sendDataResponse(res, {
          error: true,
          message: err.toString(),
        });
        return;
      }
      signIn(req, res);
    });
  } else {
    HttpHelper.sendDataResponse(res, {
      error: true,
      message: "Your new password does not meet complexity requirements!",
    });
  }
}

function signIn(req: IRequest, res: IResponse): void {
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

    if (!user) {
      HttpHelper.sendDataResponse(res, {
        error: true,
        message: "User not found!",
      });
      return;
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      HttpHelper.sendDataResponse(res, {
        error: true,
        message: "Invalid password!",
      });
      return;
    }

    const token = jwt.sign({ id: user.id }, AuthConfig.secret, {
      expiresIn: AuthConfig.expiresIn,
    });

    HttpHelper.sendDataResponse(res, {
      message: "User was signed in successfully!",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        image: user.image,
        accessToken: token,
      },
    });
  });
}

const AuthController = {
  signUp,
  signIn,
};

export default AuthController;
