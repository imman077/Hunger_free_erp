import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { ImpactCards } from "../../../../global/components/resuable-components/ImpactCards";
import ReusableTable from "../../../../global/components/resuable-components/table";
import ReusableButton from "../../../../global/components/resuable-components/button";
import ReusableInput from "../../../../global/components/resuable-components/input";
import ResuableDrawer from "../../../../global/components/resuable-components/drawer";
import {
  Plus,
  Eye,
  ChevronDown,
  Filter,
  X,
  User,
  Mail,
  MapPin,
  History as HistoryIcon,
  FileText,
  ShieldCheck,
  Save,
  RotateCcw,
  Settings,
} from "lucide-react";

import FilePreviewModal from "../../../../global/components/resuable-components/FilePreviewModal";

interface DonationHistory {
  event: string;
  date: string;
  amount: number;
}

interface Donor {
  id: number;
  businessName: string;
  type: string;
  totalDonations: number;
  points: number;
  status: string;
  contactPerson: string;
  email: string;
  address: string;
  donationHistory: DonationHistory[];
}

const DonorPage = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableBusinessName, setEditableBusinessName] = useState("");
  const [editableContactPerson, setEditableContactPerson] = useState("");
  const [editableEmail, setEditableEmail] = useState("");
  const [editableAddress, setEditableAddress] = useState("");
  const [donors, setDonors] = useState<Donor[]>([
    {
      id: 1,
      businessName: "Saravana Bhavan",
      type: "Restaurant",
      totalDonations: 8500,
      points: 1700,
      status: "Active",
      contactPerson: "Sathish Kumar",
      email: "contact@saravanabhavan.in",
      address: "Mylapore, Chennai, Tamil Nadu, 600004",
      donationHistory: [
        { event: "Margazhi Food Drive", date: "2023-12-15", amount: 3000 },
        { event: "Flood Relief Support", date: "2023-11-20", amount: 2500 },
        {
          event: "Temple Feast Contribution",
          date: "2023-05-10",
          amount: 3000,
        },
      ],
    },
    {
      id: 2,
      businessName: "ITC Grand Chola",
      type: "Hotel",
      totalDonations: 15000,
      points: 3000,
      status: "Active",
      contactPerson: "Rema Devi",
      email: "rema.d@itchotels.in",
      address: "Guindy, Chennai, Tamil Nadu, 600032",
      donationHistory: [
        { event: "Heritage Charity Ball", date: "2023-10-15", amount: 6000 },
        { event: "Education For All", date: "2023-07-20", amount: 5000 },
        {
          event: "Youth Skill Program",
          date: "2022-11-05",
          amount: 4000,
        },
      ],
    },
    {
      id: 3,
      businessName: "Meenakshi Family",
      type: "Household",
      totalDonations: 1200,
      points: 240,
      status: "Pending",
      contactPerson: "Muralitharan",
      email: "murali.m@gmail.com",
      address: "Near S.S. Colony, Madurai, Tamil Nadu, 625010",
      donationHistory: [
        { event: "Annadhanam Donation", date: "2023-09-10", amount: 1200 },
      ],
    },
    {
      id: 4,
      businessName: "Coimbatore Textile Expo",
      type: "Event",
      totalDonations: 30000,
      points: 6000,
      status: "Active",
      contactPerson: "Arunachalam",
      email: "arun.tex@coimbatoreexpo.org",
      address: "Avinashi Road, Coimbatore, Tamil Nadu, 641018",
      donationHistory: [
        {
          event: "Textiles For Charity 2023",
          date: "2023-12-01",
          amount: 20000,
        },
        { event: "Rural Welfare Fund", date: "2022-06-01", amount: 10000 },
      ],
    },
    {
      id: 5,
      businessName: "Lakshmi Mills",
      type: "Corporate",
      totalDonations: 5000,
      points: 1000,
      status: "Inactive",
      contactPerson: "Pandi Durai",
      email: "pandi.d@lakshmimills.com",
      address: "Pappanaickenpalayam, Coimbatore, Tamil Nadu, 641037",
      donationHistory: [
        {
          event: "Worker Welfare Fund",
          date: "2023-02-14",
          amount: 5000,
        },
      ],
    },
  ]);

  const getStatusColor = (
    status: string,
  ): { backgroundColor: string; color: string; border?: string } => {
    switch (status) {
      case "Active":
        return {
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          color: "#f59e0b",
          border: "1px solid rgba(245, 158, 11, 0.2)",
        };
      case "Pending":
        return {
          backgroundColor: "rgba(245, 158, 11, 0.05)",
          color: "#d97706",
          border: "1px solid rgba(245, 158, 11, 0.1)",
        };
      case "Inactive":
        return {
          backgroundColor: "rgba(100, 116, 139, 0.1)",
          color: "#64748b",
        };
      default:
        return {
          backgroundColor: "rgba(100, 116, 139, 0.1)",
          color: "#64748b",
        };
    }
  };

  const getStatusBadge = (status: string): React.ReactElement => {
    const style = getStatusColor(status);

    return (
      <span
        className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
        style={{
          backgroundColor: style.backgroundColor,
          color: style.color,
          border: style.border || `1px solid ${style.color}20`,
        }}
      >
        {status}
      </span>
    );
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleViewProfile = (donor: Donor): void => {
    setSelectedDonor(donor);
    setEditableBusinessName(donor.businessName);
    setEditableContactPerson(donor.contactPerson);
    setEditableEmail(donor.email);
    setEditableAddress(donor.address);
    setIsEditMode(false);
    setIsDrawerOpen(true);
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter],
    );
    if (filter === "type") setFilterType("All");
    if (filter === "status") setFilterStatus("All");
  };

  const closeDrawer = () => {
    setIsEditMode(false);
    setIsDrawerOpen(false);
    // setTimeout(() => setSelectedDonor(null), 300);
  };

  const handleUpdateDonor = () => {
    if (!selectedDonor) return;

    // Update the donors array
    const updatedDonors = donors.map((donor) =>
      donor.id === selectedDonor.id
        ? {
            ...donor,
            businessName: editableBusinessName,
            contactPerson: editableContactPerson,
            email: editableEmail,
            address: editableAddress,
          }
        : donor,
    );

    setDonors(updatedDonors);

    // Update the selected donor to reflect changes immediately
    setSelectedDonor({
      ...selectedDonor,
      businessName: editableBusinessName,
      contactPerson: editableContactPerson,
      email: editableEmail,
      address: editableAddress,
    });

    // Exit edit mode
    setIsEditMode(false);
  };

  const filteredDonors = donors.filter((donor) => {
    const matchType =
      !activeFilters.includes("type") ||
      filterType === "All" ||
      donor.type === filterType;
    const matchStatus =
      !activeFilters.includes("status") ||
      filterStatus === "All" ||
      donor.status === filterStatus;
    return matchType && matchStatus;
  });

  return (
    <>
      <div
        className="min-h-screen p-6"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="w-full">
          {/* Header */}
          <div className="mb-5 flex items-center justify-between w-full">
            <div className="text-left">
              <h1
                className="text-xl font-bold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Donor Management
              </h1>
              <p className="mt-2" style={{ color: "var(--text-muted)" }}>
                Manage your donors and their contributions
              </p>
            </div>
            <Button
              color="primary"
              className="bg-hf-green text-white rounded-sm h-10 px-6 font-bold hover:bg-[#1ea34a] transition-all active:scale-95"
              style={{ backgroundColor: "#22c55e", color: "white" }}
              endContent={<Plus size={18} />}
              onPress={() => navigate("/admin/users/donors/create")}
            >
              Add New Donor
            </Button>
          </div>

          {/* Stats Summary */}
          <ImpactCards
            data={[
              {
                label: "Total Donors",
                val: donors.length.toString(),
                trend: "All registered donors",
                color: "bg-[#22c55e]",
              },
              {
                label: "Total Donations",
                val: formatCurrency(
                  donors.reduce(
                    (sum: number, donor: Donor) => sum + donor.totalDonations,
                    0,
                  ),
                ),
                trend: "Cumulative contributions",
                color: "bg-[#22c55e]",
              },
              {
                label: "Total Points",
                val: donors
                  .reduce((sum: number, donor: Donor) => sum + donor.points, 0)
                  .toLocaleString(),
                trend: "Reward points earned",
                color: "bg-[#22c55e]",
              },
              {
                label: "Active Donors",
                val: donors
                  .filter((donor: Donor) => donor.status === "Active")
                  .length.toString(),
                trend: "Currently active",
                color: "bg-[#22c55e]",
              },
            ]}
          />

          {/* Table */}
          <ReusableTable
            enableFilters={false}
            additionalFilters={
              <div className="flex items-center gap-2 flex-wrap">
                <Dropdown placement="bottom">
                  <DropdownTrigger>
                    <Button
                      variant="flat"
                      className="border border-slate-200 bg-white rounded-sm h-10 px-4 text-[11px] font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-none"
                      style={{ backgroundColor: "white" }}
                      startContent={
                        <Filter size={14} className="text-slate-400" />
                      }
                      endContent={<Plus size={14} className="text-slate-400" />}
                    >
                      ADD FILTER
                    </Button>
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
                        "data-[hover=true]:bg-slate-50 data-[hover=true]:text-[#22c55e]",
                        "rounded-sm",
                        "px-3",
                        "py-2.5",
                        "transition-colors duration-200",
                      ].join(" "),
                    }}
                  >
                    <DropdownItem
                      key="type"
                      isDisabled={activeFilters.includes("type")}
                      startContent={<Filter size={14} />}
                    >
                      TYPE
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

                {activeFilters.includes("type") && (
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="flat"
                        className="border border-emerald-100 bg-emerald-50/50 rounded-sm h-10 px-3 text-[11px] font-bold text-[#22c55e] hover:bg-emerald-100 transition-all shadow-none"
                        endContent={<ChevronDown size={14} />}
                      >
                        TYPE: {filterType.toUpperCase()}
                        <div
                          className="ml-2 hover:bg-emerald-200 rounded-full p-0.5 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFilter("type");
                          }}
                        >
                          <X size={12} />
                        </div>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Filter by Type"
                      selectionMode="single"
                      selectedKeys={[filterType]}
                      onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0] as string;
                        setFilterType(selected || "All");
                      }}
                      classNames={{
                        base: "bg-white border border-slate-200 rounded-sm min-w-[160px] p-1",
                      }}
                      itemClasses={{
                        base: [
                          "text-slate-600 text-[11px] font-bold uppercase tracking-tight",
                          "data-[hover=true]:bg-slate-50 data-[hover=true]:text-[#22c55e]",
                          "data-[selected=true]:bg-emerald-50 data-[selected=true]:text-[#22c55e]",
                          "rounded-sm",
                          "px-3",
                          "py-2.5",
                          "transition-colors duration-200",
                        ].join(" "),
                        selectedIcon: "text-[#22c55e] w-4 h-4 ml-auto",
                      }}
                    >
                      <DropdownItem key="All">All Types</DropdownItem>
                      <DropdownItem key="Restaurant">Restaurant</DropdownItem>
                      <DropdownItem key="Hotel">Hotel</DropdownItem>
                      <DropdownItem key="Household">Household</DropdownItem>
                      <DropdownItem key="Event">Event</DropdownItem>
                      <DropdownItem key="Corporate">Corporate</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}

                {activeFilters.includes("status") && (
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="flat"
                        className="border border-blue-100 bg-blue-50/50 rounded-sm h-10 px-3 text-[11px] font-bold text-blue-600 hover:bg-blue-100 transition-all shadow-none"
                        endContent={<ChevronDown size={14} />}
                      >
                        STATUS: {filterStatus.toUpperCase()}
                        <div
                          className="ml-2 hover:bg-blue-200 rounded-full p-0.5 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFilter("status");
                          }}
                        >
                          <X size={12} />
                        </div>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Filter by Status"
                      selectionMode="single"
                      selectedKeys={[filterStatus]}
                      onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0] as string;
                        setFilterStatus(selected || "All");
                      }}
                      classNames={{
                        base: "bg-white border border-slate-200 rounded-sm min-w-[160px] p-1",
                      }}
                      itemClasses={{
                        base: [
                          "text-slate-600 text-[11px] font-bold uppercase tracking-tight",
                          "data-[hover=true]:bg-slate-50 data-[hover=true]:text-[#22c55e]",
                          "data-[selected=true]:bg-emerald-50 data-[selected=true]:text-[#22c55e]",
                          "rounded-sm",
                          "px-3",
                          "py-2.5",
                          "transition-colors duration-200",
                        ].join(" "),
                        selectedIcon: "text-[#22c55e] w-4 h-4 ml-auto",
                      }}
                    >
                      <DropdownItem key="All">All Status</DropdownItem>
                      <DropdownItem key="Active">Active</DropdownItem>
                      <DropdownItem key="Pending">Pending</DropdownItem>
                      <DropdownItem key="Inactive">Inactive</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )}
              </div>
            }
            data={filteredDonors}
            columns={[
              {
                name: "Business Name",
                uid: "businessName",
                sortable: true,
                align: "start",
              },
              { name: "Type", uid: "type", sortable: false, align: "center" },
              {
                name: "Total Donations",
                uid: "totalDonations",
                sortable: false,
              },
              { name: "Points", uid: "points", sortable: true },
              {
                name: "Status",
                uid: "status",
                sortable: false,
                align: "center",
              },
              { name: "Actions", uid: "actions", sortable: false },
            ]}
            renderCell={(donor: Donor, columnKey: React.Key) => {
              switch (columnKey) {
                case "businessName":
                  return (
                    <div
                      className="flex items-center gap-2 px-2 py-1 rounded-full bg-slate-50 border border-slate-200 hover:border-hf-green/50 hover:bg-white transition-all cursor-pointer group w-fit min-w-0"
                      onClick={() => handleViewProfile(donor)}
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-br from-amber-400 to-orange-600 shadow-sm shrink-0">
                        {donor.businessName
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </div>
                      <span
                        className="font-bold text-xs whitespace-nowrap truncate max-w-[140px] pr-1 group-hover:text-hf-green transition-colors"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {donor.businessName}
                      </span>
                    </div>
                  );
                case "type":
                  return (
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {donor.type}
                    </span>
                  );
                case "totalDonations":
                  return (
                    <div
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {formatCurrency(donor.totalDonations)}
                    </div>
                  );
                case "points":
                  return (
                    <div className="text-xs font-bold text-amber-600 whitespace-nowrap">
                      {donor.points.toLocaleString()}
                    </div>
                  );
                case "status":
                  const statusStyle = getStatusColor(donor.status);
                  return (
                    <div className="flex justify-center w-full">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border"
                        style={{
                          backgroundColor: statusStyle.backgroundColor,
                          color: statusStyle.color,
                          borderColor: statusStyle.border
                            ? "transparent"
                            : statusStyle.color + "20",
                        }}
                      >
                        {donor.status.toUpperCase()}
                      </span>
                    </div>
                  );
                case "actions":
                  return (
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onPress={() => handleViewProfile(donor)}
                        className="!bg-transparent !text-slate-600 hover:!text-[#22c55e] transition-all min-w-0 h-8 w-8"
                      >
                        <Eye size={14} />
                      </Button>
                    </div>
                  );
                default:
                  return <span>{String(donor[columnKey as keyof Donor])}</span>;
              }
            }}
            // title="Donor List"
            // description="Manage your donors and their contributions"
          />
        </div>
      </div>

      {/* Donor Details Drawer */}
      <ResuableDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title="Donor Intelligence"
        subtitle={`Global Identifier: #DON-${selectedDonor?.id?.toString().padStart(4, "0") || "0000"}`}
        size="md"
      >
        {selectedDonor && (
          <div className="space-y-6 pb-10 px-3 sm:px-6">
            {/* Hero Section */}
            <div className="bg-white p-4 sm:p-6 rounded-md border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black tracking-tighter text-slate-900">
                    {selectedDonor.businessName}
                  </h3>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selectedDonor.status)}
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      • {selectedDonor.type}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-amber-50 rounded-md flex items-center justify-center border border-amber-100">
                  {/* Avatar with Initials */}
                  <div className="w-full h-full rounded-sm bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-xl font-black text-white shadow-sm overflow-hidden uppercase italic">
                    {selectedDonor.businessName
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Total Contributions
                  </p>
                  <p className="text-sm font-black text-slate-900">
                    {formatCurrency(selectedDonor.totalDonations)}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Reward Points
                  </p>
                  <p className="text-sm font-black text-hf-green">
                    {selectedDonor.points.toLocaleString()} PTS
                  </p>
                </div>
              </div>
            </div>

            {/* Information Grid */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <User size={14} className="text-hf-green" />
                Connectivity Details
              </h4>

              {isEditMode ? (
                <div className="bg-white p-5 rounded-md border border-slate-100 shadow-sm space-y-4">
                  <ReusableInput
                    label="Business Name"
                    value={editableBusinessName}
                    onChange={setEditableBusinessName}
                    placeholder="Enter business name"
                  />
                  <ReusableInput
                    label="Contact Person"
                    value={editableContactPerson}
                    onChange={setEditableContactPerson}
                    placeholder="Enter contact person name"
                  />
                  <ReusableInput
                    label="Email Address"
                    value={editableEmail}
                    onChange={setEditableEmail}
                    placeholder="Enter email address"
                    type="email"
                  />
                  <ReusableInput
                    label="Physical Address"
                    value={editableAddress}
                    onChange={setEditableAddress}
                    placeholder="Enter physical address"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      Icon: User,
                      label: "Contact Person",
                      value: selectedDonor.contactPerson,
                    },
                    {
                      Icon: Mail,
                      label: "Official Email",
                      value: selectedDonor.email,
                    },
                    {
                      Icon: MapPin,
                      label: "Physical HQ",
                      value: selectedDonor.address,
                      span: true,
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-4 bg-white rounded-md border border-slate-100 shadow-sm ${item.span ? "md:col-span-2" : ""}`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <item.Icon size={12} className="text-slate-400" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-700 leading-relaxed uppercase tracking-tight">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Transaction History Section */}
            {!isEditMode && (
              <div className="space-y-4">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                  <HistoryIcon size={14} className="text-hf-green" />
                  Audit Trail History
                </h4>
                <div className="space-y-2">
                  {selectedDonor.donationHistory.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col min-[400px]:flex-row justify-between items-start min-[400px]:items-center bg-white p-4 rounded-md border border-slate-100 shadow-sm hover:border-hf-green/30 transition-all gap-3"
                    >
                      <div className="space-y-1">
                        <p className="text-[11px] font-black uppercase tracking-wider text-slate-900">
                          {item.event}
                        </p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">
                          {item.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] font-black text-hf-green">
                          {formatCurrency(item.amount)}
                        </p>
                        <p className="text-[8px] font-bold text-slate-300 uppercase">
                          Allocated
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verification Section */}
            {!isEditMode && (
              <div className="space-y-4">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-blue-500" />
                  Compliance Verification
                </h4>
                <div
                  onClick={() => setIsPreviewOpen(true)}
                  className="group p-4 bg-white rounded-md border border-slate-100 shadow-sm hover:border-blue-500/30 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center text-blue-500">
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight">
                        Business_License.pdf
                      </p>
                      <span className="text-[9px] font-bold text-hf-green uppercase tracking-widest flex items-center gap-1">
                        <ShieldCheck size={10} /> Verified
                      </span>
                    </div>
                  </div>
                  <Eye
                    size={16}
                    className="text-slate-300 group-hover:text-blue-500 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Action Footer */}
            <div className="flex gap-3 pt-6">
              {isEditMode ? (
                <>
                  <button
                    onClick={() => setIsEditMode(false)}
                    className="flex-1 px-6 py-3.5 text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-md border border-slate-200"
                  >
                    <RotateCcw size={14} />
                    Cancel
                  </button>
                  <ReusableButton
                    variant="primary"
                    className="flex-1 !bg-hf-green hover:!bg-[#1ea34a] !text-white !font-black !px-4 !py-3.5 !text-[10px] uppercase tracking-widest !rounded-md shadow-lg shadow-green-500/20"
                    onClick={handleUpdateDonor}
                  >
                    <Save size={14} />
                    Update Profile
                  </ReusableButton>
                </>
              ) : (
                <button
                  onClick={() => setIsEditMode(true)}
                  className="flex-1 px-6 py-3.5 bg-hf-green text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#1ea34a] transition-all flex items-center justify-center gap-3 rounded-md active:scale-95 shadow-lg shadow-green-500/20"
                >
                  <Settings size={14} />
                  Modify Profile
                </button>
              )}
            </div>
          </div>
        )}
      </ResuableDrawer>
      <FilePreviewModal
        isOpen={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        file="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        fileName="Business_License.pdf"
      />
    </>
  );
};

export default DonorPage;
