import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "Language" })
export class Language {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: "text" })
  fullName!: string;

  @Property({ columnType: "text" })
  shortName!: string;
}
