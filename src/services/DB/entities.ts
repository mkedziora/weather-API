import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { Point } from "../../models/point";

@Entity("users")
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}

@Entity("cities")
class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: "point",
    transformer: {
      from: (p: string): Point => {
        const coordinates = p.split(", ");
        return {
          longitude: Number(coordinates[0]),
          latitude: Number(coordinates[1]),
        };
      },
      to: (p: Point): string => `${p.longitude}, ${p.latitude}`,
    },
  })
  coordinates: Point;
}

export { User, City };
