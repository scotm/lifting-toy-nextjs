import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { RepetitionUnits } from "./RepetitionUnits";
import { TemplateExercisePieces } from "./TemplateExercisePieces";

@Entity({ tableName: "RepPair" })
export class RepPair {
  @PrimaryKey()
  id!: number;

  @Property()
  reps!: number;

  @ManyToOne({
    entity: () => RepetitionUnits,
    fieldName: "repetitionUnitsId",
    onUpdateIntegrity: "cascade",
  })
  repetitionUnits!: RepetitionUnits;

  @ManyToOne({
    entity: () => TemplateExercisePieces,
    fieldName: "templateExerciseId",
    onUpdateIntegrity: "cascade",
  })
  templateExercise!: TemplateExercisePieces;
}
