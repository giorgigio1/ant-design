import { Modal, Button } from "antd";
import { useFormik } from "formik";
import { basicSchema } from "./schema/schema";

export const ModalWindow = ({
  isModalOpen,
  setIsModalOpen,
  dataSource,
  setDataSource,
}: any) => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
      street: "",
      city: "",
      phone: "",
    },
    validationSchema: basicSchema,
    onSubmit: async (_, actions) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onAddPerson();
      setIsModalOpen(false);
      actions.resetForm();
    },
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onAddPerson = () => {
    const newPerson = {
      id: dataSource.length + 1,
      name: values.name,
      email: values.email,
      gender: values.gender,
      address: {
        street: values.street,
        city: values.city,
      },
      phone: values.phone,
    };
    setDataSource([...dataSource, newPerson]);
  };

  return (
    <Modal
      title="Add new person"
      open={isModalOpen}
      onOk={() => handleSubmit()}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => handleSubmit()} disabled={isSubmitting}>
          Yes
        </Button>,
      ]}
      width={800}
      centered
    >
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="name">name</label>
        <input
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.name && touched.name ? "input-error" : ""}
        />
        {errors.name && touched.name && <p className="error">{errors.name}</p>}
        <label htmlFor="email">email</label>
        <input
          name="email"
          type="text"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && touched.email ? "input-error" : ""}
        />
        {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )}
        <label htmlFor="gender">gender</label>
        <select
          name="gender"
          value={values.gender}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.gender && touched.gender ? "input-error" : ""}
        >
          {values.gender === "" && <option value="">Select Gender</option>}
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && touched.gender && (
          <p className="error">{errors.gender}</p>
        )}
        <label htmlFor="street">street</label>
        <input
          name="street"
          type="text"
          value={values.street}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.street && touched.street ? "input-error" : ""}
        />
        {errors.street && touched.street && (
          <p className="error">{errors.street}</p>
        )}
        <label htmlFor="city">city</label>
        <input
          name="city"
          type="text"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.city && touched.city ? "input-error" : ""}
        />
        {errors.city && touched.city && <p className="error">{errors.city}</p>}
        <label htmlFor="phone">phone</label>
        <input
          name="phone"
          type="text"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.phone && touched.phone ? "input-error" : ""}
        />
        {errors.phone && touched.phone && (
          <p className="error">{errors.phone}</p>
        )}
      </form>
    </Modal>
  );
};
