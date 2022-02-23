import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Muscles } from "./Muscles";
import { Category } from "./Category";
import { Language } from "./Language";
import { Licence } from "./Licence";
import { Equipment } from "./Equipment";

@Entity({ tableName: "Exercise" })
export class Exercise {
  @PrimaryKey()
  id!: number;

  @ManyToOne({
    entity: () => Licence,
    fieldName: "licenceId",
    onUpdateIntegrity: "cascade",
  })
  licence!: Licence;

  @Property({ columnType: "text" })
  licenseAuthor!: string;

  @Property({ columnType: "text" })
  name!: string;

  @Property({ columnType: "text", nullable: true })
  nameOriginal?: string;

  @Property({ columnType: "text", nullable: true })
  status?: string;

  @Property({ columnType: "text" })
  description!: string;

  @Property({ length: 3, defaultRaw: `CURRENT_TIMESTAMP` })
  creationDate!: Date;

  @ManyToOne({
    entity: () => Language,
    fieldName: "languageId",
    onUpdateIntegrity: "cascade",
  })
  language!: Language;

  @Property({ columnType: "uuid" })
  uuid!: string;

  @ManyToOne({
    entity: () => Category,
    fieldName: "categoryId",
    onUpdateIntegrity: "cascade",
  })
  category!: Category;

  @Property({ columnType: "text", nullable: true })
  variations?: string;

  // https://github.com/mikro-orm/mikro-orm/issues/407

  @ManyToMany({
    entity: () => Muscles,
    pivotTable: "_ExerciseToMuscles",
    joinColumn: "A",
    inverseJoinColumn: "B",
  })
  muscles: Collection<Muscles> = new Collection<Muscles>(this);

  @ManyToMany({
    entity: () => Equipment,
    pivotTable: "_EquipmentToExercise",
    joinColumn: "B",
    inverseJoinColumn: "A",
  })
  equipment: Collection<Equipment> = new Collection<Equipment>(this);
}
