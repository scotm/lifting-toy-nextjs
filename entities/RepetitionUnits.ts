import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "RepetitionUnits" })
export class RepetitionUnits {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: "text" })
  name!: string;
}
