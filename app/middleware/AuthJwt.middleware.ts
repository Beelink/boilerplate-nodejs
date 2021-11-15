import jwt from "jsonwebtoken";
import {
  Request as IRequest,
  Response as IResponse,
  NextFunction as INextFunction,
} from "express";
import AuthConfig from "../config/auth.config.js";
import UserModel from "../models/User.model";
import IUser from "../interfaces/User.interface";

const verifyToken = (req: IRequest, res: IResponse, next: INextFunction) => {
  const token: string = req.headers["x-access-token"]
    ? req.headers["x-access-token"].toString()
    : "";

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, AuthConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req: IRequest, res: IResponse, next: INextFunction) => {
  UserModel.findById(req.userId).exec((err, user: IUser) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if ()

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

const AuthJwtMiddleware = {
  verifyToken,
  isAdmin,
};

export default AuthJwtMiddleware;
