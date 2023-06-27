import { Pie } from "@ant-design/plots";
import { Person } from "../types";

interface DemoPieProps {
  dataSource: Person[];
}

const PieChart: React.FC<DemoPieProps> = ({ dataSource }) => {
  const allCities = dataSource.map((item) => item.address.city);
  const filteredCities = new Set(allCities);
  const cities = Array.from(filteredCities);

  const data = cities.map((city) => ({
    type: city,
    value: allCities.filter((item) => item === city).length,
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
  return <Pie {...config} />;
};

export default PieChart;
