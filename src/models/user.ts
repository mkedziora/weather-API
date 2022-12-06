import { City } from "./city";

export type User = {
  username: string;
  password: string;
  favoriteCities?: City[];
};
