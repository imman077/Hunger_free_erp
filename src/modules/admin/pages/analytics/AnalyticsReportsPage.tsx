import React from "react";
import { Download, Package } from "lucide-react";

import ReusableTable, {
  type ColumnDef,
} from "../../../../global/components/resuable-components/table";

// Donation distribution logs - mock data for UI
const donationLogs = [
  {
    id: "DON-2024-001",
    donor: "Chettinad Enterprises",
    ngo: "Anna Dhanam Trust",
    category: "Cooked Food",
    quantity: "50 meals",
    date: "Jan 22, 2024",
    status: "Delivered",
  },
  {
    id: "DON-2024-002",
    donor: "Hotel Saravana Bhavan",
    ngo: "Hunger Free Foundation",
    category: "Cooked Food",
    quantity: "120 meals",
    date: "Jan 21, 2024",
    status: "In Transit",
  },
  {
    id: "DON-2024-003",
    donor: "Fresh Farms Pvt Ltd",
    ngo: "Food For All NGO",
    category: "Fresh Produce",
    quantity: "75 kg",
    date: "Jan 21, 2024",
    status: "Delivered",
  },
  {
    id: "DON-2024-004",
    donor: "Reliance Fresh Store",
    ngo: "Akshaya Patra Foundation",
    category: "Packaged Items",
    quantity: "200 units",
    date: "Jan 20, 2024",
    status: "Delivered",
  },
  {
    id: "DON-2024-005",
    donor: "Chennai Caterers",
    ngo: "Robin Hood Army",
    category: "Cooked Food",
    quantity: "85 meals",
    date: "Jan 20, 2024",
    status: "Pending Pickup",
  },
  {
    id: "DON-2024-006",
    donor: "Aavin Dairy Outlet",
    ngo: "Feeding India",
    category: "Beverages",
    quantity: "100 liters",
    date: "Jan 19, 2024",
    status: "Delivered",
  },
];

const columns: ColumnDef[] = [
  { name: "DONATION ID", uid: "id", sortable: true, align: "start" },
  { name: "DONOR", uid: "donor", sortable: true, align: "start" },
  { name: "RECEIVING NGO", uid: "ngo", sortable: true, align: "start" },
  { name: "CATEGORY", uid: "category", sortable: true, align: "center" },
  { name: "QUANTITY", uid: "quantity", sortable: true, align: "center" },
  { name: "STATUS", uid: "status", sortable: true, align: "center" },
];

const AnalyticsReportsPage: React.FC = () => {
  const [dateFilter, setDateFilter] = React.useState<{
    start: string | null;
    end: string | null;
  }>({ start: null, end: null });

  const filteredLogs = React.useMemo(() => {
    return donationLogs.filter((log) => {
      const logDate = new Date(log.date + "T00:00:00");
      const start = dateFilter.start
        ? new Date(dateFilter.start + "T00:00:00")
        : null;
      const end = dateFilter.end
        ? new Date(dateFilter.end + "T00:00:00")
        : null;

      const matchesDate =
        (!start || logDate >= start) && (!end || logDate <= end);

      return matchesDate;
    });
  }, [dateFilter]);

  const renderCell = React.useCallback((log: any, columnKey: React.Key) => {
    const cellValue = log[columnKey as string];

    switch (columnKey) {
      case "id":
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
              <Package size={16} />
            </div>
            <span className="font-black text-slate-800 text-sm tracking-tight">
              {log.id}
            </span>
          </div>
        );
      case "donor":
        return (
          <div className="flex items-center gap-2 px-2 py-1 rounded-sm bg-amber-50 border border-amber-200 hover:border-amber-400 transition-all cursor-pointer group w-fit min-w-0">
            <div className="w-5 h-5 rounded-sm flex items-center justify-center text-[9px] font-bold text-white bg-amber-500 shadow-sm shrink-0">
              {log.donor
                .split(" ")
                .map((n: string) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <span className="font-bold text-xs whitespace-nowrap truncate max-w-[140px] pr-1 group-hover:text-amber-700 transition-colors text-amber-700">
              {log.donor}
            </span>
          </div>
        );
      case "ngo":
        return (
          <div className="flex items-center gap-2 px-2 py-1 rounded-sm bg-emerald-50 border border-emerald-200 hover:border-hf-green transition-all cursor-pointer group w-fit min-w-0">
            <div className="w-5 h-5 rounded-sm flex items-center justify-center text-[9px] font-bold text-white bg-hf-green shadow-sm shrink-0">
              {log.ngo
                .split(" ")
                .map((n: string) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <span
              className="font-bold text-xs whitespace-nowrap truncate max-w-[140px] pr-1 group-hover:text-hf-green transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              {log.ngo}
            </span>
          </div>
        );
      case "category":
        return (
          <span className="px-2 py-0.5 bg-slate-50 rounded-sm text-[9px] font-bold text-slate-500 uppercase tracking-widest border border-slate-200/50 whitespace-nowrap">
            {log.category}
          </span>
        );
      case "quantity":
        return (
          <span className="font-black text-slate-700 text-sm">
            {log.quantity}
          </span>
        );
      case "status":
        return (
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm border border-slate-100 bg-slate-50/50 w-fit">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  log.status === "Delivered"
                    ? "bg-emerald-500"
                    : log.status === "In Transit"
                      ? "bg-blue-500"
                      : "bg-amber-500"
                }`}
              />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {log.status}
              </span>
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="p-8 w-full mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-700 text-start">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1
            className="text-4xl font-black tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Distribution Logs
          </h1>
          <p className="text-slate-500 font-semibold mt-2">
            Track all donation pickups and deliveries to partner NGOs.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-sm font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 hover:scale-105 transition-all">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </header>

      {/* Distribution Logs Table */}
      <ReusableTable
        data={filteredLogs}
        columns={columns}
        renderCell={renderCell}
        title="Donation Distribution Ledger"
        description="Complete history of donations from Donors to NGOs"
        enableDateFilter={true}
        onDateRangeChange={(range) => {
          setDateFilter(range || { start: null, end: null });
        }}
      />
    </div>
  );
};

export default AnalyticsReportsPage;
