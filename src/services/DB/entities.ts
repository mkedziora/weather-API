import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";

import { Point } from "../../models/point";

@Entity("users")
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "char", length: 30, nullable: false })
  username: string;

  @Column({ type: "char", length: 30, nullable: false })
  password: string;

  @ManyToMany(() => City)
  @JoinTable()
  favoriteCities: City[];
}

@Entity("cities")
class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "char", length: 30, nullable: false })
  name: string;

  @Column({
    type: "point",
    nullable: false,
    transformer: {
      from: (p: string): Point => {
        if (!p) return;
        const coordinates = p.match(/[+-]?\d+(\.\d+)?/g);
        return {
          longitude: Number(coordinates[0]),
          latitude: Number(coordinates[1]),
        };
      },
      to: (p: Point): string => `${p.longitude}, ${p.latitude}`,
    },
  })
  coordinate: Point;
}

@Entity()
class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", {
    transformer: {
      from: (r: string): object[] => {
        return JSON.parse(r);
      },
      to: (r: object[]): string => JSON.stringify(r),
    },
  })
  apiResponse: object[];

  @ManyToOne(() => City)
  city: City;
}

export { User, City, Weather };
