"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChart() {
  const labels = ["Donor", "NGO", "Volunteers"];

  const data = {
    labels,
    datasets: [
      {
        label: "Sign-ups",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: ["rgb(231, 85, 49)"],
        borderColor: ["rgb(231, 85, 49)"],
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
}
