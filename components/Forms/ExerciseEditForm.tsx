import type { Exercise } from "@prisma/client";
import { Field, Form, Formik } from "formik";
import {
  useGetCategoriesQuery,
  useGetEquipmentQuery,
  useGetExerciseByIdQuery,
  useGetLanguagesQuery,
  useGetLicencesQuery,
  useGetMusclesQuery,
} from "../../services/exercise";
import { MySelectField, MyTextAreaField, MyTextField } from "../FormComponents";

// We don't need to fill out all these fields.
// The API will (eventually) auto-generate the ones missing.
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

// A form validation function. This must return an object
// which keys are symmetrical to our values/initialValues
function validate(values: FormExercise): FormErrors {
  const errors: FormErrors = {};

  // TODO: Add lots more!
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 255) {
    errors.name = "Please use fewer than 255 characters";
  }
  if (!values.description) {
    errors.description = "Required";
  }
  return errors;
}

interface EditExerciseFormProps {
  id: number;
}

export default function SignUpForm(props: EditExerciseFormProps) {
  // Pull in the data from API calls
  const { data: exercise } = useGetExerciseByIdQuery(props.id);
  const { data: languages } = useGetLanguagesQuery();
  const { data: licences } = useGetLicencesQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: muscles } = useGetMusclesQuery();
  const { data: equipment } = useGetEquipmentQuery();

  // We don't render anything until these have all returned.
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

  // Otherwise - render the form.
  return (
    <Formik
      validate={validate}
      enableReinitialize={true}
      initialValues={{
        // Fill out sane defaults - we may reuse this for creating exercises
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
        // Stub - will replace this with a call to the API.
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form className="grid grid-cols-4 gap-4 py-4 lg:mx-8">
        <MyTextField name="name" label="Exercise Name" />
        <MySelectField
          name="categoryId"
          label="Category"
          options={categories}
        />
        <MyTextAreaField name="description" label="Description" />
        <MySelectField name="licenceId" label="Licence" options={licences} />

        {/* For some reason - this doesn't let you check anything -
            There must be something wrong with the onChange handler. */}
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
        <div className="col-span-1"></div>
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
