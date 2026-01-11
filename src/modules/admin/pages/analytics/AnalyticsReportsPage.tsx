import React from "react";
import { Download, FileText } from "lucide-react";

import ReusableTable, {
  type ColumnDef,
} from "../../../../global/components/resuable-components/table";

const reports = [
  {
    id: "WA-2024-001",
    entity: "Whole Foods Market",
    category: "Dairy",
    weight: "24kg",
    reason: "Cold Chain Break",
    date: "Mar 12, 2024",
    status: "Audited",
  },
  {
    id: "WA-2024-002",
    entity: "St. Mary's Food Bank",
    category: "Produce",
    weight: "150kg",
    reason: "Bruising/Damage",
    date: "Mar 11, 2024",
    status: "Pending Review",
  },
  {
    id: "WA-2024-003",
    entity: "Restaurant Depot",
    category: "Meat",
    weight: "12kg",
    reason: "Expiry Date",
    date: "Mar 11, 2024",
    status: "Audited",
  },
  {
    id: "WA-2024-004",
    entity: "Starbucks #442",
    category: "Bakery",
    weight: "8kg",
    reason: "End of Day Surplus",
    date: "Mar 10, 2024",
    status: "Audited",
  },
  {
    id: "WA-2024-005",
    entity: "Green Valley Farm",
    category: "Produce",
    weight: "450kg",
    reason: "Cosmetic Imperfections",
    date: "Mar 09, 2024",
    status: "In Progress",
  },
];

const columns: ColumnDef[] = [
  { name: "REPORT ID", uid: "id", sortable: true },
  { name: "ENTITY", uid: "entity", sortable: true, align: "start" },
  { name: "CATEGORY", uid: "category", sortable: true },
  { name: "LOSS REASON", uid: "reason", sortable: true },
  { name: "IMPACT", uid: "weight", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
];

const AnalyticsReportsPage: React.FC = () => {
  const [dateFilter, setDateFilter] = React.useState<{
    start: string | null;
    end: string | null;
  }>({ start: null, end: null });

  const filteredReports = React.useMemo(() => {
    return reports.filter((report) => {
      const reportDate = new Date(report.date + "T00:00:00");
      const start = dateFilter.start
        ? new Date(dateFilter.start + "T00:00:00")
        : null;
      const end = dateFilter.end
        ? new Date(dateFilter.end + "T00:00:00")
        : null;

      const matchesDate =
        (!start || reportDate >= start) && (!end || reportDate <= end);

      return matchesDate;
    });
  }, [dateFilter]);

  const renderCell = React.useCallback((report: any, columnKey: React.Key) => {
    const cellValue = report[columnKey as string];

    switch (columnKey) {
      case "id":
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
              <FileText size={16} />
            </div>
            <span className="font-black text-slate-800 text-sm tracking-tight">
              {report.id}
            </span>
          </div>
        );
      case "entity":
        return (
          <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-slate-50 border border-slate-200 hover:border-hf-green/50 hover:bg-white transition-all cursor-pointer group w-fit min-w-0">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white bg-slate-400 shadow-sm shrink-0">
              {report.entity
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </div>
            <span
              className="font-bold text-xs whitespace-nowrap truncate max-w-[140px] pr-1 group-hover:text-hf-green transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              {report.entity}
            </span>
          </div>
        );
      case "category":
        return (
          <span className="px-2 py-0.5 bg-slate-50 rounded-full text-[9px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200/50 whitespace-nowrap">
            {report.category}
          </span>
        );
      case "reason":
        return (
          <span className="font-semibold text-slate-500 text-xs whitespace-nowrap truncate max-w-[200px] px-1 block">
            {report.reason}
          </span>
        );
      case "weight":
        return (
          <span className="font-black text-rose-500 text-sm">
            {report.weight}
          </span>
        );
      case "status":
        return (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-slate-100 bg-slate-50/50 w-fit">
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                report.status === "Audited"
                  ? "bg-emerald-500"
                  : report.status === "Pending Review"
                  ? "bg-amber-500"
                  : "bg-blue-500"
              }`}
            />
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">
              {report.status}
            </span>
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
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Waste Audit Logs
          </h1>
          <p className="text-slate-500 font-semibold mt-2">
            Historical data and compliance reporting for food loss.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-sm font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200 hover:scale-105 transition-all">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </header>

      {/* Analytics Reports Table */}
      <ReusableTable
        data={filteredReports}
        columns={columns}
        renderCell={renderCell}
        title="Master Audit Ledger"
        description="Showing all historical food loss and diversion logs"
        enableDateFilter={true}
        onDateRangeChange={(range) => {
          setDateFilter(range || { start: null, end: null });
        }}
      />
    </div>
  );
};

export default AnalyticsReportsPage;
