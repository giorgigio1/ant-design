import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PieChart from "../components/PieChart";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/chart", element: <PieChart /> },
]);

export default router;
