import express, { Application as IApplication } from "express";
import cors from "cors";
import db from "./models";
import Routes from "./routes";
import apiConfig from "./config/Api.config";

const app: IApplication = express();

// cors
const corsOptions = {
  origin: apiConfig.clientUrl,
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// connect to db
db.connect();

// routes
app.use(`/api/${apiConfig.apiVersion}`, Routes);

// set port, listen for requests
const PORT = process.env.PORT || apiConfig.port;
app.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT}.`);
});
