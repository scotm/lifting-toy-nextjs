import * as React from "react";

// TOOD: replace this with an API call to /api/categories.
const exercise_categories = [
  { id: 1, name: "All" },
  { id: 8, name: "Arms" },
  { id: 9, name: "Legs" },
  { id: 10, name: "Abs" },
  { id: 11, name: "Chest" },
  { id: 12, name: "Back" },
  { id: 13, name: "Shoulders" },
  { id: 14, name: "Calves" },
];

// TODO: replace this with an API call to /api/muscles.
const muscles_to_check = [
  { id: 1, name: "Biceps brachii" },
  { id: 2, name: "Anterior deltoid" },
  { id: 3, name: "Serratus anterior" },
  { id: 4, name: "Pectoralis major" },
  { id: 5, name: "Triceps brachii" },
  { id: 6, name: "Rectus abdominis" },
  { id: 7, name: "Gastrocnemius" },
  { id: 8, name: "Gluteus maximus" },
  { id: 9, name: "Trapezius" },
  { id: 10, name: "Quadriceps femoris" },
  { id: 11, name: "Biceps femoris" },
  { id: 12, name: "Latissimus dorsi" },
  { id: 13, name: "Brachialis" },
  { id: 14, name: "Obliquus externus abdominis" },
  { id: 15, name: "Soleus" },
  { id: 16, name: "Erector spinae" },
];

export interface IExerciseListHeaderProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function ExerciseListHeader(props: IExerciseListHeaderProps) {
  const { category, setCategory, setSearch } = props;
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center">
        <select
          className="m-2 w-full"
          name="exercise_choice"
          onChange={(e) => setCategory(e.target.value)}
          defaultValue={category}
        >
          {exercise_categories.map((e) => {
            return <option key={e.id}>{e.name}</option>;
          })}
        </select>
      </div>
      <div className="text-center">
        <input
          className="w-full border-2 border-solid"
          type="text"
          placeholder="Filter exercises"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
