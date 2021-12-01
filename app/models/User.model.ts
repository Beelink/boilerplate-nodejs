import { Schema, model } from "mongoose";
import IUser from "../interfaces/user.interface";

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
});

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
