import { JwtPayload as IJwtPayload } from "jsonwebtoken";

interface IUserJwtPayload extends IJwtPayload {
  id: number;
}

export default IUserJwtPayload;
