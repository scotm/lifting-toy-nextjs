import axios from "axios";
import { useEffect, useState } from "react";
import { Category, Muscles } from "@prisma/client";
import { useGetCategoriesQuery } from "../services/exercise";

const muscles_to_check: Array<Muscles> = [
  { id: 1, is_front: true, name: "Biceps brachii" },
  { id: 2, is_front: true, name: "Anterior deltoid" },
  { id: 3, is_front: true, name: "Serratus anterior" },
  { id: 4, is_front: true, name: "Pectoralis major" },
  { id: 5, is_front: false, name: "Triceps brachii" },
  { id: 6, is_front: true, name: "Rectus abdominis" },
  { id: 7, is_front: false, name: "Gastrocnemius" },
  { id: 8, is_front: false, name: "Gluteus maximus" },
  { id: 9, is_front: false, name: "Trapezius" },
  { id: 10, is_front: true, name: "Quadriceps femoris" },
  { id: 11, is_front: false, name: "Biceps femoris" },
  { id: 12, is_front: false, name: "Latissimus dorsi" },
  { id: 13, is_front: true, name: "Brachialis" },
  { id: 14, is_front: true, name: "Obliquus externus abdominis" },
  { id: 15, is_front: false, name: "Soleus" },
  { id: 16, is_front: false, name: "Erector spinae" },
];

export interface IExerciseCategorySelectProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function ExerciseCategorySelect(
  props: IExerciseCategorySelectProps
) {
  const { category, setCategory } = props;
  const initialCategory: Category = { id: 1, name: "All" };

  // API call effect
  const {
    data: exercise_categories,
    error,
    isLoading,
  } = useGetCategoriesQuery();

  if (exercise_categories !== undefined) {
    return (
      <>
        <select
          className="m-2 w-full border-2 border-slate-800 p-0.5"
          name="exercise_choice"
          onChange={(event) => setCategory(event.target.value)}
          defaultValue={initialCategory.id}
        >
          {exercise_categories.map((category) => (
            <option key={category.id}>{category.name}</option>
          ))}
        </select>
      </>
    );
  } else {
    return null;
  }
}
