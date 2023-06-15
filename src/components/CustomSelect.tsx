import { useField } from "formik";

type Props = {
  label: string;
  name: string;
  children: React.ReactNode;
};

const CustomSelect = ({ label, name, children }: Props) => {
  const [field, meta] = useField({ name });

  return (
    <>
      <label>{label}</label>
      <select
        {...field}
        name={name}
        children={children}
        className={meta.touched && meta.error ? "input-error" : ""}
      />
      {meta.touched && meta.error && <p className="error">{meta.error}</p>}
    </>
  );
};

export default CustomSelect;
