import { Modal, Button } from "antd";
import { Formik, Form } from "formik";
import { basicSchema } from "./schema/schema";
import CustomInput from "./components/CustomInput";
import CustomSelect from "./components/CustomSelect";
import { Person } from "./types";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  onAddPerson: (person: Person) => void;
};

export const AddPersonModal = ({
  isModalOpen,
  setIsModalOpen,
  onAddPerson,
}: Props) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (person: Person) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    onAddPerson(person);
    setIsModalOpen(false);
  };

  return (
    <Formik
      initialValues={{
        id: 0,
        name: "",
        email: "",
        gender: "",
        address: {
          street: "",
          city: "",
        },
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
            <CustomSelect name="gender" label="gender">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </CustomSelect>
            <CustomInput
              type="text"
              name="address.street"
              label="street"
              placeholder="street"
            />
            <CustomInput
              type="text"
              name="address.city"
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
