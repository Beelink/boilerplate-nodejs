import path from "path";
import apiConfig from "../config/Api.config";
import uniqid from "uniqid";

const UploadUtils = {
  getFilePath(fileName: string) {
    return path.join(__dirname, "../../public/uploads/") + fileName;
  },
  getFileUrl(fileName: string) {
    return `${apiConfig.apiPrefix}/api/${apiConfig.apiVersion}/upload/${fileName}`;
  },
  generateFileName(fileName: string) {
    return `${uniqid()}-${fileName}`;
  },
};

export default UploadUtils;
