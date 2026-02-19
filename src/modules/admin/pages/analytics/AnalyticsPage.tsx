import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { Leaf, TrendingUp, Users, Building2, Heart } from "lucide-react";

import { ImpactCards } from "../../../../global/components/resuable-components/ImpactCards";

// Weekly donation trends - mock data for UI
const donationTrends = [
  { day: "Mon", donations: 12, distributed: 10 },
  { day: "Tue", donations: 18, distributed: 15 },
  { day: "Wed", donations: 15, distributed: 14 },
  { day: "Thu", donations: 22, distributed: 20 },
  { day: "Fri", donations: 28, distributed: 25 },
  { day: "Sat", donations: 35, distributed: 32 },
  { day: "Sun", donations: 20, distributed: 18 },
];

// Donation categories distribution - mock data for UI
const categoryData = [
  { name: "Cooked Food", value: 40, color: "#22c55e" },
  { name: "Fresh Produce", value: 25, color: "#3b82f6" },
  { name: "Packaged Items", value: 20, color: "#f59e0b" },
  { name: "Beverages", value: 15, color: "#8b5cf6" },
];

const AnalyticsPage: React.FC = () => {
  const impactMetrics = [
    {
      label: "Total Donations",
      val: "1,248",
      trend: "+18% from last month",
      color: "bg-[#22c55e]",
    },
    {
      label: "Meals Distributed",
      val: "8,420",
      trend: "Across 24 NGOs",
      color: "bg-emerald-500",
    },
    {
      label: "Active Volunteers",
      val: "156",
      trend: "+12 this week",
      color: "bg-blue-500",
    },
    {
      label: "Partner NGOs",
      val: "24",
      trend: "3 pending approval",
      color: "bg-amber-500",
    },
  ];

  return (
    <div
      className="p-4 sm:p-6 lg:p-8 w-full mx-auto space-y-8 md:space-y-10 animate-in fade-in duration-700 text-start min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-4">
        <div className="text-start max-w-2xl">
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Impact Analytics
          </h1>
          <p
            className="font-medium mt-2 text-sm sm:text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Track donations, distribution, and community impact metrics.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <div
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-sm border w-fit"
            style={{
              backgroundColor: "rgba(34, 197, 94, 0.05)",
              borderColor: "rgba(34, 197, 94, 0.1)",
            }}
          >
            <Leaf size={18} className="text-[#22c55e]" />
            <span className="text-sm font-black text-hf-green uppercase tracking-tight">
              95% Distribution Rate
            </span>
          </div>
        </div>
      </header>

      {/* Impact Grid */}
      <div className="text-start">
        <ImpactCards data={impactMetrics} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-start">
        {/* Main Graph - Donation Trends */}
        <div
          className="lg:col-span-8 p-4 sm:p-6 rounded-sm border shadow-sm"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={20} className="text-[#22c55e]" />
                <h3
                  className="font-black text-xl tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  Donation Flow
                </h3>
              </div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Weekly comparison of donations received vs. distributed
              </p>
            </div>
          </div>
          <div className="h-[300px] sm:h-[350px] lg:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={donationTrends}>
                <defs>
                  <linearGradient
                    id="colorDonations"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorDistributed"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border-color)"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "var(--text-muted)",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "var(--text-muted)",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-primary)",
                    borderRadius: "4px",
                    border: "1px solid var(--border-color)",
                    boxShadow: "var(--shadow-lg)",
                    padding: "12px",
                  }}
                  itemStyle={{
                    fontSize: "10px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                  }}
                  labelStyle={{
                    color: "var(--text-primary)",
                    fontWeight: "900",
                    marginBottom: "4px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="donations"
                  stroke="#22c55e"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorDonations)"
                  name="Donations Received"
                />
                <Area
                  type="monotone"
                  dataKey="distributed"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorDistributed)"
                  name="Distributed"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Bar Chart */}
        <div
          className="lg:col-span-4 p-4 sm:p-6 rounded-sm border shadow-sm flex flex-col"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Heart size={20} className="text-amber-500" />
            <h3
              className="font-black text-xl tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Food Categories
            </h3>
          </div>
          <p
            className="text-sm font-medium mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            Distribution of donation types this month
          </p>

          <div className="flex-grow flex items-end h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "var(--text-secondary)",
                    fontWeight: 800,
                    fontSize: 11,
                  }}
                  width={85}
                />
                <Tooltip
                  cursor={{ fill: "var(--bg-secondary)", opacity: 0.4 }}
                  contentStyle={{
                    backgroundColor: "var(--bg-primary)",
                    borderRadius: "4px",
                    border: "1px solid var(--border-color)",
                    boxShadow: "var(--shadow-lg)",
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div
              className="p-4 rounded-sm border shadow-sm"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Users size={14} className="text-blue-500" />
                <span
                  className="text-[9px] font-black uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  Volunteers
                </span>
              </div>
              <p
                className="text-lg font-black"
                style={{ color: "var(--text-primary)" }}
              >
                156
              </p>
            </div>
            <div
              className="p-4 rounded-sm border shadow-sm"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Building2 size={14} className="text-amber-500" />
                <span
                  className="text-[9px] font-black uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  NGOs
                </span>
              </div>
              <p
                className="text-lg font-black"
                style={{ color: "var(--text-primary)" }}
              >
                24
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
