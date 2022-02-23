import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "DayOfWeek" })
export class DayOfWeek {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: "text" })
  dayOfWeek!: string;
}
