import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import {
  useGetCategoriesQuery,
  useGetExerciseByIdQuery,
  useGetLanguagesQuery,
  useGetLicencesQuery,
  useGetMusclesQuery,
} from "../../../services/exercise";
import { MyExercise } from "../../../types/ExerciseTypes";

const EditExercise = () => {
  const router = useRouter();

  const { data: e } = useGetExerciseByIdQuery(router.query.id);
  const { data: languages } = useGetLanguagesQuery();
  const { data: licences } = useGetLicencesQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: muscles } = useGetMusclesQuery();

  // If the queries haven't completed yet
  if (
    e === undefined ||
    languages === undefined ||
    licences === undefined ||
    categories === undefined ||
    muscles === undefined
  ) {
    return <>Loading...</>;
  } else {
    const exercise = e as MyExercise;
    console.log(exercise.exercise_base?.categoryId);
    return (
      <Layout title={`Editing ${exercise.name}`}>
        <form>
          <input type="hidden" name="id" value={router.query.id} />
          <div className="grid grid-cols-4 gap-4 py-4">
            <label className="text-lg font-bold" htmlFor="exercise_name">
              Exercise Name
            </label>
            <input
              className="col-span-3 rounded-xl shadow-xl"
              type="text"
              name="name"
              value={exercise.name}
              id="exercise_name"
            />
            <label className="text-lg font-bold" htmlFor="exercise_categoryId">
              Category
            </label>
            <select
              className="col-span-3 rounded-xl shadow-xl"
              id="exercise_categoryId"
              name="categoryId"
              defaultValue={exercise.exercise_base?.categoryId}
            >
              {categories.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>

            <label className="text-lg font-bold" htmlFor="exercise_description">
              Description
            </label>
            <textarea
              id="exercise_description"
              name="description"
              rows={10}
              className="col-span-3 rounded-xl shadow-xl"
              defaultValue={exercise.description}
            ></textarea>

            <label className="text-lg font-bold" htmlFor="exercise_licenceId">
              Licence
            </label>
            <select
              id="exercise_licenceId"
              name="licenceID"
              defaultValue={exercise.licenceId}
              className="col-span-3 rounded-xl shadow-xl"
            >
              {licences.map((e) => {
                return (
                  <option value={e.id} key={e.id}>
                    {e.full_name}
                  </option>
                );
              })}
            </select>

            <label className="text-lg font-bold" htmlFor="exercise_languageId">
              Language
            </label>
            <select
              className="col-span-3 rounded-xl shadow-xl"
              id="exercise_languageId"
              name="languageId"
              defaultValue={
                languages.find((e) => e.full_name === "English")?.id ?? 1
              }
            >
              {languages.map((e) => {
                return (
                  <option value={e.id} key={e.id}>
                    {e.full_name}
                  </option>
                );
              })}
            </select>

            <label
              className="text-lg font-bold"
              htmlFor="exercise_licence_author"
            >
              Author:
            </label>
            <input
              className="col-span-3 rounded-xl shadow-xl"
              id="exercise_licence_author"
              type="text"
              name="licence_author"
              value={exercise.license_author}
            />
            <div className="text-lg font-bold">Muscles Used: </div>
            <div className="col-span-3 rounded-xl bg-red-100 shadow-xl">
              <div className="grid grid-cols-4">
                {muscles.map((e) => {
                  return (
                    <>
                      <label
                        className="p-2 text-sm"
                        htmlFor={`muscles_${e.id}`}
                      >
                        <input
                          className="m-2"
                          type="checkbox"
                          name="muscles[]"
                          value={e.id}
                          key={e.id}
                          id={`muscles_${e.id}`}
                        />
                        {e.name}
                      </label>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="text-lg font-bold">Equipment: </div>
            <div className="col-span-3 rounded-xl bg-red-100 shadow-xl"></div>
            <div />
            <button className="col-span-3 rounded-xl bg-red-500 p-2 text-white shadow-xl">
              Submit
            </button>
          </div>
        </form>
      </Layout>
    );
  }
};

export default EditExercise;
