import express, { Express } from "express";

const initializeApp = (port: number) => {
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
  return app;
};

export default initializeApp;
