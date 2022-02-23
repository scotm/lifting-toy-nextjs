import { Entity, ManyToOne, PrimaryKey } from "@mikro-orm/core";
import { Exercise } from "./Exercise";
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
  exerciseId!: Exercise;

  @ManyToOne({
    entity: () => WorkoutTemplate,
    fieldName: "workoutTemplateId",
    onUpdateIntegrity: "cascade",
    onDelete: "set null",
    nullable: true,
  })
  workoutTemplateId?: WorkoutTemplate;
}
