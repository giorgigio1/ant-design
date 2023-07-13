import "./App.css";
import { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { AddPersonModal } from "./AddPersonModal";
import { EditPersonModal } from "./EditPersonModal";
import { Person } from "./types";
import { useNavigate } from "react-router-dom";
import Button from "./components/button";
import useAxiosStore from "./store/useAxiosStore";

interface ColumnItem {
  key: number;
  title: string;
  dataIndex?: string;
  render?: (data: any) => React.ReactNode;
}

function App(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);

  const navigate = useNavigate();

  const { data, getData, addPerson, updatePerson, deletePerson }: any =
    useAxiosStore();

  useEffect(() => {
    getData();
  }, [getData]);

  const addUser = (person: Person) => {
    addPerson(person);
  };

  const updateUser = (person: Person) => {
    setEditingPerson(null);
    updatePerson(person);
  };

  const deleteUser = (person: Person) => {
    deletePerson(person);
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
      <Button onClick={() => setIsModalOpen(true)}>Add Person</Button>
      <Table
        style={{ marginLeft: 30, marginRight: 30 }}
        onRow={doubleClickEdit}
        bordered
        rowKey="id"
        columns={columns}
        dataSource={data}
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
      <Button onClick={() => navigate("/chart", { state: data })}>
        GO TO PIE CHART
      </Button>
    </div>
  );
}

export default App;
