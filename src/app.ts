import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import { Worker } from "worker_threads";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import router from "./routes";
import { database } from "./services/DB/databaseService";

const initializeApp = (port: number) => {
  database
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });

  new Worker(path.resolve(__dirname, "./workers/weatherWorker.js"));

  const app: Express = express();

  app.set("port", port);

  app.use((req, res, next) => {
    console.log("incoming_request", {
      method: req.method,
      url: req.originalUrl,
      details: {
        body: req.body,
        params: req.params,
        query: req.query,
      },
    });
    next();
  });

  app.use(router);

  return app;
};

export default initializeApp;
