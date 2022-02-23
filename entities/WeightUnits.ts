import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "WeightUnits" })
export class WeightUnits {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: "text" })
  name!: string;
}
