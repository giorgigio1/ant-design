import "./App.css";
import { useState } from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

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
  const [dataSource, setDataSource] = useState<DataSourceItem[]>([
    {
      id: 10,
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
      id: 11,
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
      id: 12,
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
      id: 13,
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
      render: ({street}) => street,
    },
    {
      key: 6,
      title: "City",
      dataIndex: "address",
      render: ({ city }) => city
    },
    {
      key: 7,
      title: "Phone",
      dataIndex: "phone",
    },
    {
      key: 8,
      title: "Action",
      dataIndex: "action",
      render: () => (
        <>
          <EditOutlined onClick={onEditPerson} style={{cursor: 'pointer'}} />
          <DeleteOutlined style={{color: 'red', marginLeft: 10, cursor: 'pointer'}}  />
        </>
      ),
    },
  ];

  const onAddPerson =() => {
    const random = Math.round(Math.random() * 1000)
    const newItem = {
      id: dataSource.length + 1,
      name: random.toString(),
      email: `${random}@gology.com`,
      gender: random % 2 === 0 ? 'female' : 'male',
      address: {
        street: `${random}th Street`,
        city: `${random}th City`,
      },
      phone: "+1 (814) 496-3905",
    }
    setDataSource([...dataSource, newItem]);
  }

  const onEditPerson = ({id}: any) => {
    console.log(id);
  }

  return (
    <div className="app">
      <Button onClick={onAddPerson} type="primary" style={{margin: 20}}>Add Person</Button>
      <Table bordered rowKey="id" columns={columns} dataSource={dataSource} />
    </div>
  );
}

export default App;
