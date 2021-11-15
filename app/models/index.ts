import mongoose from "mongoose";
import DbConfig from "../config/Db.config";
import { Response as IResponse } from "express";
import TDataResponse from "../types/DataResponse.type";

function connectToDb() {
  mongoose
    .connect(`mongodb://${DbConfig.host}:${DbConfig.port}/${DbConfig.dbName}`)
    .then(() => {
      console.log("Successfully connect to MongoDB.");
    })
    .catch((err) => {
      console.error("Connection error", err);
      process.exit();
    });
}


const db = { connect: connectToDb };

export default db;
