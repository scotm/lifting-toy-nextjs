import * as React from "react";
import ExerciseCategorySelect from "./ExerciseCategorySelect";

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
        <ExerciseCategorySelect category={category} setCategory={setCategory} />
      </div>
      <div className="text-center">
        <input
          className="m-2 w-full border-2 border-solid border-slate-800"
          type="text"
          placeholder="Filter exercises"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
