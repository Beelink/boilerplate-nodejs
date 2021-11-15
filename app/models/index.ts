import mongoose from "mongoose";
import DbConfig from "../config/Db.config";

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
