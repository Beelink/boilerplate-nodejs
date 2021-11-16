import { JwtPayload as IJwtPayload } from "jsonwebtoken";

interface IGetCurrentUserPayload extends IJwtPayload {
  id: number;
}

export default IGetCurrentUserPayload;
