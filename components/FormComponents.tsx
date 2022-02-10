import { ErrorMessage, Field } from "formik";

interface MyTextFieldProps {
  name: string;
  label: string;
}

export function MyTextField(props: MyTextFieldProps) {
  const { name, label } = props;
  return (
    <>
      <label className="text-lg font-bold" htmlFor={name}>
        {label}
      </label>
      <Field
        className="col-span-3 rounded-xl shadow-xl"
        name={name}
        as="input"
        type="text"
      />
      <div className="col-span-4 bg-red-200">
        <ErrorMessage name={name} />
      </div>
    </>
  );
}

export function MyTextAreaField(props: MyTextFieldProps) {
  const { name, label } = props;
  return (
    <>
      <label className="text-lg font-bold" htmlFor={name}>
        {label}
      </label>
      <Field
        className="col-span-3 rounded-xl shadow-xl"
        name={name}
        as="textarea"
      ></Field>
      <ErrorMessage name={name} />
    </>
  );
}

interface MySelectFieldProps {
  name: string;
  label: string;
  options: any[];
}

export function MySelectField(props: MySelectFieldProps) {
  const { name, label, options } = props;
  return (
    <>
      <label className="text-lg font-bold" htmlFor={name}>
        {label}
      </label>
      <Field
        className="col-span-3 rounded-xl shadow-xl"
        name={name}
        as="select"
      >
        {options.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name ?? e.full_name}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} />
    </>
  );
}
