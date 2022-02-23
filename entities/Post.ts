import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./User";

@Entity({ tableName: "Post" })
export class Post {
  @PrimaryKey()
  id!: number;

  @Property({
    fieldName: "createdAt",
    length: 3,
    defaultRaw: `CURRENT_TIMESTAMP`,
  })
  createdAt!: Date;

  @Property({ fieldName: "updatedAt", length: 3 })
  updatedAt!: Date;

  @Property({ length: 255 })
  title!: string;

  @Property({ columnType: "text", nullable: true })
  content?: string;

  @Property({ default: false })
  published: boolean = false;

  @ManyToOne({
    entity: () => User,
    fieldName: "authorId",
    onUpdateIntegrity: "cascade",
  })
  authorId!: User;
}
