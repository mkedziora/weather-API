import { DataSource } from "typeorm";

import config from "../../config/config";

export const database: DataSource = new DataSource({
  type: "mysql",
  host: config.MYSQL.host,
  port: config.MYSQL.port,
  username: config.MYSQL.user,
  password: config.MYSQL.password,
  database: config.MYSQL.database,
  entities: ["dist/services/DB/entities.ts"],
  logging: true,
  synchronize: true,
});
