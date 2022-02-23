import { Entity, PrimaryKey, Property, Unique } from "@mikro-orm/core";

@Entity({ tableName: "User" })
export class User {
  @PrimaryKey()
  id!: number;

  @Unique({ name: "User_email_key" })
  @Property({ columnType: "text" })
  email!: string;

  @Property({ columnType: "text" })
  firstname!: string;

  @Property({ columnType: "text" })
  lastname!: string;

  @Property({ nullable: true })
  age?: number;

  @Property({ columnType: "text", nullable: true })
  authString?: string;

  @Property({ length: 3 })
  joiningDate!: Date;

  @Property({ columnType: "text", nullable: true })
  passwordhash?: string;

  @Property({ columnType: "text", nullable: true })
  salt?: string;

  @Unique({ name: "User_external_id_key" })
  @Property({ columnType: "text", nullable: true })
  externalId?: string;
}
