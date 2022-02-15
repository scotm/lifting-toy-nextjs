import type { Exercise } from "@prisma/client";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import {
  MyCheckboxesFields,
  MySelectField,
  MyTextAreaField,
  MyTextField,
} from "../FormComponents";
import { useQuery } from "react-query";
import {
  fetchCategories,
  fetchEquipment,
  fetchLanguages,
  fetchLicences,
  fetchMuscles,
  fetchExerciseByID,
} from "../../api-services";
import { useRouter } from "next/router";

// We don't need to fill out *all* these fields.
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
  muscles: Array<number | string>;
  equipment: Array<number | string>;
}

type FormErrors = Partial<{ [n in keyof FormExercise]: string }>;

interface EditExerciseFormProps {
  id?: number;
  setTitle?: Dispatch<SetStateAction<string>>;
}

export function ExerciseEditForm(props: EditExerciseFormProps) {
  // Pull in the data from API calls
  const { data: exercise } = useQuery(["exercise", props.id], () =>
    fetchExerciseByID(props.id)
  );
  const { data: languages } = useQuery("languages", fetchLanguages);
  const { data: licences } = useQuery("licences", fetchLicences);
  const { data: categories } = useQuery("categories", fetchCategories);
  const { data: muscles } = useQuery("muscles", fetchMuscles);
  const { data: equipment } = useQuery("equipment", fetchEquipment);
  const router = useRouter();

  // We don't render anything until these have all returned.
  if (
    languages === undefined ||
    licences === undefined ||
    categories === undefined ||
    muscles === undefined ||
    equipment === undefined
  ) {
    return null;
  }

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
    if (values.categoryId === 1) {
      errors.categoryId = "We need a specific category for this exercise";
    }
    if (values.equipment.length === 0) {
      errors.equipment = "Fill out the necessary equipment";
    }
    if (values.muscles.length === 0) {
      errors.muscles = "Fill out muscles used";
    }
    return errors;
  }

  if (props.setTitle)
    props.setTitle(exercise ? `Editing ${exercise.name}` : "");

  // Otherwise - render the form.
  return (
    <Formik
      validate={validate}
      enableReinitialize={true}
      initialValues={{
        // Fill out sane defaults - we may reuse this for creating exercises
        id: exercise?.id ?? 0,
        name: exercise?.name ?? "",
        categoryId: exercise?.categoryId ?? 1,
        description: exercise?.description ?? "",
        licenceId: exercise?.licenceId ?? 2,
        languageId:
          exercise?.languageId ??
          languages?.find((e) => e.full_name == "English")?.id ??
          2,
        license_author: exercise?.license_author ?? "",
        muscles: exercise?.muscles
          ? exercise.muscles.map((e) => e.id.toString())
          : [],
        equipment: exercise?.equipment
          ? exercise.equipment.map((e) => e.id.toString())
          : [],
        variations: "",
      }}
      onSubmit={async (values) => {
        // Stub - will replace this with a call to the API.
        await axios.put(`/api/exercises/${values.id}`, values);
        router.push("/exercises");
      }}
    >
      {(formik) => {
        return (
          <Form className="grid grid-cols-4 gap-4 py-4 lg:mx-8">
            <Field type="hidden" name="id" />
            <MyTextField name="name" label="Exercise Name" />
            <MySelectField
              name="categoryId"
              label="Category"
              options={categories}
            />
            <MyTextAreaField name="description" label="Description" />
            <MyTextField name="license_author" label="Author" />
            <MySelectField
              name="licenceId"
              label="Licence"
              options={licences}
            />

            <MyCheckboxesFields
              name="equipment"
              label="Equipment"
              choices={equipment}
            />
            <MyCheckboxesFields
              name="muscles"
              label="Muscles Used"
              choices={muscles}
            />
            <button
              className="col-span-3 col-start-2 rounded-xl bg-red-500 p-2 text-white shadow-xl transition duration-300 hover:bg-red-400"
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
