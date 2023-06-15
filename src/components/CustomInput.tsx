import { useField } from "formik";

type Props = {
  label: string;
  type: "text" | "email";
  name: string;
  placeholder: string;
};

const CustomInput = ({ label, type, name, placeholder }: Props) => {
  const [field, meta] = useField({ name });

  return (
    <>
      <label>{label}</label>
      <input
        {...field}
        name={name}
        type={type}
        placeholder={placeholder}
        className={meta.touched && meta.error ? "input-error" : ""}
      />
      {meta.touched && meta.error && <p className="error">{meta.error}</p>}
    </>
  );
};

export default CustomInput;
