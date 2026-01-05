import React, { useState } from "react";
import {
  Check,
  X,
  Filter,
  Eye,
  DollarSign,
  Plane,
  Sparkles,
  Sprout,
} from "lucide-react";
import type { ColumnDef } from "../../../../../global/components/resuable-components/table";
import ResuableTable from "../../../../../global/components/resuable-components/table";
import ResuableButton from "../../../../../global/components/resuable-components/button";

const REDEMPTION_REQUESTS = [
  {
    id: "REQ-001",
    user: "Hotel Grand",
    role: "Donor",
    item: "Mega Cash Prize",
    category: "Cash",
    amount: "₹10,000",
    points: "10,000",
    date: "Dec 20, 2024",
    status: "Pending",
  },
  {
    id: "REQ-002",
    user: "Skyline NGO",
    role: "NGO",
    item: "Operations Grant",
    category: "Cash",
    amount: "₹5,000",
    points: "5,000",
    date: "Dec 19, 2024",
    status: "Approved",
  },
  {
    id: "REQ-003",
    user: "Amit Sharma",
    role: "Volunteer",
    item: "Goa Beach Trip",
    category: "Tours",
    amount: "Package",
    points: "12,000",
    date: "Dec 18, 2024",
    status: "Pending",
  },
  {
    id: "REQ-004",
    user: "Tech Sol",
    role: "Donor",
    item: "Gaming Console",
    category: "Youth",
    amount: "PS5",
    points: "18,000",
    date: "Dec 17, 2024",
    status: "Rejected",
  },
  {
    id: "REQ-005",
    user: "Green Earth",
    role: "Volunteer",
    item: "Plant 10 Trees",
    category: "Trees",
    amount: "Impact",
    points: "1,000",
    date: "Dec 16, 2024",
    status: "Approved",
  },
];

const redemptionColumns: ColumnDef[] = [
  { name: "REQ ID", uid: "id", sortable: true },
  { name: "USER/ENTITY", uid: "user", sortable: true },
  { name: "CATEGORY", uid: "category", sortable: true },
  { name: "REWARD ITEM", uid: "item", sortable: true },
  { name: "VALUE", uid: "amount", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions", sortable: false },
];

const RedemptionsView: React.FC = () => {
  const [filter, setFilter] = useState("All");

  const renderRedemptionCell = (req: any, columnKey: React.Key) => {
    const value = req[columnKey as string];
    switch (columnKey) {
      case "id":
        return (
          <span className="font-black text-slate-400 text-[10px] tracking-widest">
            {value}
          </span>
        );
      case "user":
        return (
          <div className="flex flex-col text-start">
            <span
              className="font-black leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {value}
            </span>
            <span
              className="text-[9px] font-black uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              {req.role}
            </span>
          </div>
        );
      case "category":
        return (
          <div className="flex items-center gap-2">
            {req.category === "Cash" && (
              <DollarSign size={12} className="text-emerald-500" />
            )}
            {req.category === "Tours" && (
              <Plane size={12} className="text-blue-500" />
            )}
            {req.category === "Youth" && (
              <Sparkles size={12} className="text-purple-500" />
            )}
            {req.category === "Trees" && (
              <Sprout size={12} className="text-emerald-600" />
            )}
            <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">
              {value}
            </span>
          </div>
        );
      case "status":
        return (
          <span
            className={`px-3 py-1 rounded-sm text-[9px] font-black uppercase tracking-wider
            ${
              req.status === "Pending"
                ? "bg-amber-50 text-amber-600 border border-amber-100"
                : ""
            }
            ${
              req.status === "Approved"
                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                : ""
            }
            ${
              req.status === "Rejected"
                ? "bg-red-50 text-red-600 border border-red-100"
                : ""
            }
          `}
          >
            {req.status}
          </span>
        );
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <ResuableButton
              variant="ghost"
              onClick={() => console.log("View", req.id)}
              className="!p-1.5 !bg-slate-50 !text-slate-600 hover:!bg-slate-900 hover:!text-white !min-w-0"
            >
              <Eye size={14} />
            </ResuableButton>
            {req.status === "Pending" && (
              <>
                <ResuableButton
                  variant="ghost"
                  onClick={() => console.log("Approve", req.id)}
                  className="!p-1.5 !bg-emerald-50 !text-emerald-600 hover:!bg-emerald-600 hover:!text-white !min-w-0"
                >
                  <Check size={14} />
                </ResuableButton>
                <ResuableButton
                  variant="ghost"
                  onClick={() => console.log("Reject", req.id)}
                  className="!p-1.5 !bg-red-50 !text-red-600 hover:!bg-red-600 hover:!text-white !min-w-0"
                >
                  <X size={14} />
                </ResuableButton>
              </>
            )}
          </div>
        );
      default:
        return (
          <span className="text-slate-500 font-bold text-xs">{value}</span>
        );
    }
  };

  const categories = ["All", "Cash", "Tours", "Youth", "Trees"];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 pb-10">
      <div className="xl:col-span-3 space-y-8">
        {/* Filters */}
        <div
          className="p-4 border rounded-sm flex flex-wrap items-center justify-between gap-4"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
              Filter By Category:
            </span>
          </div>
          <div className="flex gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === c
                    ? "bg-slate-900 text-white"
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <ResuableTable
          data={
            filter === "All"
              ? REDEMPTION_REQUESTS
              : REDEMPTION_REQUESTS.filter((r) => r.category === filter)
          }
          columns={redemptionColumns}
          renderCell={renderRedemptionCell}
          title="ULTRA Redemptions"
          description="Manage pending and processed reward requests"
        />
      </div>

      <div className="space-y-6">
        <div
          className="rounded-sm border p-8 shadow-sm text-start overflow-hidden relative"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-full -mr-16 -mt-16 z-0" />
          <div className="relative z-10">
            <h4
              className="font-black text-lg tracking-tight mb-8 uppercase"
              style={{ color: "var(--text-primary)" }}
            >
              Payout Summary
            </h4>

            <div className="space-y-8">
              <StatMiniCard
                label="Total Approved"
                value="₹1,45,000"
                sub="Cumulative payouts"
              />
              <StatMiniCard
                label="Pending Grants"
                value="12 Requests"
                sub="Awaiting review"
              />
              <StatMiniCard
                label="System Health"
                value="Optimal"
                sub="Processing at 100%"
              />
            </div>

            <div className="mt-12 space-y-3">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">
                Batch Processing
              </p>
              <ResuableButton
                variant="dark"
                onClick={() => console.log("Approve All")}
                className="w-full !bg-emerald-600 hover:!bg-emerald-700 font-black uppercase tracking-widest"
              >
                Approve All Pending
              </ResuableButton>
              <ResuableButton
                variant="ghost"
                onClick={() => console.log("Export")}
                className="w-full font-black uppercase tracking-widest text-[10px]"
              >
                Export Report (.CSV)
              </ResuableButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatMiniCard: React.FC<{ label: string; value: string; sub: string }> = ({
  label,
  value,
  sub,
}) => (
  <div className="group cursor-default">
    <p
      className="text-[9px] font-black uppercase tracking-widest mb-1"
      style={{ color: "var(--text-muted)" }}
    >
      {label}
    </p>
    <h5
      className="text-3xl font-black group-hover:text-emerald-500 transition-colors tracking-tighter"
      style={{ color: "var(--text-primary)" }}
    >
      {value}
    </h5>
    <p className="text-[10px] font-bold text-slate-300 uppercase italic tracking-tight">
      {sub}
    </p>
  </div>
);

export default RedemptionsView;
