import React from "react";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";
import ResuableTable from "../../../../global/components/resuable-components/table";
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
    { uid: "donor", name: "DONOR", sortable: true },
    { uid: "type", name: "FOOD TYPE", sortable: true },
    { uid: "quantity", name: "QUANTITY", sortable: true },
    { uid: "location", name: "LOCATION", sortable: true },
    { uid: "status", name: "STATUS", sortable: true },
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
        return <span className="font-bold text-slate-900">{value}</span>;
      case "donor":
        return (
          <div className="flex flex-col items-center">
            <span className="font-bold text-slate-700">{value}</span>
          </div>
        );
      case "status":
        return (
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
        );
      case "quantity":
        return (
          <div className="flex items-center justify-center gap-1">
            <Package size={14} className="text-slate-400" />
            <span className="font-bold text-slate-700">{value}</span>
          </div>
        );
      case "location":
        return (
          <div className="flex items-center justify-center gap-1">
            <MapPin size={14} className="text-slate-400" />
            <span className="text-slate-600 truncate max-w-[150px]">
              {value}
            </span>
          </div>
        );
      case "expiry":
        return (
          <span
            className={`font-bold ${
              item.status === "urgent" ? "text-red-500" : "text-slate-600"
            }`}
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
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          Pending Donations
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Review and approve incoming food donations for distribution
        </p>
      </div>

      <ImpactCards data={stats} />

      <ResuableTable
        // title="Incoming Requests"
        // description="All donations awaiting verification from administrative staff"
        columns={columns}
        data={sampleData}
        renderCell={renderCell}
        onAddNew={() => console.log("Add new donation")}
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
