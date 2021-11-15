import express, { Application as IApplication } from "express";
import cors from "cors";
import db from "./models";

const app: IApplication = express();

// cors
const corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// connect to db
db.connect();

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT}.`);
});
