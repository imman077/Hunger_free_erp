import React from "react";
import { Gem, Wallet, Users, BarChart, Settings } from "lucide-react";

import type { ColumnDef } from "../../../../../global/components/resuable-components/table";
import ResuableTable from "../../../../../global/components/resuable-components/table";
import { StatCardGrid } from "../../../../../global/components/resuable-components/cards";
import ResuableInput from "../../../../../global/components/resuable-components/input";
import ResuableButton from "../../../../../global/components/resuable-components/button";

const TIERS = [
  {
    name: "Bronze",
    range: "0 - 2,000",
    benefit: "₹500",
    perks: "Basic Badge, Entry Level Perks",
  },
  {
    name: "Silver",
    range: "2,001 - 5,000",
    benefit: "₹1,000",
    perks: "Priority Support, Exclusive Content",
  },
  {
    name: "Gold",
    range: "5,001 - 10,000",
    benefit: "₹2,500",
    perks: "Featured Spot, Premium Access",
  },
];

const tierColumns: ColumnDef[] = [
  { name: "TIER NAME", uid: "name", sortable: true },
  { name: "POINT RANGE", uid: "range", sortable: true },
  { name: "MONTHLY BENEFIT", uid: "benefit", sortable: true },
  { name: "PERKS", uid: "perks", sortable: false },
];

const PointsTiersView: React.FC = () => {
  const stats = [
    {
      title: "Total Points",
      value: "1.2M",
      change: "+12%",
      changeType: "positive" as const,
      icon: <Gem size={20} />,
    },
    {
      title: "Monthly Value",
      value: "₹85,000",
      change: "+5%",
      changeType: "positive" as const,
      icon: <Wallet size={20} />,
    },
    {
      title: "Active Users",
      value: "890",
      change: "+24",
      changeType: "positive" as const,
      icon: <Users size={20} />,
    },
    {
      title: "Avg Points",
      value: "1,350",
      change: "-2%",
      changeType: "negative" as const,
      icon: <BarChart size={20} />,
    },
  ];

  const renderTierCell = (tier: any, columnKey: React.Key) => {
    const value = tier[columnKey as string];
    switch (columnKey) {
      case "name":
        return <span className="font-bold text-slate-800">{value}</span>;
      case "benefit":
        return <span className="font-bold text-hf-green">{value}</span>;
      default:
        return <span className="text-slate-600 font-medium">{value}</span>;
    }
  };

  return (
    <div className="space-y-10 pb-10">
      <StatCardGrid cards={stats} />

      {/* Tier Management Table */}
      <ResuableTable
        data={TIERS}
        columns={tierColumns}
        renderCell={renderTierCell}
        title="Tier Management"
        description="Configure user progression levels and rewards"
        onAddNew={() => console.log("Add New Tier")}
      />

      {/* Configuration Section */}
      <div className="bg-white rounded-sm border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="text-slate-400" size={20} />
          <h4 className="text-xl font-black text-slate-900 tracking-tight text-start">
            Points Configuration
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h5 className="font-bold text-slate-800 border-b border-slate-100 pb-2 text-start">
              Donation Points
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ResuableInput
                label="Prepared Unit"
                value="25"
                onChange={() => {}}
                align="left"
              />
              <ResuableInput
                label="Raw Unit"
                value="15"
                onChange={() => {}}
                align="left"
              />
              <ResuableInput
                label="Packed Unit"
                value="20"
                onChange={() => {}}
                align="left"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h5 className="font-bold text-slate-800 border-b border-slate-100 pb-2 text-start">
              Bonus Points
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ResuableInput
                label="Weekly Streak"
                value="100"
                onChange={() => {}}
                align="left"
              />
              <ResuableInput
                label="Referrals"
                value="500"
                onChange={() => {}}
                align="left"
              />
              <ResuableInput
                label="Emergency"
                value="200"
                onChange={() => {}}
                align="left"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <ResuableButton
            variant="dark"
            onClick={() => console.log("Save Configuration")}
            className="!bg-[#22c55e] hover:!bg-[#16a34a]"
          >
            Save Configuration
          </ResuableButton>
        </div>
      </div>
    </div>
  );
};

export default PointsTiersView;
