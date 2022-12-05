import "source-map-support/register";
import "reflect-metadata";

import initializeApp from "./app";
import { AppDependencies } from "./lib/di";

const serverFactory = (deps: AppDependencies) => {
  const { config } = deps;
  const port = config.HTTP.port;

  const app = initializeApp(port);

  return app.listen(port, () => {
    console.log(`Run at port ${port}`);
  });
};

export default serverFactory;
