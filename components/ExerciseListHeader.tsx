import * as React from "react";
import ExerciseCategorySelect from "./ExerciseCategorySelect";

export interface IExerciseListHeaderProps {
  category: string;
  search: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const TIMER_DEFAULT_MS = 300;

export default function ExerciseListHeader(props: IExerciseListHeaderProps) {
  const { category, search, setCategory, setSearch } = props;
  // Weird little hack
  const [timer, setTimer] = React.useState(setTimeout(() => {}, 0));
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
          onChange={(e) => {
            clearTimeout(timer);
            const newTimer = setTimeout(() => {
              setSearch(e.target.value);
            }, TIMER_DEFAULT_MS);
            setTimer(newTimer);
          }}
          defaultValue={search}
        />
      </div>
    </div>
  );
}
