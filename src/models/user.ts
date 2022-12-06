import { City } from "./city";

export type User = {
  id?: number;
  username: string;
  password: string;
  favoriteCities?: City[];
};
