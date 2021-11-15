import EUserRole from "../enums/userRole.enum";
import { Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: EUserRole;
}

export default IUser;
