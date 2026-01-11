import React from "react";
import {
  Gem,
  Wallet,
  Users,
  BarChart,
  Settings,
  RotateCcw,
  Plus,
} from "lucide-react";
import { Button } from "@heroui/react";

import type { ColumnDef } from "../../../../../global/components/resuable-components/table";
import ReusableTable from "../../../../../global/components/resuable-components/table";
import { StatCardGrid } from "../../../../../global/components/resuable-components/cards";
import ResuableInput from "../../../../../global/components/resuable-components/input";
import ResuableButton from "../../../../../global/components/resuable-components/button";

const TIERS = [
  {
    name: "Beginner",
    range: "0 - 500",
    bonus: "0%",
    perks: "Basic Badge, Entry Level Perks",
  },
  {
    name: "Bronze",
    range: "501 - 1,500",
    bonus: "5%",
    perks: "Bronze Badge, Monthly Raffle Entry",
  },
  {
    name: "Silver",
    range: "1,501 - 3,500",
    bonus: "10%",
    perks: "Silver Badge, Priority Support",
  },
  {
    name: "Gold",
    range: "3,501 - 7,500",
    bonus: "15%",
    perks: "Gold Badge, Event Invites",
  },
  {
    name: "Platinum",
    range: "7,501 - 15,000",
    bonus: "20%",
    perks: "Platinum Badge, Exclusive Gear",
  },
  {
    name: "Diamond",
    range: "15,001 - 30,000",
    bonus: "25%",
    perks: "Diamond Badge, Feature Profile",
  },
  {
    name: "Legend",
    range: "30,001+",
    bonus: "40%",
    perks: "Legend Badge, All-Access Pass, 10 Trees/mo",
  },
];

const tierColumns: ColumnDef[] = [
  { name: "TIER NAME", uid: "name", sortable: true, align: "start" },
  { name: "POINT RANGE", uid: "range", sortable: true },
  { name: "EARNING BONUS", uid: "bonus", sortable: true },
  { name: "PERKS", uid: "perks", sortable: false },
];

