import { Category } from "@prisma/client";
import { useGetCategoriesQuery } from "../services/exercise";

export interface ExerciseCategorySelectProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function ExerciseCategorySelect(
  props: ExerciseCategorySelectProps
) {
  // API call effect
  const { data } = useGetCategoriesQuery();
  const { setCategory } = props;

  if (data !== undefined) {
    const initialCategory: Category = data.find((e) => e.name == "All") ?? {
      id: 1,
      name: "All",
    };
    return (
      <select
        className="m-2 w-full border-2 border-slate-800 p-0.5"
        onChange={(event) => setCategory(event.target.value)}
        defaultValue={initialCategory.id}
      >
        {data.map((category) => (
          <option key={category.id}>{category.name}</option>
        ))}
      </select>
    );
  } else {
    return null;
  }
}
