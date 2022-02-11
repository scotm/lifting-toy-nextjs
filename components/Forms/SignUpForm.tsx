import type { User } from "@prisma/client";
import { Form, Formik } from "formik";
import { MyTextField } from "../FormComponents";

type FormUser = Pick<User, "firstname" | "lastname" | "email">;
type FormErrors = Partial<Pick<User, "firstname" | "lastname" | "email">>;

// A validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = (values: FormUser): FormErrors => {
  const errors: FormErrors = {};
  if (!values.firstname) {
    errors.firstname = "Required";
  } else if (values.firstname.length > 20) {
    errors.firstname = "Must be 20 characters or less";
  }

  if (!values.lastname) {
    errors.lastname = "Required";
  } else if (values.lastname.length > 30) {
    errors.lastname = "Must be 30 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  }
  // The usual simple email-checking regex.
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

interface SignUpFormProps {}

export default function SignUpForm(props: SignUpFormProps) {
  // initial form values (initialValues)
  // a validate function that is called when form values change (validate)
  // a function that responds when fields are blurred (unused)
  // and a submit function for when the form is submitted (onSubmit)
  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
      }}
      validate={validate}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
      render={() => (
        <Form>
          <div className="grid grid-cols-4 gap-4 py-4 lg:mx-52">
            <MyTextField label="First Name" name="firstname" />
            <MyTextField label="Last Name" name="lastname" />
            <MyTextField label="Email Address" name="email" />
            <div></div>
            <button
              className="col-span-3 rounded-xl bg-red-500 p-2 text-white shadow-xl transition duration-300 hover:bg-red-400"
              type="submit"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    ></Formik>
  );
}
