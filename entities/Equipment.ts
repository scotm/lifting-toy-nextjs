import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "Equipment" })
export class Equipment {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: "text" })
  name!: string;
}
