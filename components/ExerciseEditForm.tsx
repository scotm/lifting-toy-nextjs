import type { Exercise } from "@prisma/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import {
  useGetCategoriesQuery,
  useGetEquipmentQuery,
  useGetExerciseByIdQuery,
  useGetLanguagesQuery,
  useGetLicencesQuery,
  useGetMusclesQuery,
} from "../services/exercise";

interface FormExercise
  extends Omit<
    Exercise,
    | "id"
    | "name_original"
    | "status"
    | "creation_date"
    | "uuid"
    | "exerciseBaseDataId"
  > {
  categoryId: number;
  muscles: number[];
  equipment: number[];
}

type FormErrors = Partial<FormExercise>;

// A validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = (values: FormExercise): FormErrors => {
  const errors: FormErrors = {};
  if (!values.name) {
    errors.name = "Required";
  }

  // Add lots more!

  return errors;
};

interface SignUpFormProps {
  id: number;
}

export default function SignUpForm(props: SignUpFormProps) {
  // Pull in the data from API calls
  const { data: exercise } = useGetExerciseByIdQuery(props.id);
  const { data: languages } = useGetLanguagesQuery();
  const { data: licences } = useGetLicencesQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: muscles } = useGetMusclesQuery();
  const { data: equipment } = useGetEquipmentQuery();
  if (
    exercise === undefined ||
    languages === undefined ||
    licences === undefined ||
    categories === undefined ||
    muscles === undefined ||
    equipment === undefined
  ) {
    return null;
  }
  return (
    <Formik
      validate={validate}
      enableReinitialize={true}
      initialValues={{
        name: exercise?.name ?? "",
        categoryId: exercise?.exercise_base?.categoryId ?? 1,
        description: exercise?.description ?? "",
        licenceId: exercise?.licenceId ?? 2,
        languageId:
          exercise?.languageId ??
          languages?.find((e) => e.full_name == "English")?.id ??
          2,
        license_author: exercise?.license_author ?? "",
        muscles: exercise.exercise_base?.muscles
          ? exercise.exercise_base?.muscles.map((e) => e.id)
          : [],
        equipment: exercise.exercise_base?.equipment
          ? exercise.exercise_base?.equipment.map((e) => e.id)
          : [],
      }}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form className="grid grid-cols-4 gap-4 py-4 lg:mx-8">
        <label className="text-lg font-bold" htmlFor="name">
          Exercise Name
        </label>
        <Field
          className="col-span-3 rounded-xl shadow-xl"
          name="name"
          type="text"
        />
        <ErrorMessage name="name" />
        <label className="text-lg font-bold" htmlFor="categoryId">
          Category
        </label>
        <Field
          className="col-span-3 rounded-xl shadow-xl"
          name="categoryId"
          as="select"
        >
          {categories.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </Field>
        <ErrorMessage name="categoryId" />
        <label className="text-lg font-bold" htmlFor="description">
          Description
        </label>
        <Field
          className="col-span-3 rounded-xl shadow-xl"
          name="description"
          as="textarea"
        ></Field>
        <ErrorMessage name="description" />

        <label className="text-lg font-bold" htmlFor="licenceId">
          Licence
        </label>
        <Field
          className="col-span-3 rounded-xl shadow-xl"
          name="licenceId"
          as="select"
        >
          {licences.map((e) => (
            <option key={e.id} value={e.id}>
              {e.full_name}
            </option>
          ))}
        </Field>

        <div className="text-lg font-bold">Equipment</div>
        <div className="col-span-3 grid grid-cols-4">
          {equipment.map((e) => {
            return (
              <div key={e.id}>
                <label htmlFor="equipment">
                  <Field
                    className="m-2 p-2"
                    type="checkbox"
                    name="equipment"
                    value={e.id}
                  />
                  {e.name}
                </label>
              </div>
            );
          })}
        </div>
        <div className="text-lg font-bold">Muscles</div>
        <div className="col-span-3 grid grid-cols-4">
          {muscles.map((e) => {
            return (
              <div key={e.id}>
                <Field
                  className="m-2 p-2"
                  type="checkbox"
                  name="muscles"
                  value={e.id}
                />
                <label htmlFor="muscles">{e.name}</label>
              </div>
            );
          })}
        </div>
        <div className="col-span-1"> </div>
        <button
          className="col-span-3 rounded-xl bg-red-500 p-2 text-white shadow-xl transition duration-300 hover:bg-red-400"
          type="submit"
        >
          Submit
        </button>
      </Form>
    </Formik>
  );
}
