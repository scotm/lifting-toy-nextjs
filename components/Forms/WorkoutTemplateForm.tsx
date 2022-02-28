import { useUser } from "@auth0/nextjs-auth0";
import { RepPair } from "@prisma/client";
import axios from "axios";
import { ArrayHelpers, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import {
  fetchAllExercises,
  fetchRepetitionUnits,
  fetchWeightUnits,
} from "../../api-services";
import { WorkoutTemplateReturnType } from "../../pages/api/api-types";
import { MySelectField, MyTextField } from "../FormComponents";

interface FormInput extends Omit<WorkoutTemplateReturnType, "id" | "userId"> {}
type FormError = Partial<{ [day in keyof WorkoutTemplateReturnType]: string }>;

const default_rep_pair: Partial<RepPair> = {
  reps: 10,
  repetitionUnitsId: 1,
};

function validate(values: FormInput): FormError {
  const errors: FormError = {};
  if (!values.name) {
    errors.name = "Please give this workout a name";
  }
  if (values.pieces) {
    if (values.pieces.length === 0) {
      errors.pieces =
        "There should be at least one exercise in a workout template";
    }
    if (values.pieces.some((piece) => piece.rep_pair.length === 0)) {
      errors.pieces =
        "There are exercises in this template, without a specific workload. Add a working set to it.";
    }
  }
  return errors;
}

function AddSetButton(props: { ah: ArrayHelpers }) {
  const { ah } = props;
  return (
    <button
      className="mb-2 w-full rounded-xl bg-green-600 py-2 px-6 text-white shadow-xl transition duration-300 hover:bg-green-500"
      type="button"
      onClick={() => {
        ah.push(default_rep_pair);
      }}
    >
      Add Set
    </button>
  );
}

function RemoveExerciseButton(props: { ah: ArrayHelpers; index: number }) {
  const { ah, index } = props;
  return (
    <button
      className="rounded-xl bg-red-500 py-2 px-4 text-white shadow-xl transition duration-300 hover:bg-red-400"
      type="button"
      onClick={() => ah.remove(index)}
    >
      Remove Exercise
    </button>
  );
}

interface WorkoutTemplateFormProps {}

export function WorkoutTemplateForm(props: WorkoutTemplateFormProps) {
  const { user } = useUser();
  const router = useRouter();
  const { data: exercises } = useQuery("exercises", fetchAllExercises);
  const { data: repetitionunits } = useQuery(
    "repetitionunits",
    fetchRepetitionUnits
  );
  const { data: weightunits } = useQuery("weightunits", fetchWeightUnits);

  if (!exercises || exercises.length == 0 || !repetitionunits || !weightunits) {
    return null;
  }

  const initialValues: { name: string; pieces: any[] } = {
    name: "",
    pieces: [{ exerciseId: exercises[0].id, rep_pair: [default_rep_pair] }],
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values, formikhelpers) => {
        // alert(JSON.stringify(values, null, 2));
        console.log(values);
        // Stub - will replace this with a call to the API.
        const response = await axios.post(`/api/workouttemplate/`, values);
        // router.push(`/exercises/${values.id}`);
        formikhelpers.setSubmitting(false);
      }}
      validate={validate}
    >
      {({ isValid, values, isSubmitting }) => {
        return (
          <Form className="grid grid-cols-4 gap-2 py-4 px-4 lg:mx-8">
            <MyTextField name="name" label="Name" />
            <div className="col-span-4 mt-4 text-xl font-bold">Exercises:</div>
            <FieldArray
              name="pieces"
              render={(arrayHelpers) => (
                <>
                  {values.pieces.map((value, index) => (
                    <div
                      key={index}
                      className={`col-span-4 mt-2 grid grid-cols-4 gap-4 rounded-md bg-red-100 p-4`}
                    >
                      <MySelectField
                        name={`pieces.${index}.exerciseId`}
                        label={""}
                        options={exercises}
                        className={`col-span-${
                          values.pieces.length > 1 ? "3" : "4"
                        } rounded-md border-2 border-red-700 bg-red-500 text-white shadow-md`}
                      />
                      {values.pieces.length > 1 && (
                        <RemoveExerciseButton ah={arrayHelpers} index={index} />
                      )}
                      <FieldArray
                        name={`pieces.${index}.rep_pair`}
                        render={(ah) => (
                          <>
                            {value.rep_pair.length > 0 ? (
                              <>
                                <div className="col-span-1 pl-8 text-lg font-bold">
                                  Sets
                                </div>
                                <div className="col-span-1 col-start-4">
                                  <AddSetButton ah={ah} />
                                </div>
                              </>
                            ) : (
                              <div className="col-span-4">
                                <AddSetButton ah={ah} />
                              </div>
                            )}

                            {value.rep_pair.map((e, i) => (
                              <div
                                key={`pieces.${index}.rep_pair.${i}`}
                                className={`col-span-4 grid grid-cols-4 gap-2`}
                              >
                                <div className="text-center">---</div>
                                <MySelectField
                                  name={`pieces.${index}.rep_pair.${i}.repetitionUnitsId`}
                                  label={""}
                                  className="col-start-2 mx-1 rounded-xl shadow-xl"
                                  options={repetitionunits}
                                />
                                <MyTextField
                                  name={`pieces.${index}.rep_pair.${i}.reps`}
                                  label={""}
                                  className="mx-1 w-full rounded-xl shadow-xl"
                                />
                                <button
                                  className="mx-1 rounded-xl bg-green-600 py-2 px-6 text-white shadow-xl transition duration-300 hover:bg-green-500"
                                  type="button"
                                  onClick={() => {
                                    ah.remove(i);
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </>
                        )}
                      />
                    </div>
                  ))}
                  <div className="col-span-4">
                    <button
                      className="rounded-xl bg-red-500 py-2 px-6 text-white shadow-xl transition duration-300 hover:bg-red-400"
                      type="button"
                      onClick={() => {
                        const workoutpiece = {
                          exerciseId: exercises[0].id,
                          rep_pair: new Array(1).fill(default_rep_pair),
                        };
                        arrayHelpers.push(workoutpiece);
                      }}
                    >
                      Add {values.pieces.length > 0 ? "Another" : ""} Exercise
                    </button>
                  </div>
                </>
              )}
            />
            <div></div>
            <button
              className="col-span-3 col-start-2 mt-8 rounded-xl bg-red-500 p-2 text-lg font-bold text-white shadow-xl transition duration-300 hover:bg-red-400"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Create Workout Template
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
