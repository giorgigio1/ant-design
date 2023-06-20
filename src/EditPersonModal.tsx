import { Button, Form, Modal } from "antd";
import { Formik } from "formik";
import { basicSchema } from "./schema/schema";
import CustomInput from "./components/CustomInput";
import CustomSelect from "./components/CustomSelect";
import { Person } from "./types";

type Props = {
  editingPerson: Person;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (value: boolean) => void;
  onEditPerson: (person: Person) => void;
};

export const EditPersonModal = ({
  editingPerson,
  isEditModalOpen,
  setIsEditModalOpen,
  onEditPerson,
}: Props) => {
  const onSubmit = (person: Person) => {
    onEditPerson(person);
    setIsEditModalOpen(false);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
  };

  return (
    <Formik
      initialValues={{
        id: editingPerson.id,
        name: editingPerson.name,
        email: editingPerson.email,
        gender: editingPerson.gender,
        address: {
          street: editingPerson.address.street,
          city: editingPerson.address.city,
        },
        phone: editingPerson.phone,
      }}
      validationSchema={basicSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => {
        return (
          <Modal
            title="Edit person"
            open={isEditModalOpen}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={() => handleSubmit()}
              >
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
        );
      }}
    </Formik>
  );
};
