import {
  Request as IRequest,
  Response as IResponse,
  NextFunction as INextFunction,
} from "express";
// import UserRoles from "../enums/UserRole.enum";
import UserModel from "../models/User.model";
import IUser from "../interfaces/User.interface";
// import TDataMessage from "../types/DataResponse.type";

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
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    UserModel.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
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
