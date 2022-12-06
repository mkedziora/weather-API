import { DataSource } from "typeorm";

import config from "../../config/config";
import { User } from "../../models/user";
import { User as UserEntity } from "../../services/DB/entities";

const database: DataSource = new DataSource({
  type: "mysql",
  host: config.MYSQL.host,
  port: config.MYSQL.port,
  username: config.MYSQL.user,
  password: config.MYSQL.password,
  database: config.MYSQL.database,
  entities: ["build/services/DB/entities.js"],
  logging: true,
  synchronize: false,
});

const getUserByUsername = async (username: string): Promise<User> => {
  return database.getRepository(UserEntity).findOneBy({
    username,
  });
};

export { database, getUserByUsername };
