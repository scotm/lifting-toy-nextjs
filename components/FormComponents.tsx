import { ErrorMessage, Field, FieldArray } from "formik";

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

interface MyCheckboxesFieldsProps {
  name: string;
  label: string;
  choices: any[];
}

export function MyCheckboxesFields(props: MyCheckboxesFieldsProps) {
  const { name, label, choices } = props;
  return (
    <>
      <div className="text-lg font-bold">{label}</div>
      <div className="col-span-3 grid grid-cols-4 rounded-xl border-2 border-red-200 bg-red-100 p-2 shadow-xl">
        {choices.map((choice) => (
          <label key={choice.id} className="flex grid-cols-2">
            <Field
              className="m-2"
              type="checkbox"
              name={name}
              // Having to use toString? This *feels* like a wtf!
              // https://stackoverflow.com/a/64740181
              value={choice.id.toString()}
            />
            <span className=" m-2 text-sm">{choice.name}</span>
          </label>
        ))}
      </div>
    </>
  );
}
