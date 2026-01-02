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
import { Leaf, AlertTriangle } from "lucide-react";

import { ImpactCards } from "../../../../global/components/resuable-components/ImpactCards";

const wasteData = [
  { day: "Mon", rescued: 450, wasted: 45 },
  { day: "Tue", rescued: 520, wasted: 30 },
  { day: "Wed", rescued: 480, wasted: 60 },
  { day: "Thu", rescued: 610, wasted: 25 },
  { day: "Fri", rescued: 750, wasted: 40 },
  { day: "Sat", rescued: 820, wasted: 15 },
  { day: "Sun", rescued: 900, wasted: 10 },
];

const categoryData = [
  { name: "Produce", value: 45, color: "#22c55e" },
  { name: "Dairy", value: 25, color: "#3b82f6" },
  { name: "Prepared", value: 20, color: "#f59e0b" },
  { name: "Bakery", value: 10, color: "#8b5cf6" },
];

const AnalyticsPage: React.FC = () => {
  const impactMetrics = [
    {
      label: "Meals Provided",
      val: "12,482",
      trend: "+15.2% from last month",
      color: "bg-[#22c55e]",
    },
    {
      label: "CO2 Offset (kg)",
      val: "4,120.5",
      trend: "Equivalent to 182 trees",
      color: "bg-blue-500",
    },
    {
      label: "Wastage Rate",
      val: "4.2%",
      trend: "-2.1% improvement",
      color: "bg-[#22c55e]",
    },
  ];

  return (
    <div className="p-10 w-full mx-auto space-y-10 animate-in fade-in duration-700">
      <header className="flex justify-between items-end">
        <div className="text-start">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Food Rescue Intelligence
          </h1>
          <p className="text-slate-500 font-semibold mt-2">
            Monitoring waste diversion and environmental impact metrics.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-[#ecfdf5] px-4 py-2 rounded-2xl border border-[#d1fae5]">
            <Leaf size={18} className="text-[#22c55e]" />
            <span className="text-sm font-black text-[#16a34a]">
              92% DIVERTED
            </span>
          </div>
        </div>
      </header>

      {/* Impact Grid */}
      <div className="text-start">
        <ImpactCards data={impactMetrics} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-start">
        {/* Main Graph */}
        <div className="lg:col-span-8 bg-white p-6 rounded-sm border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-black text-slate-900 text-xl tracking-tight">
                Rescue Velocity
              </h3>
              <p className="text-sm text-slate-400 font-medium">
                Daily comparison of rescued vs. wasted inventory (kg)
              </p>
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={wasteData}>
                <defs>
                  <linearGradient id="colorRescued" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                    padding: "16px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="rescued"
                  stroke="#22c55e"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorRescued)"
                  name="Rescued (kg)"
                />
                <Area
                  type="monotone"
                  dataKey="wasted"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  fill="transparent"
                  name="Wasted (kg)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Bar Chart */}
        <div className="lg:col-span-4 bg-white p-6 rounded-sm border border-gray-200 shadow-sm flex flex-col">
          <h3 className="font-black text-slate-900 text-xl tracking-tight mb-2">
            Loss by Category
          </h3>
          <p className="text-sm text-slate-400 font-medium mb-8">
            Percentage of total wastage per food group
          </p>

          <div className="flex-grow flex items-end h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#475569", fontWeight: 800, fontSize: 11 }}
                  width={80}
                />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 p-6 bg-slate-900 rounded-sm text-white">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={18} className="text-amber-400" />
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                Optimization Alert
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Produce loss is 15% higher in the Northern District. Consider
              re-routing cold-chain transport by 2 hours earlier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
