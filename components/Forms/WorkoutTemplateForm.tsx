import { FolderAddIcon, FolderRemoveIcon } from "@heroicons/react/solid";
import { FieldArray, Form, Formik } from "formik";
import {
  fetchAllExercises,
  fetchRepetitionUnits,
  fetchWeightUnits,
} from "../../api-services";
import { MyWorkoutPiece, MyWorkoutTemplate } from "../../types/ExerciseTypes";
import ExerciseList from "../ExerciseList";
import { MySelectField, MyTextField } from "../FormComponents";
import Modal from "../Modal";
import { useQuery } from "react-query";

type FormError = Partial<{ [day in keyof MyWorkoutTemplate]: string }>;

const initialValues: MyWorkoutTemplate = {
  name: "",
  userId: 1,
  pieces: [],
};

function validate(values: MyWorkoutTemplate): FormError {
  const errors: FormError = {};
  if (!values.name) {
    errors.name = "Please give this workout a name";
  }
  return errors;
}

interface WorkoutTemplateFormProps {}

export function WorkoutTemplateForm(props: WorkoutTemplateFormProps) {
  const { data: exercises } = useQuery("exercises", fetchAllExercises);
  const { data: repetitionunits } = useQuery(
    "repetitionunits",
    fetchRepetitionUnits
  );
  const { data: weightunits } = useQuery("weightunits", fetchWeightUnits);

  if (
    exercises === undefined ||
    repetitionunits === undefined ||
    weightunits == undefined
  ) {
    return null;
  }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values, formikhelpers) => {
        alert(JSON.stringify(values, null, 2));
        console.log(values);
        formikhelpers.setSubmitting(false);
      }}
      validate={validate}
    >
      {({ isValid, values, isSubmitting }) => {
        return (
          <Form className="grid grid-cols-4 gap-4 py-4 lg:mx-8">
            <input type="hidden" name="userId" value={1} />
            <MyTextField name="name" label="Name" />
            <FieldArray
              name="pieces"
              render={(arrayHelpers) => (
                <>
                  {values.pieces && values.pieces.length > 0 ? (
                    values.pieces.map((value, index) => (
                      <div
                        key={index}
                        // Add a bit of spacing here if the
                        // exercise is different than the one above.
                        className={`col-span-4 flex gap-2 ${
                          index != 0 &&
                          values.pieces[index].exerciseId !=
                            values.pieces[index - 1].exerciseId
                            ? " mt-6"
                            : ""
                        }`}
                      >
                        <Modal title="Pick an Exercise">
                          <ExerciseList exercises={exercises} />
                        </Modal>
                        {/* <MySelectField
                          name={`pieces.${index}.exerciseId`}
                          label={""}
                          options={exercises}
                        /> */}
                        <MyTextField
                          name={`pieces.${index}.number_of_reps`}
                          label={""}
                          className="w-20 rounded-xl shadow-xl"
                        />
                        <MySelectField
                          name={`pieces.${index}.repetitionUnitsId`}
                          label={""}
                          options={repetitionunits}
                        />
                        {/* {index > 0 ? (
                          <ArrowUpIcon
                            className="float-right h-8 w-8 text-red-500"
                            onClick={() => arrayHelpers.swap(index, index - 1)}
                          />
                        ) : null}
                        {index < values.pieces.length - 1 ? (
                          <ArrowDownIcon
                            className="float-right h-8 w-8 text-red-500"
                            onClick={() => arrayHelpers.swap(index, index + 1)}
                          />
                        ) : null} */}
                        <button
                          className="order-11"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          <FolderRemoveIcon className="h-8 w-8 text-red-500" />
                        </button>
                        <button className="order-12">
                          <FolderAddIcon
                            className="h-8 w-8 text-red-500"
                            onClick={() => {
                              const workoutpiece: MyWorkoutPiece = {
                                repetitionUnitsId:
                                  values.pieces[index].repetitionUnitsId,
                                number_of_reps:
                                  values.pieces[index].number_of_reps,
                                exerciseId: values.pieces[index].exerciseId,
                              };
                              arrayHelpers.insert(index, workoutpiece);
                            }}
                          />
                        </button>
                      </div>
                    ))
                  ) : (
                    <button
                      className="rounded-xl bg-red-500 py-2 px-6 text-white shadow-xl transition duration-300 hover:bg-red-400"
                      type="button"
                      onClick={() => {
                        const workoutpiece: MyWorkoutPiece = {
                          repetitionUnitsId: repetitionunits[0].id,
                          exerciseId: exercises[0].id,
                          number_of_reps: 10,
                        };
                        arrayHelpers.push(workoutpiece);
                      }}
                    >
                      Add a set
                    </button>
                  )}
                </>
              )}
            />
            <div></div>
            <button
              className="col-span-3 col-start-2 rounded-xl bg-red-500 p-2 text-white shadow-xl transition duration-300 hover:bg-red-400"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
