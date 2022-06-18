import sequelize from "../database";
import corsSetup from "./cors";
import routes from "./routes";
import models from "../models";
import { ApiError } from "../middlewares";
import sessionSetup from "./session";
const session = require("express-session");

const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

export class Server {
  private app: any;
  public models: any;

  constructor() {
    this.app = express();

    this.config();
    this.models = models;
    routes.map((key) => this.app.use(key));

    this.connectDb()
      .then(() => console.log("Connected to DB is successfully"))
      .catch((e) => console.log("Database connected is error:", e));
  }

  private connectDb = async (): Promise<void> => {
    await sequelize.authenticate();
    await sequelize.sync();
  };

  private config(): void {
    morgan("dev");
    this.app.use(morgan("tiny"));

    this.app.use(cors(corsSetup));
    this.app.use(express.json());
    this.app.use(session(sessionSetup));
    this.app.use(ApiError);
  }

  public start = (port: number | string) => {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: Object) => reject(err));
    });
  };
}
