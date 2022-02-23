import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./User";

@Entity({ tableName: "WorkoutTemplate" })
export class WorkoutTemplate {
  @PrimaryKey()
  id!: number;

  @Property({ columnType: "text" })
  name!: string;

  @ManyToOne({
    entity: () => User,
    fieldName: "userId",
    onUpdateIntegrity: "cascade",
  })
  userId!: User;
}
