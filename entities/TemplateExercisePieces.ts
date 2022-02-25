import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey } from "@mikro-orm/core";
import { Exercise } from "./Exercise";
import { RepPair } from "./RepPair";
import { WorkoutTemplate } from "./WorkoutTemplate";

@Entity({ tableName: "TemplateExercisePieces" })
export class TemplateExercisePieces {
  @PrimaryKey()
  id!: number;

  @ManyToOne({
    entity: () => Exercise,
    fieldName: "exerciseId",
    onUpdateIntegrity: "cascade",
  })  
  exercise!: Exercise;

  @ManyToOne({
    entity: () => WorkoutTemplate,
    fieldName: "workoutTemplateId",
    onUpdateIntegrity: "cascade",
    onDelete: "set null",
    nullable: true,
  })
  workoutTemplate?: WorkoutTemplate;

  @OneToMany(() => RepPair,(rep_pair) => rep_pair.templateExercise)
  rep_pair = new Collection<RepPair>(this);
}
