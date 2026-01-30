import React, { useState } from "react";
import {
  Check,
  X,
  Eye,
  DollarSign,
  Plane,
  Sparkles,
  Sprout,
  Plus,
  Filter,
  ChevronDown,
  BarChart3,
  Wallet,
  Clock,
  Activity,
  FileDown,
  CheckCircle,
} from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
} from "@heroui/react";
import { toast } from "sonner";
import type { ColumnDef } from "../../../../../global/components/resuable-components/table";
import ReusableTable from "../../../../../global/components/resuable-components/table";
import ResuableButton from "../../../../../global/components/resuable-components/button";
import ResuableDrawer from "../../../../../global/components/resuable-components/drawer";

const REDEMPTION_REQUESTS = [
  {
    id: "REQ-001",
    user: "Hotel Grand",
    role: "Donor",
    item: "Mega Prize",
    category: "Cash",
    amount: "₹10,000",
    points: "5,000",
    date: "Dec 20, 2024",
    status: "Pending",
  },
  {
    id: "REQ-002",
    user: "Skyline NGO",
    role: "NGO",
    item: "Big Win",
    category: "Cash",
    amount: "₹5,000",
    points: "2,500",
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
    points: "8,000",
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
  { name: "REQ ID", uid: "id", sortable: true, align: "start" },
  { name: "USER/ENTITY", uid: "user", sortable: true, align: "start" },
  { name: "CATEGORY", uid: "category", sortable: true, align: "center" },
  { name: "REWARD ITEM", uid: "item", sortable: true, align: "center" },
  { name: "VALUE", uid: "amount", sortable: true, align: "center" },
  { name: "DATE", uid: "date", sortable: true, align: "center" },
  { name: "STATUS", uid: "status", sortable: true, align: "center" },
  { name: "ACTIONS", uid: "actions", sortable: false, align: "center" },
];

const RedemptionsView: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [redemptionData, setRedemptionData] = useState(REDEMPTION_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const {
    isOpen: isSummaryOpen,
    onOpen: onSummaryOpen,
    onClose: onSummaryClose,
  } = useDisclosure();

  const toggleFilter = (filterType: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterType)
        ? prev.filter((f) => f !== filterType)
        : [...prev, filterType],
    );
    if (filterType === "category") setCategoryFilter("All");
    if (filterType === "status") setStatusFilter("All");
  };

  const exportToCSV = () => {
    // Define CSV headers
    const headers = [
      "Request ID",
      "User",
      "Role",
      "Category",
      "Item",
      "Amount",
      "Points",
      "Date",
      "Status",
    ];

    // Convert data to CSV rows
    const csvRows = redemptionData.map((req) => [
      req.id,
      req.user,
      req.role,
      req.category,
      req.item,
      req.amount.replace(/₹|,/g, ""), // Remove rupee symbol and commas for Excel
      req.points.replace(/,/g, ""), // Remove commas from points
      req.date,
      req.status,
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(","),
      ...csvRows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `redemption_report_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(
      `CSV report exported successfully! (${redemptionData.length} records)`,
    );
  };

  const renderRedemptionCell = (req: any, columnKey: React.Key) => {
    const value = req[columnKey as string];
    switch (columnKey) {
      case "item":
        return (
          <span className="font-bold text-slate-700 text-xs whitespace-nowrap truncate max-w-[150px] block">
            {req.item}
          </span>
        );
      case "id":
        return (
          <span className="font-black text-slate-400 text-[10px] tracking-widest">
            {value}
          </span>
        );
      case "user":
        return (
          <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-slate-50 border border-slate-200 hover:border-hf-green/50 hover:bg-white transition-all cursor-pointer group w-fit min-w-0">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white bg-slate-400 shadow-sm shrink-0">
              {req.user
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </div>
            <div className="flex flex-col text-start pr-1 min-w-0">
              <span
                className="font-bold text-xs whitespace-nowrap truncate max-w-[140px] group-hover:text-hf-green transition-colors leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {req.user}
              </span>
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 leading-none">
                {req.role}
              </span>
            </div>
          </div>
        );
      case "category":
        return (
          <div className="flex items-center justify-center gap-2">
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
          <div
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wider
            ${
              req.status === "Pending"
                ? "bg-amber-50 text-amber-600 border-amber-100"
                : ""
            }
            ${
              req.status === "Approved"
                ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                : ""
            }
            ${
              req.status === "Rejected"
                ? "bg-red-50 text-red-600 border-red-100"
                : ""
            }
          `}
          >
            <div
              className={`w-1 h-1 rounded-full ${
                req.status === "Pending"
                  ? "bg-amber-600"
                  : req.status === "Approved"
                    ? "bg-emerald-600"
                    : "bg-red-600"
              }`}
            />
            {req.status}
          </div>
        );
      case "actions":
        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              onPress={() => {
                // stopPropagation is handled by onPress in HeroUI
                setSelectedRequest(req);
                setIsDetailOpen(true);
              }}
              className="!bg-transparent !text-slate-600 hover:!text-[#22c55e] transition-all min-w-0 h-8 w-8"
            >
              <Eye size={14} />
            </Button>
          </div>
        );
      default:
        return (
          <span className="text-slate-500 font-bold text-xs">{value}</span>
        );
    }
  };

  const categoryOptions = ["Cash", "Tours", "Youth", "Trees"];
  const statusOptions = ["Pending", "Approved", "Rejected"];

  const filteredData = redemptionData.filter((req) => {
    const categoryMatch =
      categoryFilter === "All" || req.category === categoryFilter;
    const statusMatch = statusFilter === "All" || req.status === statusFilter;
    return categoryMatch && statusMatch;
  });

  const additionalFilters = (
    <div className="flex items-center gap-2 flex-nowrap overflow-x-auto no-scrollbar pb-1 sm:pb-0">
      <Dropdown placement="bottom">
        <DropdownTrigger>
          <ResuableButton
            variant="ghost"
            className="border border-slate-200 bg-white rounded-sm h-10 px-4 text-[11px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-none shrink-0"
            onClick={() => {}}
            startContent={<Filter size={14} className="text-slate-400" />}
            endContent={<Plus size={14} className="text-slate-400" />}
          >
            ADD FILTER
          </ResuableButton>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Add Filter Options"
          onAction={(key) => toggleFilter(key as string)}
          classNames={{
            base: "bg-white border border-slate-200 rounded-sm min-w-[180px] p-1",
          }}
          itemClasses={{
            base: [
              "text-slate-600 text-[11px] font-bold uppercase tracking-tight",
              "data-[hover=true]:bg-slate-50 data-[hover=true]:text-hf-green",
              "rounded-sm",
              "px-3",
              "py-2.5",
              "transition-colors duration-200",
            ].join(" "),
          }}
        >
          <DropdownItem
            key="category"
            isDisabled={activeFilters.includes("category")}
            startContent={<Filter size={14} />}
          >
            CATEGORY
          </DropdownItem>
          <DropdownItem
            key="status"
            isDisabled={activeFilters.includes("status")}
            startContent={<Filter size={14} />}
          >
            STATUS
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {activeFilters.includes("category") && (
        <Dropdown>
          <DropdownTrigger>
            <ResuableButton
              variant="ghost"
              className="border border-emerald-100 bg-emerald-50/50 rounded-sm h-10 px-3 text-[11px] font-bold text-hf-green hover:bg-emerald-100 transition-all shadow-none shrink-0"
              endContent={<ChevronDown size={14} />}
              onClick={() => {}}
            >
              CATEGORY: {categoryFilter.toUpperCase()}
              <div
                className="ml-2 hover:bg-emerald-200 rounded-full p-0.5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFilter("category");
                }}
              >
                <X size={12} />
              </div>
            </ResuableButton>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Category Filter Choices"
            selectionMode="single"
            selectedKeys={[categoryFilter]}
            onSelectionChange={(keys) =>
              setCategoryFilter(Array.from(keys)[0] as string)
            }
            classNames={{
              base: "bg-white border border-slate-200 rounded-sm min-w-[160px] p-1",
            }}
            itemClasses={{
              base: [
                "text-slate-600 text-[11px] font-bold uppercase tracking-tight",
                "data-[hover=true]:bg-slate-50 data-[hover=true]:text-hf-green",
                "data-[selected=true]:bg-emerald-50 data-[selected=true]:text-hf-green",
                "rounded-sm",
                "px-3",
                "py-2.5",
                "transition-colors duration-200",
              ].join(" "),
              selectedIcon: "text-hf-green w-4 h-4 ml-auto",
            }}
          >
            {[
              <DropdownItem key="All">ALL CATEGORIES</DropdownItem>,
              ...categoryOptions.map((cat) => (
                <DropdownItem key={cat}>{cat.toUpperCase()}</DropdownItem>
              )),
            ]}
          </DropdownMenu>
        </Dropdown>
      )}

      {activeFilters.includes("status") && (
        <Dropdown>
          <DropdownTrigger>
            <ResuableButton
              variant="ghost"
              className="border border-blue-100 bg-blue-50/50 rounded-sm h-10 px-3 text-[11px] font-bold text-blue-600 hover:bg-blue-100 transition-all shadow-none shrink-0"
              endContent={<ChevronDown size={14} />}
              onClick={() => {}}
            >
              STATUS: {statusFilter.toUpperCase()}
              <div
                className="ml-2 hover:bg-blue-200 rounded-full p-0.5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFilter("status");
                }}
              >
                <X size={12} />
              </div>
            </ResuableButton>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Status Filter Choices"
            selectionMode="single"
            selectedKeys={[statusFilter]}
            onSelectionChange={(keys) =>
              setStatusFilter(Array.from(keys)[0] as string)
            }
            classNames={{
              base: "bg-white border border-slate-200 rounded-sm min-w-[160px] p-1",
            }}
            itemClasses={{
              base: [
                "text-slate-600 text-[11px] font-bold uppercase tracking-tight",
                "data-[hover=true]:bg-slate-50 data-[hover=true]:text-blue-600",
                "data-[selected=true]:bg-blue-50 data-[selected=true]:text-blue-600",
                "rounded-sm",
                "px-3",
                "py-2.5",
                "transition-colors duration-200",
              ].join(" "),
              selectedIcon: "text-blue-600 w-4 h-4 ml-auto",
            }}
          >
            {[
              <DropdownItem key="All">ALL STATUS</DropdownItem>,
              ...statusOptions.map((status) => (
                <DropdownItem key={status}>{status.toUpperCase()}</DropdownItem>
              )),
            ]}
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );

  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h1
            className="text-4xl font-black tracking-tight uppercase"
            style={{ color: "var(--text-primary)" }}
          >
            Redemption Hub
          </h1>
          <p className="text-slate-500 font-semibold mt-1">
            Authorize and track user reward payouts
          </p>
        </div>
        <ResuableButton
          variant="primary"
          className="rounded-sm h-12 px-8 font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-sm"
          onClick={onSummaryOpen}
          startContent={<BarChart3 size={16} />}
        >
          Payout Summary
        </ResuableButton>
      </div>

      <ReusableTable
        data={filteredData}
        columns={redemptionColumns}
        renderCell={renderRedemptionCell}
        enableFilters={false}
        additionalFilters={additionalFilters}
      />

      <ResuableDrawer
        isOpen={isSummaryOpen}
        onClose={onSummaryClose}
        title="Payout Summary"
        subtitle="Real-time reward metrics"
        size="md"
      >
        <div className="space-y-5 px-3 sm:px-6 pb-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-3 rounded-sm border border-emerald-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-sm bg-emerald-500/10 flex items-center justify-center">
                  <Wallet size={18} className="text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="text-[8px] font-black text-emerald-600/70 uppercase tracking-[0.2em] mb-0.5">
                    Total Approved
                  </div>
                  <div className="text-xl font-black text-emerald-700 tracking-tight">
                    ₹1,45,000
                  </div>
                  <div className="text-[8px] font-bold text-emerald-500/70 uppercase tracking-tight mt-0.5">
                    Cumulative Payouts
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-3 rounded-sm border border-amber-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-sm bg-amber-500/10 flex items-center justify-center">
                  <Clock size={18} className="text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="text-[8px] font-black text-amber-600/70 uppercase tracking-[0.2em] mb-0.5">
                    Pending Grants
                  </div>
                  <div className="text-xl font-black text-amber-700 tracking-tight">
                    12 Requests
                  </div>
                  <div className="text-[8px] font-bold text-amber-500/70 uppercase tracking-tight mt-1">
                    Awaiting Review
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-sm border border-blue-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-sm bg-blue-500/10 flex items-center justify-center">
                  <Activity size={18} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-[8px] font-black text-blue-600/70 uppercase tracking-[0.2em] mb-0.5">
                    System Health
                  </div>
                  <div className="text-xl font-black text-blue-700 tracking-tight">
                    Optimal
                  </div>
                  <div className="text-[8px] font-bold text-blue-500/70 uppercase tracking-tight mt-1">
                    Processing at 100%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Batch Processing */}
          <section className="space-y-3 pt-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm shrink-0">
                <CheckCircle size={16} strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">
                  Batch Processing
                </h4>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight mt-1 leading-none">
                  Quick Actions
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <ResuableButton
                variant="primary"
                disabled={
                  redemptionData.filter((r) => r.status === "Pending")
                    .length === 0
                }
                onClick={() => {
                  const pendingCount = redemptionData.filter(
                    (r) => r.status === "Pending",
                  ).length;
                  setRedemptionData((prev) =>
                    prev.map((r) =>
                      r.status === "Pending" ? { ...r, status: "Approved" } : r,
                    ),
                  );
                  toast.success(`${pendingCount} requests approved!`);
                }}
                className="w-full !h-11 !bg-[#22c55e] hover:!bg-emerald-600 font-black uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-emerald-500/20 disabled:!bg-slate-100 disabled:!text-slate-400 disabled:!shadow-none"
                startContent={<CheckCircle size={16} />}
              >
                Approve All Pending
              </ResuableButton>
              <ResuableButton
                variant="ghost"
                onClick={exportToCSV}
                className="w-full !h-11 !bg-white border border-slate-200 hover:!bg-slate-50 font-black uppercase tracking-[0.2em] text-[10px] !text-slate-500 shadow-sm transition-all"
                startContent={<FileDown size={16} className="text-slate-400" />}
              >
                Export Report (.CSV)
              </ResuableButton>
            </div>
          </section>
        </div>
      </ResuableDrawer>

      <ResuableDrawer
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title="Request Details"
        subtitle={selectedRequest?.id}
        size="md"
      >
        {selectedRequest && (
          <div className="space-y-5 px-3 sm:px-6 pb-8">
            {/* User Info */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-sm border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-black text-sm shadow-md">
                  {selectedRequest.user.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-black text-slate-800">
                    {selectedRequest.user}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {selectedRequest.role}
                  </div>
                </div>
                <div
                  className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wide border ${
                    selectedRequest.status === "Pending"
                      ? "bg-amber-50 text-amber-600 border-amber-200"
                      : selectedRequest.status === "Approved"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                        : "bg-red-50 text-red-600 border-red-200"
                  }`}
                >
                  {selectedRequest.status}
                </div>
              </div>
            </div>

            {/* Request Details Grid */}
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-sm border border-slate-100 shadow-sm">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Category
                </div>
                <div className="text-sm font-bold text-slate-700">
                  {selectedRequest.category}
                </div>
              </div>
              <div className="bg-white p-3 rounded-sm border border-slate-100 shadow-sm">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Reward Item
                </div>
                <div className="text-sm font-bold text-slate-700">
                  {selectedRequest.item}
                </div>
              </div>
              <div className="bg-white p-3 rounded-sm border border-slate-100 shadow-sm">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Value
                </div>
                <div className="text-sm font-bold text-emerald-600">
                  {selectedRequest.amount}
                </div>
              </div>
              <div className="bg-white p-3 rounded-sm border border-slate-100 shadow-sm">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Points Used
                </div>
                <div className="text-sm font-bold text-slate-700">
                  {selectedRequest.points}
                </div>
              </div>
              <div className="bg-white p-3 rounded-sm border border-slate-100 shadow-sm col-span-2">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Request Date
                </div>
                <div className="text-sm font-bold text-slate-700">
                  {selectedRequest.date}
                </div>
              </div>
            </div>

            {/* Actions for Pending Requests */}
            {selectedRequest.status === "Pending" && (
              <section className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-sm bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm shrink-0">
                    <Clock size={16} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">
                      Pending Approval
                    </h4>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight mt-1 leading-none">
                      Take action on this request
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <ResuableButton
                    variant="primary"
                    onClick={() => {
                      setRedemptionData((prev) =>
                        prev.map((r) =>
                          r.id === selectedRequest.id
                            ? { ...r, status: "Approved" }
                            : r,
                        ),
                      );
                      setSelectedRequest({
                        ...selectedRequest,
                        status: "Approved",
                      });
                      toast.success(
                        `Request ${selectedRequest.id} approved successfully!`,
                      );
                    }}
                    className="w-full !h-11 !bg-[#22c55e] hover:!bg-emerald-600 font-black uppercase tracking-[0.15em] text-[10px] shadow-lg shadow-emerald-500/20"
                    startContent={<Check size={16} />}
                  >
                    Approve
                  </ResuableButton>
                  <ResuableButton
                    variant="ghost"
                    onClick={() => {
                      setRedemptionData((prev) =>
                        prev.map((r) =>
                          r.id === selectedRequest.id
                            ? { ...r, status: "Rejected" }
                            : r,
                        ),
                      );
                      setSelectedRequest({
                        ...selectedRequest,
                        status: "Rejected",
                      });
                      toast.error(
                        `Request ${selectedRequest.id} has been rejected.`,
                      );
                    }}
                    className="w-full !h-11 font-black uppercase tracking-[0.15em] text-[10px] border-2 border-red-100 !text-red-600 hover:!bg-red-600 hover:!text-white transition-all shadow-sm"
                    startContent={<X size={16} />}
                  >
                    Reject
                  </ResuableButton>
                </div>
              </section>
            )}

            {/* Status Message for Processed Requests */}
            {selectedRequest.status !== "Pending" && (
              <div className="py-10 flex flex-col items-center justify-center space-y-4 border-t border-slate-50 mt-4">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm ${
                    selectedRequest.status === "Approved"
                      ? "bg-emerald-50 text-emerald-500 border border-emerald-100"
                      : "bg-red-50 text-red-500 border border-red-100"
                  }`}
                >
                  {selectedRequest.status === "Approved" ? (
                    <CheckCircle size={28} strokeWidth={2.5} />
                  ) : (
                    <X size={28} strokeWidth={2.5} />
                  )}
                </div>
                <div className="text-center space-y-1.5">
                  <h4
                    className={`text-[12px] font-black uppercase tracking-[0.25em] ${
                      selectedRequest.status === "Approved"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    Request {selectedRequest.status}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                    Transaction Finalized
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </ResuableDrawer>
    </div>
  );
};

export default RedemptionsView;