const PointsTiersView: React.FC = () => {
  const stats = [
    {
      title: "Active Points Hub",
      value: "8.4M",
      change: "+15%",
      changeType: "positive" as const,
      icon: <Gem size={20} />,
    },
    {
      title: "Reward Value Dist.",
      value: "₹4.2L",
      change: "+22%",
      changeType: "positive" as const,
      icon: <Wallet size={20} />,
    },
    {
      title: "Redemption Rate",
      value: "68%",
      change: "+5%",
      changeType: "positive" as const,
      icon: <Users size={20} />,
    },
    {
      title: "Global Multiplier",
      value: "3.0X",
      change: "Active",
      changeType: "positive" as const,
      icon: <BarChart size={20} />,
    },
  ];

  const renderTierCell = (tier: any, columnKey: React.Key) => {
    const value = tier[columnKey as string];
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 w-fit min-w-0">
            <div
              className={`w-2 h-2 rounded-full shrink-0 ${
                tier.name === "Legend"
                  ? "bg-emerald-500 animate-pulse"
                  : tier.name === "Platinum" || tier.name === "Diamond"
                  ? "bg-blue-500"
                  : "bg-slate-400"
              }`}
            />
            <span
              className="font-bold text-[11px] whitespace-nowrap truncate max-w-[140px] pr-1"
              style={{ color: "var(--text-primary)" }}
            >
              {tier.name}
            </span>
          </div>
        );
      case "bonus":
        return (
          <span className="font-bold text-hf-green text-xs tabular-nums">
            {value}
          </span>
        );
      default:
        return (
          <span className="text-slate-500 font-bold text-[11px] whitespace-nowrap px-1">
            {value}
          </span>
        );
    }
  };

  return (
    <div className="space-y-10 pb-10">
      <div className="flex items-center justify-between w-full">
        <div>
          <h2
            className="text-2xl font-black tracking-tight uppercase"
            style={{ color: "var(--text-primary)" }}
          >
            Points & Tiers Configuration
          </h2>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">
            Configure the 7-tier ULTRA system and reward multipliers
          </p>
        </div>
        <Button
          color="primary"
          className="bg-hf-green text-white rounded-sm h-10 px-6 font-bold hover:bg-emerald-600 transition-all active:scale-95"
          style={{ backgroundColor: "#22c55e", color: "white" }}
          endContent={<Plus size={18} />}
          onPress={() => console.log("Add New Tier")}
        >
          Add New Tier
        </Button>
      </div>

      <StatCardGrid cards={stats} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* Tier Management Table */}
        <div className="space-y-6">
          <ReusableTable
            data={TIERS}
            columns={tierColumns}
            renderCell={renderTierCell}
            title="Operational Tiers"
            description="Manage the 7-tier ULTRA system thresholds"
          />
        </div>

        {/* Configuration Section */}
        <div
          className="rounded-sm border p-8"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-900 rounded-sm">
                <Settings className="text-white" size={18} />
              </div>
              <h4
                className="text-xl font-black tracking-tight uppercase"
                style={{ color: "var(--text-primary)" }}
              >
                Ultra Reward Base Rates
              </h4>
            </div>
            <button className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 hover:text-slate-900">
              <RotateCcw size={12} /> Reset Defaults
            </button>
          </div>

          <div className="space-y-10">
            {/* Donor Points */}
            <div className="space-y-6">
              <div
                className="flex items-center gap-2 pb-2"
                style={{ borderBottom: "1px solid var(--border-color)" }}
              >
                <span className="w-2 h-6 bg-blue-500 rounded-sm" />
                <h5
                  className="font-black text-xs uppercase tracking-widest"
                  style={{ color: "var(--text-primary)" }}
                >
                  Donors (3X Base)
                </h5>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <ResuableInput
                  label="First Donation"
                  value="300"
                  onChange={() => {}}
                  align="left"
                />
                <ResuableInput
                  label="Per KG Food"
                  value="25"
                  onChange={() => {}}
                  align="left"
                />
                <ResuableInput
                  label="Milestone Bonus"
                  value="600"
                  onChange={() => {}}
                  align="left"
                />
              </div>
            </div>

            {/* Volunteer Points */}
            <div className="space-y-6">
              <div
                className="flex items-center gap-2 pb-2"
                style={{ borderBottom: "1px solid var(--border-color)" }}
              >
                <span className="w-2 h-6 bg-emerald-500 rounded-sm" />
                <h5
                  className="font-black text-xs uppercase tracking-widest"
                  style={{ color: "var(--text-primary)" }}
                >
                  Volunteers (3X Base)
                </h5>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <ResuableInput
                  label="Per Delivery"
                  value="150"
                  onChange={() => {}}
                  align="left"
                />
                <ResuableInput
                  label="Weekly Streak"
                  value="500"
                  onChange={() => {}}
                  align="left"
                />
                <ResuableInput
                  label="Emergency Bonus"
                  value="1000"
                  onChange={() => {}}
                  align="left"
                />
              </div>
            </div>

            {/* NGO Points */}
            <div className="space-y-6">
              <div
                className="flex items-center gap-2 pb-2"
                style={{ borderBottom: "1px solid var(--border-color)" }}
              >
                <span className="w-2 h-6 bg-amber-500 rounded-sm" />
                <h5
                  className="font-black text-xs uppercase tracking-widest"
                  style={{ color: "var(--text-primary)" }}
                >
                  NGOs (Fixed Rate)
                </h5>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <ResuableInput
                  label="Accept Request"
                  value="50"
                  onChange={() => {}}
                  align="left"
                />
                <ResuableInput
                  label="Waste Managed"
                  value="10/kg"
                  onChange={() => {}}
                  align="left"
                />
                <ResuableInput
                  label="Impact Report"
                  value="500"
                  onChange={() => {}}
                  align="left"
                />
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-end">
            <ResuableButton
              variant="dark"
              onClick={() => console.log("Save Configuration")}
              className="w-full sm:w-auto !bg-slate-900 hover:!bg-black px-12"
            >
              Update Ecosystem Rates
            </ResuableButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsTiersView;
