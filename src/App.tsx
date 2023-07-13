import "./App.css";
import { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { AddPersonModal } from "./AddPersonModal";
import { EditPersonModal } from "./EditPersonModal";
import { Person } from "./types";
import { useNavigate } from "react-router-dom";
import Button from "./components/button";
import { useStore } from "./store/useStore";

interface ColumnItem {
  title: string;
  dataIndex?: string;
  render?: (data: any) => React.ReactNode;
}

function App(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);

  const navigate = useNavigate();

  const { persons, getData, deletePerson } = useStore();

  useEffect(() => {
    getData();
  }, [getData]);

  const deleteUser = (person: Person) => {
    deletePerson(person);
  };

  const columns: ColumnItem[] = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Steet",
      dataIndex: "address",
      render: ({ street }) => street,
    },
    {
      title: "City",
      dataIndex: "address",
      render: ({ city }) => city,
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
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
        dataSource={persons}
      />
      {isModalOpen && (
        <AddPersonModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {editingPerson && (
        <EditPersonModal
          editingPerson={editingPerson}
          isEditModalOpen={isEditModalOpen}
          setEditingPerson={setEditingPerson}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      )}
      <Button onClick={() => navigate("/chart")}>
        GO TO PIE CHART
      </Button>
    </div>
  );
}

export default App;
