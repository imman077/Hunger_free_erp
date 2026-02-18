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
  Legend,
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

  return <Line data={data} options={options} />;
}
