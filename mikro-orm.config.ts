import { Options } from "@mikro-orm/core";

import { Category } from "./entities/Category";
import { DayOfWeek } from "./entities/DayOfWeek";
import { Equipment } from "./entities/Equipment";
import { Exercise } from "./entities/Exercise";
import { Language } from "./entities/Language";
import { Licence } from "./entities/Licence";
import { Muscles } from "./entities/Muscles";
import { Profile } from "./entities/Profile";
import { RepetitionUnits } from "./entities/RepetitionUnits";
import { RepPair } from "./entities/RepPair";
import { TemplateExercisePieces } from "./entities/TemplateExercisePieces";
import { User } from "./entities/User";
import { WeightUnits } from "./entities/WeightUnits";
import { WorkoutTemplate } from "./entities/WorkoutTemplate";
import { areWeTestingWithJest } from "./util/testing";

export const mainConfig: Options = {
  entities: [
    Category,
    DayOfWeek,
    Equipment,
    Exercise,
    Language,
    Licence,
    Muscles,
    Profile,
    RepetitionUnits,
    RepPair,
    TemplateExercisePieces,
    User,
    WeightUnits,
    WorkoutTemplate,
  ],
  dbName: "mydb",
  user: "scotm",
  type: "postgresql", // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
  debug: true,
};

// Use an in-memory sqlite db if we're testing
export const testConfig: Options = {
  entities: mainConfig.entities,
  dbName: ":memory:",
  type: "sqlite",
  debug: process.env.NODE_ENV === "development",
};

export default areWeTestingWithJest() ? testConfig : mainConfig;
