"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function LineChart() {
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  const data = {
    labels,
    datasets: [
      {
        label: "Donations",
        data: [35, 35, 45, 55, 65, 75, 85],
        backgroundColor: ["rgb(233, 119, 90)"],
        borderColor: "rgb(233, 119, 90)",
        tension: 0.1,
      },
      {
        label: "Pickups",
        data: [25, 20, 35, 40, 40, 55, 45],
        backgroundColor: ["rgb(42, 157, 144)"],
        borderColor: "rgb(42, 157, 144)",
        tension: 0.1,
      },
    ],
  };

  return <Line data={data} />;
}
