import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./User";

@Entity({ tableName: "Profile" })
export class Profile {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: "text", nullable: true })
  bio?: string;

  @OneToOne({
    entity: () => User,
    fieldName: "userId",
    onUpdateIntegrity: "cascade",
    unique: "Profile_userId_key",
  })
  userId!: User;
}
