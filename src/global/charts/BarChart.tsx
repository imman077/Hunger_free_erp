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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFont: { size: 12, weight: "bold" as const },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
        },
        ticks: {
          font: { size: 10, weight: "bold" as const },
          color: "rgba(156, 163, 175, 0.5)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 10, weight: "bold" as const },
          color: "rgba(156, 163, 175, 0.5)",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
