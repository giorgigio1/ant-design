import { Modal, Button } from "antd";
import { Formik, Form } from "formik";
import { basicSchema } from "./schema/schema";
import CustomInput from "./components/CustomInput";
import CustomSelect from "./components/CustomSelect";

export const AddPersonModal = ({
  isModalOpen,
  setIsModalOpen,
  dataSource,
  setDataSource,
}: any) => {
  const onAddPerson = (values: any) => {
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (values: any, actions: any) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    onAddPerson(values);
    setIsModalOpen(false);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        gender: "",
        street: "",
        city: "",
        phone: "",
      }}
      validationSchema={basicSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Modal
          title="Add new person"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={() => handleSubmit()}>
              Yes
            </Button>,
          ]}
          width={800}
          centered
        >
          <Form>
            <CustomInput
              type="text"
              name="name"
              label="Name"
              placeholder="Name"
            />
            <CustomInput
              type="email"
              name="email"
              label="email"
              placeholder="email"
            />
            <CustomSelect name="gender" label="gender" placeholder="gender">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </CustomSelect>
            <CustomInput
              type="text"
              name="street"
              label="street"
              placeholder="street"
            />
            <CustomInput
              type="text"
              name="city"
              label="city"
              placeholder="city"
            />
            <CustomInput
              type="text"
              name="phone"
              label="phone"
              placeholder="phone"
            />
          </Form>
        </Modal>
      )}
    </Formik>
  );
};
