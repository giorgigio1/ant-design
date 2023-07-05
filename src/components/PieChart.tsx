import { Pie } from "@ant-design/plots";
import { Person } from "../types";
import { useLocation, useNavigate } from "react-router-dom";

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
      <button
        onClick={() => navigate(-1)}
        style={{
          margin: 20,
          padding: 10,
          borderRadius: 6,
          border: "none",
          backgroundColor: "#1677ff",
          color: "white",
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        BACK TO TABLE
      </button>
    </>
  );
};

export default PieChart;
