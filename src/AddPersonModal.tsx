import { Modal, Button } from "antd";
import { Formik, Form } from "formik";
import { basicSchema } from "./schema/schema";
import CustomInput from "./components/CustomInput";
import CustomSelect from "./components/CustomSelect";
import { Person } from "./types";
import { useUuId } from "./hooks/useUuId";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  onAddPerson: (person: Person) => void;
  dataSource?: Person[];
};

export const AddPersonModal = ({
  isModalOpen,
  setIsModalOpen,
  onAddPerson,
}: Props) => {
  const id = useUuId();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (person: Person) => {
    onAddPerson(person);
    setIsModalOpen(false);
  };

  return (
    <Formik
      initialValues={{
        id,
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
              label="Name"
              type="text"
              name="name"
              placeholder="Name"
            />
            <CustomInput
              label="email"
              type="email"
              name="email"
              placeholder="email"
            />
            <CustomSelect name="gender" label="gender">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </CustomSelect>
            <CustomInput
              label="street"
              type="text"
              name="address.street"
              placeholder="street"
            />
            <CustomInput
              label="city"
              type="text"
              name="address.city"
              placeholder="city"
            />
            <CustomInput
              label="phone"
              type="text"
              name="phone"
              placeholder="phone"
            />
          </Form>
        </Modal>
      )}
    </Formik>
  );
};
