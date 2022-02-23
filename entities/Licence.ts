import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "Licence" })
export class Licence {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: "text" })
  fullName!: string;

  @Property({ columnType: "text" })
  shortName!: string;

  @Property({ columnType: "text" })
  url!: string;
}
