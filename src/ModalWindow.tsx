import { useState } from "react";
import { Modal } from "antd";

export const ModalWindow = ({
  isModalOpen,
  setIsModalOpen,
  dataSource,
  setDataSource,
}: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onAddPerson = () => {
    const newPerson = {
      id: dataSource.length + 1,
      name: name,
      email: email,
      gender: gender,
      address: {
        street: street,
        city: city,
      },
      phone: phone,
    };
    setDataSource([...dataSource, newPerson]);
    setIsModalOpen(false);
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleGenderChange = (event: any) => {
    setGender(event.target.value);
  };

  const handleStreetChange = (event: any) => {
    setStreet(event.target.value);
  };

  const handleCityChange = (event: any) => {
    setCity(event.target.value);
  };

  const handlePhonChange = (event: any) => {
    setPhone(event.target.value);
  };

  return (
    <Modal
      title="Add new person"
      open={isModalOpen}
      onOk={onAddPerson}
      onCancel={handleCancel}
      width={800}
      centered
    >
      <label htmlFor="">name</label>
      <input type="text" value={name} onChange={handleNameChange} />
      <label htmlFor="">email</label>
      <input type="text" value={email} onChange={handleEmailChange} />
      <label htmlFor="">gender</label>
      <select value={gender} onChange={handleGenderChange} name="">
        {gender === "" && <option value="">Select Gender</option>}
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <label htmlFor="">street</label>
      <input type="text" value={street} onChange={handleStreetChange} />
      <label htmlFor="">city</label>
      <input type="text" value={city} onChange={handleCityChange} />
      <label htmlFor="">phone</label>
      <input type="text" value={phone} onChange={handlePhonChange} />
    </Modal>
  );
};
