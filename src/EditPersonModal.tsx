import { Button, Form, Modal } from "antd";
import { Formik } from "formik";
import { basicSchema } from "./schema/schema";
import CustomInput from "./components/CustomInput";
import CustomSelect from "./components/CustomSelect";
import { Person } from "./types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  editingPerson: Person;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (value: boolean) => void;
  onEditPerson: (person: Person) => void;
  setEditingPerson: Dispatch<SetStateAction<null | Person>>;
};

export const EditPersonModal = ({
  editingPerson,
  isEditModalOpen,
  setIsEditModalOpen,
  onEditPerson,
  setEditingPerson,
}: Props) => {
  const onSubmit = async (person: Person) => {
    await onEditPerson(person);
    setIsEditModalOpen(false);
    setEditingPerson(null);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setEditingPerson(null);
  };

  return (
    <Formik
      initialValues={editingPerson}
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
