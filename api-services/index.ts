import { Category } from "../entities/Category";
import { Equipment } from "../entities/Equipment";
import { Exercise } from "../entities/Exercise";
import { Language } from "../entities/Language";
import { Licence } from "../entities/Licence";
import { Muscles } from "../entities/Muscles";
import { RepetitionUnits } from "../entities/RepetitionUnits";
import { WeightUnits } from "../entities/WeightUnits";
import { WorkoutTemplate } from "../entities/WorkoutTemplate";
import { MyWorkoutTemplate } from "../types/ExerciseTypes";
// import { MyExercise } from "../types/ExerciseTypes";

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
): Promise<Exercise[]> {
  return fetchType<Exercise[]>(
    `/api/exercises?category=${category}${
      search === "" ? "" : `&search=${search}`
    }`
  );
}

export async function fetchExerciseByID(
  id: string | string[] | undefined | number
): Promise<Exercise> {
  return fetchType<Exercise>(`/api/exercises/${id}`);
}

export async function fetchAllExercises(): Promise<Exercise[]> {
  return fetchType<Exercise[]>("/api/exercises");
}

export async function fetchRepetitionUnits(): Promise<RepetitionUnits[]> {
  return fetchType<RepetitionUnits[]>("/api/repetitionunits");
}

export async function fetchWeightUnits(): Promise<WeightUnits[]> {
  return fetchType<WeightUnits[]>("/api/weightunits");
}

export async function fetchMuscles(): Promise<Muscles[]> {
  return fetchType<Muscles[]>("/api/muscles");
}

export async function fetchEquipment(): Promise<Equipment[]> {
  return fetchType<Equipment[]>("/api/equipment");
}

export async function fetchLanguages(): Promise<Language[]> {
  return fetchType<Language[]>("/api/languages");
}

export async function fetchLicences(): Promise<Licence[]> {
  return fetchType<Licence[]>("/api/licences");
}

export async function fetchWorkoutTemplates(): Promise<MyWorkoutTemplate[]> {
  return fetchType<MyWorkoutTemplate[]>("/api/workouttemplate");
}
