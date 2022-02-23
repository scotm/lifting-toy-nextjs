import { Migration } from '@mikro-orm/migrations';

export class Migration20220223000952 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "WeightUnits" ("id" serial primary key, "name" text not null);');

    this.addSql('create table "User" ("id" serial primary key, "email" text not null, "firstname" text not null, "lastname" text not null, "age" int null, "auth_string" text null, "joining_date" timestamptz(3) not null, "passwordhash" text null, "salt" text null, "external_id" text null);');
    this.addSql('alter table "User" add constraint "User_email_key" unique ("email");');
    this.addSql('alter table "User" add constraint "User_external_id_key" unique ("external_id");');

    this.addSql('create table "WorkoutTemplate" ("id" serial primary key, "name" text not null, "userId" int not null);');

    this.addSql('create table "RepetitionUnits" ("id" serial primary key, "name" text not null);');

    this.addSql('create table "Profile" ("id" serial primary key, "bio" text null, "userId" int not null);');
    this.addSql('alter table "Profile" add constraint "Profile_userId_key" unique ("userId");');

    this.addSql('create table "Muscles" ("id" serial primary key, "is_front" boolean not null default true, "name" text not null);');

    this.addSql('create table "Licence" ("id" serial primary key, "full_name" text not null, "short_name" text not null, "url" text not null);');

    this.addSql('create table "Language" ("id" serial primary key, "full_name" text not null, "short_name" text not null);');

    this.addSql('create table "Equipment" ("id" serial primary key, "name" text not null);');

    this.addSql('create table "DayOfWeek" ("id" serial primary key, "day_of_week" text not null);');

    this.addSql('create table "Category" ("id" serial primary key, "name" text not null);');

    this.addSql('create table "Exercise" ("id" serial primary key, "licenceId" int not null, "license_author" text not null, "name" text not null, "name_original" text null, "status" text null, "description" text not null, "creation_date" timestamptz(3) not null default CURRENT_TIMESTAMP, "languageId" int not null, "uuid" uuid not null, "categoryId" int not null, "variations" text null);');

    this.addSql('create table "TemplateExercisePieces" ("id" serial primary key, "exerciseId" int not null, "workoutTemplateId" int null);');

    this.addSql('create table "RepPair" ("id" serial primary key, "reps" int not null, "repetitionUnitsId" int not null, "templateExerciseId" int not null);');

    this.addSql('create table "_ExerciseToMuscles" ("A" int not null, "B" int not null);');
    this.addSql('alter table "_ExerciseToMuscles" add constraint "_ExerciseToMuscles_pkey" primary key ("A", "B");');

    this.addSql('create table "_EquipmentToExercise" ("B" int not null, "A" int not null);');
    this.addSql('alter table "_EquipmentToExercise" add constraint "_EquipmentToExercise_pkey" primary key ("B", "A");');

    this.addSql('alter table "WorkoutTemplate" add constraint "WorkoutTemplate_userId_foreign" foreign key ("userId") references "User" ("id") on update cascade;');

    this.addSql('alter table "Profile" add constraint "Profile_userId_foreign" foreign key ("userId") references "User" ("id") on update cascade;');

    this.addSql('alter table "Exercise" add constraint "Exercise_licenceId_foreign" foreign key ("licenceId") references "Licence" ("id") on update cascade;');
    this.addSql('alter table "Exercise" add constraint "Exercise_languageId_foreign" foreign key ("languageId") references "Language" ("id") on update cascade;');
    this.addSql('alter table "Exercise" add constraint "Exercise_categoryId_foreign" foreign key ("categoryId") references "Category" ("id") on update cascade;');

    this.addSql('alter table "TemplateExercisePieces" add constraint "TemplateExercisePieces_exerciseId_foreign" foreign key ("exerciseId") references "Exercise" ("id") on update cascade;');
    this.addSql('alter table "TemplateExercisePieces" add constraint "TemplateExercisePieces_workoutTemplateId_foreign" foreign key ("workoutTemplateId") references "WorkoutTemplate" ("id") on update cascade on delete set null;');

    this.addSql('alter table "RepPair" add constraint "RepPair_repetitionUnitsId_foreign" foreign key ("repetitionUnitsId") references "RepetitionUnits" ("id") on update cascade;');
    this.addSql('alter table "RepPair" add constraint "RepPair_templateExerciseId_foreign" foreign key ("templateExerciseId") references "TemplateExercisePieces" ("id") on update cascade;');

    this.addSql('alter table "_ExerciseToMuscles" add constraint "_ExerciseToMuscles_A_foreign" foreign key ("A") references "Exercise" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "_ExerciseToMuscles" add constraint "_ExerciseToMuscles_B_foreign" foreign key ("B") references "Muscles" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "_EquipmentToExercise" add constraint "_EquipmentToExercise_B_foreign" foreign key ("B") references "Exercise" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "_EquipmentToExercise" add constraint "_EquipmentToExercise_A_foreign" foreign key ("A") references "Equipment" ("id") on update cascade on delete cascade;');
  }

}
