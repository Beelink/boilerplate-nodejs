import { Request as IRequest, Response as IResponse } from "express";
import IUserJwtPayload from "../interfaces/UserJwtPayload.interface";
import UserModel from "../models/User.model";
import AuthConfig from "../config/Auth.config";
import HttpHelper from "../helpers/Http.helper";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

function getCurrentUser(req: IRequest, res: IResponse): void {
  const token: string =
    req.headers[AuthConfig.accessTokenName]?.toString() || "";
  if (token) {
    const payload = jwt.decode(token) as IUserJwtPayload;
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
          image: user.image,
          accessToken: token,
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

function changeUserPassword(req: IRequest, res: IResponse): void {
  const token: string =
    req.headers[AuthConfig.accessTokenName]?.toString() || "";
  if (token) {
    const payload = jwt.decode(token) as IUserJwtPayload;
    console.log(payload)
    UserModel.findById(payload.id).exec((err, user) => {
      if (err) {
        HttpHelper.sendDataResponse(res, {
          error: true,
          message: err.toString(),
        });
        return;
      }

      console.log(user)
      console.log(req.body.oldPassword)

      if (user) {
        if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
          user.password = bcrypt.hashSync(req.body.newPassword, 8);
          user.save((err) => {
            if (err) {
              HttpHelper.sendDataResponse(res, {
                error: true,
                message: err.toString(),
              });
            } else {
              HttpHelper.sendDataResponse(res, {
                message: "Password was changed successfully!",
              });
            }
          });
        } else {
          HttpHelper.sendDataResponse(res, {
            error: true,
            message: "Your current password is missing or incorrect. It's required to change the Password!",
          });
        }
      } else {
        HttpHelper.sendDataResponse(res, {
          error: true,
          message: "User not found!",
        });
      }
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
  changeUserPassword,
};

export default UserController;
