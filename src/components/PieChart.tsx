import { Pie } from "@ant-design/plots";
import { Person } from "../types";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/button";

const PieChart: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const allCities = state.map((item: Person) => item.address.city);
  const filteredCities = new Set(allCities);
  const cities = Array.from(filteredCities);

  const data = cities.map((city) => ({
    type: city,
    value: allCities.filter((item: Person) => item === city).length,
  }));

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return (
    <>
      <Pie {...config} />
      <div style={{ textAlign: "center" }}>
        <Button onClick={() => navigate(-1)}> BACK TO TABLE</Button>
      </div>
    </>
  );
};

export default PieChart;
