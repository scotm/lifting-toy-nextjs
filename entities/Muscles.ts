import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "Muscles" })
export class Muscles {
  @PrimaryKey()
  id!: number;

  @Property({ default: true })
  isFront: boolean = true;

  @Property({ columnType: "text" })
  name!: string;
}
