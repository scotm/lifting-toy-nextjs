import React from "react";
import { useFormik } from "formik";

import type { User } from "@prisma/client";

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
  // Pass the useFormik() Hook -
  //
  // initial form values (initialValues)
  // a validate function that is called when form values change (validate)
  // a function that responds when fields are blurred (unused)
  // and a submit function for when the form is submitted (onSubmit)

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    // handleReset,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 gap-4 py-4 lg:mx-52">
        <label htmlFor="firstname">First Name</label>
        <input
          className="col-span-3 rounded-xl shadow-xl"
          id="firstname"
          name="firstname"
          type="text"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.firstname}
        />
        {touched.firstname && errors.firstname ? (
          <div>{errors.firstname}</div>
        ) : null}
        <label htmlFor="lastname">Last Name</label>
        <input
          className="col-span-3 rounded-xl shadow-xl"
          id="lastname"
          name="lastname"
          type="text"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.lastname}
        />
        {touched.lastname && errors.lastname ? (
          <div>{errors.lastname}</div>
        ) : null}
        <label htmlFor="email">Email Address</label>
        <input
          className="col-span-3 rounded-xl shadow-xl"
          id="email"
          name="email"
          type="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
        />
        {touched.email && errors.email ? <div>{errors.email}</div> : null}
        <div></div>
        <button
          className="col-span-3 rounded-xl bg-red-500 p-2 text-white shadow-xl transition duration-300 hover:bg-red-400"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
