import "./App.css";
import { useState } from "react";
import { Table, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ModalWindow } from "./ModalWindow";
import { EditModal } from "./EditModal";

interface DataSourceItem {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

interface ColumnItem {
  key: number;
  title: string;
  dataIndex?: string;
  render?: (data: any) => React.ReactNode;
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<any>(null);
  const [dataSource, setDataSource] = useState<DataSourceItem[]>([
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
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => onEditPerson(record)}
              style={{ cursor: "pointer" }}
            />
            <DeleteOutlined
              onClick={() => onDeletePerson(record)}
              style={{ color: "red", marginLeft: 10, cursor: "pointer" }}
            />
          </>
        );
      },
    },
  ];

  const onEditPerson = (record: any) => {
    setIsEditModalOpen(true);
    setEditingPerson({ ...record });
  };

  const onDeletePerson = (action: any) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this person?",
      icon: <DeleteOutlined />,
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((item) => item.id !== action.id);
        });
      },
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
      <Table bordered rowKey="id" columns={columns} dataSource={dataSource} />
      <ModalWindow
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        dataSource={dataSource}
        setDataSource={setDataSource}
      />
      <EditModal
        editingPerson={editingPerson}
        setEditingPerson={setEditingPerson}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        dataSource={dataSource}
        setDataSource={setDataSource}
      />
    </div>
  );
}

export default App;
