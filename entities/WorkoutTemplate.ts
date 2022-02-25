import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { TemplateExercisePieces } from "./TemplateExercisePieces";
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
  user!: User;

  @OneToMany(() => TemplateExercisePieces, (pieces) => pieces.workoutTemplate)
  pieces = new Collection<TemplateExercisePieces>(this);
}
