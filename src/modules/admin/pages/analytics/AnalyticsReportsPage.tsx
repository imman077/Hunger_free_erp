import React from "react";
import { Download, FileText } from "lucide-react";

import ResuableTable, {
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
  { name: "ENTITY", uid: "entity", sortable: true },
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
          <span className="font-bold text-slate-600 text-sm">
            {report.entity}
          </span>
        );
      case "category":
        return (
          <span className="px-4 py-1.5 bg-slate-100 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-200/50">
            {report.category}
          </span>
        );
      case "reason":
        return (
          <span className="font-semibold text-slate-500 text-sm">
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
          <div className="flex items-center justify-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                report.status === "Audited"
                  ? "bg-emerald-500"
                  : report.status === "Pending Review"
                  ? "bg-amber-500"
                  : "bg-emerald-600"
              }`}
            />
            <span className="text-xs font-black text-slate-600 uppercase tracking-wider">
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
      <ResuableTable
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
