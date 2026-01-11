import React from "react";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";
import ReusableTable from "../../../../global/components/resuable-components/table";
import type { ColumnDef } from "../../../../global/components/resuable-components/table";
import {
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  AlertTriangle,
  Package,
  MapPin,
} from "lucide-react";
import { Button, Tooltip, Chip } from "@heroui/react";
import { Plus } from "lucide-react";

const PendingDonationsPage: React.FC = () => {
  const stats = [
    {
      label: "Total Pending",
      val: "42",
      trend: "Across all regions",
      color: "bg-amber-500",
    },
    {
      label: "Urgent Pickup",
      val: "12",
      trend: "Expires < 24 hrs",
      color: "bg-red-500",
    },
    {
      label: "New Today",
      val: "08",
      trend: "+3 from yesterday",
      color: "bg-emerald-500",
    },
    {
      label: "Avg. Wait Time",
      val: "4.2h",
      trend: "Processing speed",
      color: "bg-slate-300",
    },
  ];

  const columns: ColumnDef[] = [
    { uid: "id", name: "ID", sortable: true },
    { uid: "donor", name: "DONOR", sortable: true, align: "start" },
    { uid: "type", name: "FOOD TYPE", sortable: true },
    { uid: "quantity", name: "QUANTITY", sortable: true },
    { uid: "location", name: "LOCATION", sortable: true },
    { uid: "status", name: "STATUS", sortable: false, align: "center" },
    { uid: "expiry", name: "EXPIRY", sortable: true },
    { uid: "actions", name: "ACTIONS" },
  ];

  const sampleData = [
    {
      id: "DON-001",
      donor: "Hotel Saravana Bhavan",
      type: "Meals (Veg)",
      quantity: "50 KG",
      location: "T. Nagar, Chennai",
      status: "urgent",
      expiry: "4 hours",
    },
    {
      id: "DON-002",
      donor: "Anjappar Chettinad",
      type: "Rice & Curry",
      quantity: "30 KG",
      location: "Anna Nagar, Chennai",
      status: "pending",
      expiry: "8 hours",
    },
    {
      id: "DON-003",
      donor: "Private Donor - Rajesh",
      type: "Bread & Jam",
      quantity: "15 KG",
      location: "Adyar, Chennai",
      status: "pending",
      expiry: "12 hours",
    },
    {
      id: "DON-004",
      donor: "SM Wedding Hall",
      type: "Full Meals",
      quantity: "120 KG",
      location: "Velachery, Chennai",
      status: "urgent",
      expiry: "2 hours",
    },
    {
      id: "DON-005",
      donor: "Corporate Canteen - TCS",
      type: "Variety Rice",
      quantity: "45 KG",
      location: "Siruseri, Chennai",
      status: "pending",
      expiry: "6 hours",
    },
  ];

  const renderCell = (item: any, columnKey: React.Key) => {
    const value = item[columnKey as string];

    switch (columnKey) {
      case "id":
        return (
          <span className="font-bold" style={{ color: "var(--text-primary)" }}>
            {value}
          </span>
        );
      case "donor":
        return (
          <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-slate-100/50 border border-slate-200 hover:border-hf-green/50 hover:bg-white transition-all cursor-pointer group w-fit min-w-0">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black text-white bg-hf-green shadow-sm shrink-0">
              {value
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </div>
            <span
              className="font-bold text-xs whitespace-nowrap truncate max-w-[140px] pr-1 group-hover:text-hf-green transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              {value}
            </span>
          </div>
        );
      case "status":
        return (
          <div className="flex justify-center w-full">
            <Chip
              className="capitalize border-none gap-1 h-6 text-[10px] font-black"
              color={value === "urgent" ? "danger" : "warning"}
              size="sm"
              variant="flat"
              startContent={
                value === "urgent" ? (
                  <AlertTriangle size={12} />
                ) : (
                  <Clock size={12} />
                )
              }
            >
              {value}
            </Chip>
          </div>
        );
      case "quantity":
        return (
          <div className="flex items-center justify-center gap-1">
            <Package size={14} style={{ color: "var(--text-muted)" }} />
            <span
              className="font-bold"
              style={{ color: "var(--text-secondary)" }}
            >
              {value}
            </span>
          </div>
        );
      case "location":
        return (
          <div className="flex items-center gap-1.5 px-2">
            <MapPin size={12} style={{ color: "var(--text-muted)" }} />
            <span
              className="text-xs font-medium whitespace-nowrap"
              style={{ color: "var(--text-secondary)" }}
            >
              {value}
            </span>
          </div>
        );
      case "expiry":
        return (
          <span
            className="font-bold"
            style={{
              color:
                item.status === "urgent" ? "#ef4444" : "var(--text-secondary)",
            }}
          >
            {value}
          </span>
        );
      case "actions":
        return (
          <div className="flex items-center justify-center gap-2">
            <Tooltip content="View Details">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-slate-400 hover:text-hf-green"
              >
                <Eye size={18} />
              </Button>
            </Tooltip>
            <Tooltip content="Approve Donation">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-slate-400 hover:text-emerald-500"
              >
                <CheckCircle size={18} />
              </Button>
            </Tooltip>
            <Tooltip content="Reject Donation">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-slate-400 hover:text-red-500"
              >
                <XCircle size={18} />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return value;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between w-full">
        <div>
          <h1
            className="text-xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Pending Donations
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Review and approve incoming food donations for distribution
          </p>
        </div>
        <Button
          color="primary"
          className="bg-hf-green text-white rounded-sm h-10 px-6 font-bold hover:bg-emerald-600 transition-all active:scale-95"
          style={{ backgroundColor: "#22c55e", color: "white" }}
          endContent={<Plus size={18} />}
          onPress={() => console.log("Add new donation")}
        >
          Add New Donation
        </Button>
      </div>

      <ImpactCards data={stats} />

      <ReusableTable
        // title="Incoming Requests"
        // description="All donations awaiting verification from administrative staff"
        columns={columns}
        data={sampleData}
        renderCell={renderCell}
        actionConfig={{
          showView: true,
          showMessage: true,
          showApprove: true,
          showDeactivate: true,
          // onView: handleViewProfile,
          onMessage: (donor) => console.log("Message", donor),
          onApprove: (donor) => console.log("Approve", donor),
          onDeactivate: (donor) => console.log("Deactivate", donor),
        }}
      />
    </div>
  );
};

export default PendingDonationsPage;
