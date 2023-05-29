import './App.css';
import { useState } from 'react';
import { Table } from 'antd';

interface dataSourceProps {
  id: number;
  key: string;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

interface columnProps {
  title: string;
  dataIndex: string;
  key: string;
}

function App() {
  const [dataSource, setDataSource] = useState([
    {
      "id": 10,
      "name": "Vilma Jefferson",
      "email": "vilmajefferson@gology.com",
      "gender": "female",
      "address": {
        "street": "Bath Avenue",
        "city": "New York"
      },
      "phone": "+1 (814) 496-3905"
    },
    {
      "id": 11,
      "name": "Cassandra Nguyen",
      "email": "cassandranguyen@gology.com",
      "gender": "female",
      "address": {
        "street": "Hamilton Avenue",
        "city": "Chicago"
      },
      "phone": "+1 (946) 426-2243"
    },
    {
      "id": 12,
      "name": "Lenora Clements",
      "email": "lenoraclements@gology.com",
      "gender": "female",
      "address": {
        "street": "Seba Avenue",
        "city": "San Diego"
      },
      "phone": "+1 (838) 598-2355"
    },
    {
      "id": 13,
      "name": "Hanson Goodwin",
      "email": "hansongoodwin@gology.com",
      "gender": "male",
      "address": {
        "street": "Cranberry Street",
        "city": "New York"
      },
      "phone": "+1 (947) 576-2508"
    },
  ]);

  const columns = [
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
      title: "Email",
      key: 3,
      dataIndex: "email",
    },
    {
      title: "Gender",
      key: 4,
      dataIndex: "gender",
    },
    {
      title: "Steet",
      key: 5,
      dataIndex: "address",
      render: ({street}:any) => street
    },
    {
      title: "City",
      key: 6,
      dataIndex: "city",
    },
    {
      title: "Phone",
      key: 7,
      dataIndex: "phone",
    },
  ]

  return (
    <div className="app">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default App;
