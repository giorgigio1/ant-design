import "./App.css";
import { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { AddPersonModal } from "./AddPersonModal";
import { EditPersonModal } from "./EditPersonModal";
import { Person } from "./types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ColumnItem {
  key: number;
  title: string;
  dataIndex?: string;
  render?: (data: any) => React.ReactNode;
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [dataSource, setDataSource] = useState<Person[]>([
    {
      id: 1,
      name: "Vilma Jefferson",
      email: "vilmajefferson@gology.com",
      gender: "female",
      address: {
        street: "Bath Avenue",
        city: "New York",
      },
      phone: "+1 (814) 496-3905",
    },
    {
      id: 2,
      name: "Cassandra Nguyen",
      email: "cassandranguyen@gology.com",
      gender: "female",
      address: {
        street: "Hamilton Avenue",
        city: "Chicago",
      },
      phone: "+1 (946) 426-2243",
    },
    {
      id: 3,
      name: "Lenora Clements",
      email: "lenoraclements@gology.com",
      gender: "female",
      address: {
        street: "Seba Avenue",
        city: "San Diego",
      },
      phone: "+1 (838) 598-2355",
    },
    {
      id: 4,
      name: "Hanson Goodwin",
      email: "hansongoodwin@gology.com",
      gender: "male",
      address: {
        street: "Cranberry Street",
        city: "New York",
      },
      phone: "+1 (947) 576-2508",
    },
  ]);

  const navigate = useNavigate();

  const url = "http://localhost:5000/";

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      axios.get<Person[]>(`${url}person`, { headers }).then((response) => {
        setDataSource(response.data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const addUser = (person: Person) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post<Person[]>(`${url}add-persons`, person, { headers })
      .then((response) => {
        setDataSource(response.data);
      });
  };

  const updateUser = (person: Person) => {
    const headers = {
      "Content-Type": "application/json",
    };
    setEditingPerson(null);
    axios
      .post<Person[]>(`${url}update-persons`, person, { headers })
      .then((response) => {
        setDataSource(response.data);
      });
  };

  const deleteUser = (person: Person) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post<Person[]>(`${url}delete-persons`, person, { headers })
      .then((response) => {
        setDataSource(response.data);
      });
  };

  const columns: ColumnItem[] = [
    {
      key: 1,
      title: "Id",
      dataIndex: "id",
    },
    {
      key: 2,
      title: "Name",
      dataIndex: "name",
    },
    {
      key: 3,
      title: "Email",
      dataIndex: "email",
    },
    {
      key: 4,
      title: "Gender",
      dataIndex: "gender",
    },
    {
      key: 5,
      title: "Steet",
      dataIndex: "address",
      render: ({ street }) => street,
    },
    {
      key: 6,
      title: "City",
      dataIndex: "address",
      render: ({ city }) => city,
    },
    {
      key: 7,
      title: "Phone",
      dataIndex: "phone",
    },
    {
      key: 8,
      title: "Action",
      render: (person: Person) => {
        return (
          <>
            <EditOutlined
              onClick={() => onEditPerson(person)}
              style={{ cursor: "pointer" }}
            />
            <DeleteOutlined
              onClick={() => onDeletePerson(person)}
              style={{ color: "red", marginLeft: 10, cursor: "pointer" }}
            />
          </>
        );
      },
    },
  ];

  const onEditPerson = (person: Person) => {
    setEditingPerson({ ...person });
    setIsEditModalOpen(true);
  };

  const doubleClickEdit = (person: Person) => {
    return {
      onDoubleClick: () => onEditPerson(person),
    };
  };

  const onDeletePerson = (person: Person) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this person?",
      icon: <DeleteOutlined />,
      okText: "Yes",
      okType: "danger",
      onOk: () => deleteUser(person),
    });
  };

  return (
    <div className="app">
      <Button
        onClick={() => setIsModalOpen(true)}
        type="primary"
        style={{ margin: 20 }}
      >
        Add Person
      </Button>
      <Table
        onRow={doubleClickEdit}
        bordered
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
      />
      {isModalOpen && (
        <AddPersonModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onAddPerson={(person) => {
            addUser(person);
          }}
        />
      )}
      {editingPerson && (
        <EditPersonModal
          editingPerson={editingPerson}
          isEditModalOpen={isEditModalOpen}
          setEditingPerson={setEditingPerson}
          setIsEditModalOpen={setIsEditModalOpen}
          onEditPerson={(person) => {
            updateUser(person);
          }}
        />
      )}
      <button
        onClick={() => navigate("/chart", { state: dataSource })}
        style={{
          margin: 20,
          padding: 10,
          borderRadius: 6,
          border: "none",
          backgroundColor: "#1677ff",
          color: "white",
          cursor: "pointer",
        }}
      >
        GO TO PIE CHART
      </button>
    </div>
  );
}

export default App;
