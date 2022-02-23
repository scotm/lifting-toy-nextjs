import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "Category" })
export class Category {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: "text" })
  name!: string;
}
