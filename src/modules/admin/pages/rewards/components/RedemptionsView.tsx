import React from "react";
import { Check, X } from "lucide-react";
import type { ColumnDef } from "../../../../../global/components/resuable-components/table";
import ResuableTable from "../../../../../global/components/resuable-components/table";

const REDEMPTION_REQUESTS = [
  {
    id: 1,
    user: "Hotel Grand",
    amount: "₹500",
    points: "5,000",
    date: "Dec 20",
    status: "Pending",
  },
  {
    id: 2,
    user: "Restaurant X",
    amount: "₹300",
    points: "3,000",
    date: "Dec 19",
    status: "Approved",
  },
  {
    id: 3,
    user: "Travel Agency",
    amount: "₹1,200",
    points: "12,000",
    date: "Dec 18",
    status: "Pending",
  },
  {
    id: 4,
    user: "Spa Retreat",
    amount: "₹800",
    points: "8,000",
    date: "Dec 17",
    status: "Rejected",
  },
  {
    id: 5,
    user: "Online Bookstore",
    amount: "₹150",
    points: "1,500",
    date: "Dec 16",
    status: "Approved",
  },
];

const redemptionColumns: ColumnDef[] = [
  { name: "# ID", uid: "id", sortable: true },
  { name: "USER/ENTITY", uid: "user", sortable: true },
  { name: "AMOUNT", uid: "amount", sortable: true },
  { name: "POINTS", uid: "points", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions", sortable: false },
];

const RedemptionsView: React.FC = () => {
  const renderRedemptionCell = (req: any, columnKey: React.Key) => {
    const value = req[columnKey as string];
    switch (columnKey) {
      case "user":
        return <span className="font-bold text-slate-800">{value}</span>;
      case "amount":
        return <span className="font-bold text-emerald-600">{value}</span>;
      case "status":
        return (
          <span
            className={`px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-wider
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
            <button className="p-1.5 bg-blue-50 text-blue-600 rounded-sm hover:bg-blue-600 hover:text-white transition-all shadow-sm">
              <Check size={14} />
            </button>
            <button className="p-1.5 bg-red-50 text-red-600 rounded-sm hover:bg-red-600 hover:text-white transition-all shadow-sm">
              <X size={14} />
            </button>
          </div>
        );
      default:
        return <span className="text-slate-500 font-medium">{value}</span>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-10">
      <div className="lg:col-span-3 space-y-8">
        <ResuableTable
          data={REDEMPTION_REQUESTS}
          columns={redemptionColumns}
          renderCell={renderRedemptionCell}
          title="Redemption Requests"
          description="Manage pending and processed redemptions"
        />
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-sm border border-slate-200 p-8 shadow-sm text-start">
          <h4 className="font-black text-slate-900 text-lg tracking-tight mb-8 uppercase">
            Redemption Stats
          </h4>

          <div className="space-y-8">
            <StatMiniCard
              label="This Month"
              value="₹25,000"
              sub="Approved value"
            />
            <StatMiniCard
              label="Pending"
              value="12 Requests"
              sub="Awaiting review"
            />
            <StatMiniCard
              label="Avg Time"
              value="2.5 Hours"
              sub="Processing speed"
            />
          </div>

          <div className="mt-12 space-y-3">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">
              Bulk Actions
            </p>
            <button className="w-full py-3 bg-hf-green text-white font-black text-[11px] uppercase tracking-widest rounded-sm hover:bg-emerald-600 transition-all shadow-lg active:scale-95">
              Approve All
            </button>
            <button className="w-full py-3 bg-white border border-slate-200 text-slate-400 font-black text-[11px] uppercase tracking-widest rounded-sm hover:bg-slate-50 transition-all active:scale-95">
              Reject All
            </button>
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
    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
      {label}
    </p>
    <h5 className="text-2xl font-black text-slate-900 group-hover:text-hf-green transition-colors tracking-tight">
      {value}
    </h5>
    <p className="text-[11px] font-bold text-slate-400">{sub}</p>
  </div>
);

export default RedemptionsView;
