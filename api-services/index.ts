import {
  Category,
  Equipment,
  Language,
  Licence,
  Muscles,
  RepetitionUnits,
  WeightUnits,
} from "@prisma/client";
import {
  UserWorkoutTemplatesReturnType,
  WorkoutTemplateReturnType,
} from "../pages/api/api-types";
import { ExercisesReturnType } from "../pages/api/exercises";
import { ExerciseFromIDReturnType } from "../pages/api/exercises/[id]";

async function fetchType<T>(url: string) {
  const data = await fetch(url).then((res) => {
    if (res.status == 200) {
      return res.json();
    }
    throw new Error(`Can't fetch "${url}" - response: ${res.status}.`);
  });
  return <T>data;
}

export async function fetchCategories(): Promise<Category[]> {
  return fetchType<Category[]>("/api/categories");
}

export async function fetchExercises(
  category: string,
  search: string
): Promise<ExercisesReturnType> {
  return fetchType<ExercisesReturnType>(
    `/api/exercises?category=${category}${
      search === "" ? "" : `&search=${search}`
    }`
  );
}

export async function fetchExerciseByID(
  id: string | string[] | undefined | number
): Promise<ExerciseFromIDReturnType> {
  return fetchType<ExerciseFromIDReturnType>(`/api/exercises/${id}`);
}

export async function fetchAllExercises(): Promise<ExercisesReturnType> {
  return fetchType<ExercisesReturnType>("/api/exercises");
}

export async function fetchRepetitionUnits(): Promise<RepetitionUnits[]> {
  return fetchType<RepetitionUnits[]>("/api/repetitionunits");
}

export async function fetchWeightUnits() {
  return fetchType<WeightUnits[]>("/api/weightunits");
}

export async function fetchMuscles() {
  return fetchType<Muscles[]>("/api/muscles");
}

export async function fetchEquipment() {
  return fetchType<Equipment[]>("/api/equipment");
}

export async function fetchLanguages() {
  return fetchType<Language[]>("/api/languages");
}

export async function fetchLicences() {
  return fetchType<Licence[]>("/api/licences");
}

export async function fetchWorkoutTemplates() {
  return fetchType<UserWorkoutTemplatesReturnType>("/api/workouttemplate");
}

export async function fetchWorkoutTemplatebyID(
  id: string | string[] | undefined | number
): Promise<WorkoutTemplateReturnType> {
  return fetchType<WorkoutTemplateReturnType>(`/api/workouttemplate/${id}`);
}
