import { DataSource } from "typeorm";

import config from "../../config/config";
import { User } from "../../models/user";
import { User as UserEntity } from "../../services/DB/entities";
import { City as CityEntity } from "../../services/DB/entities";
import { City } from "../../models/city";

const database: DataSource = new DataSource({
  type: "mysql",
  host: config.MYSQL.host,
  port: config.MYSQL.port,
  username: config.MYSQL.user,
  password: config.MYSQL.password,
  database: config.MYSQL.database,
  entities: ["build/services/DB/entities.js"],
  logging: true,
  synchronize: true,
  legacySpatialSupport: false,
});

const getUserByUsername = async (username: string): Promise<User> => {
  return database.getRepository(UserEntity).findOne({
    where: { username },
    relations: {
      favoriteCities: true,
    },
  });
};

const getCityById = async (id: number): Promise<City> => {
  return database.getRepository(CityEntity).findOneBy({
    id,
  });
};

const postUserFavoriteCity = async (
  username: string,
  cityId: number
): Promise<User> => {
  const city = await database.getRepository(CityEntity).findOneBy({
    id: cityId,
  });
  const user = await getUserByUsername(username);
  if (!user.favoriteCities?.length) {
    user.favoriteCities = [city];
  } else {
    if (!user.favoriteCities.find((city) => city.id === Number(cityId)))
      user.favoriteCities.push(city);
  }
  return database.manager.save(user);
};

export { database, getUserByUsername, getCityById, postUserFavoriteCity };
