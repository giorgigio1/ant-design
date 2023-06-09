import { Modal } from "antd";

export const EditPersonModal = ({
  editingPerson,
  setEditingPerson,
  isEditModalOpen,
  setIsEditModalOpen,
  setDataSource,
}: any) => {
  const handleOk = () => {
    setDataSource((pre: any) => {
      return pre.map((person: any) => {
        if (person.id === editingPerson.id) {
          return editingPerson;
        } else {
          return person;
        }
      });
    });
    setIsEditModalOpen(false);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingPerson((pre: any) => {
      return { ...pre, name: e.target.value };
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingPerson((pre: any) => {
      return { ...pre, email: e.target.value };
    });
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditingPerson((pre: any) => {
      return { ...pre, gender: e.target.value };
    });
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingPerson((pre: any) => {
      return {
        ...pre,
        address: {
          ...pre.address,
          street: e.target.value,
        },
      };
    });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingPerson((pre: any) => {
      return {
        ...pre,
        address: {
          ...pre.address,
          city: e.target.value,
        },
      };
    });
  };

  const handlePhonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingPerson((pre: any) => {
      return { ...pre, phone: e.target.value };
    });
  };

  return (
    <form autoComplete="off">
      <Modal
        title="Add new person"
        open={isEditModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        centered
      >
        <label htmlFor="name">name</label>
        <input
          name="name"
          type="text"
          value={editingPerson?.name}
          onChange={handleNameChange}
        />
        <label htmlFor="email">email</label>
        <input
          type="text"
          value={editingPerson?.email}
          onChange={handleEmailChange}
        />
        <label htmlFor="gender">gender</label>
        <select
          value={editingPerson?.gender}
          onChange={handleGenderChange}
          name=""
        >
          {editingPerson?.gender === "" && (
            <option value="">Select Gender</option>
          )}
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label htmlFor="street">street</label>
        <input
          type="text"
          value={editingPerson?.address?.street}
          onChange={handleStreetChange}
        />
        <label htmlFor="city">city</label>
        <input
          type="text"
          value={editingPerson?.address?.city}
          onChange={handleCityChange}
        />
        <label htmlFor="phone">phone</label>
        <input
          type="text"
          value={editingPerson?.phone}
          onChange={handlePhonChange}
        />
      </Modal>
    </form>
  );
};
