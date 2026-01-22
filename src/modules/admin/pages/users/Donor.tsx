import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
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
import {
  Plus,
  Eye,
  ChevronDown,
  Filter,
  X,
  Phone,
  User,
  Mail,
  MapPin,
  History as HistoryIcon,
  DollarSign,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    onOpen();
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
    onClose();
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
                default:
                  return <span>{String(donor[columnKey as keyof Donor])}</span>;
              }
            }}
            // title="Donor List"
            // description="Manage your donors and their contributions"
            actionConfig={{
              showView: true,
              showApprove: true,
              showDeactivate: true,
              onView: handleViewProfile,
              onApprove: (donor: Donor) => console.log("Approve", donor),
              onDeactivate: (donor: Donor) => console.log("Deactivate", donor),
            }}
          />
        </div>
      </div>

      {/* Donor Details Drawer */}
      <Drawer
        isOpen={isOpen}
        onClose={closeDrawer}
        hideCloseButton={true}
        placement="right"
        classNames={{
          base: "w-[400px] !max-w-[400px] overflow-y-scroll scrollbar-hide",
          backdrop: "bg-black/50",
        }}
      >
        <DrawerContent
          className="no-scrollbar"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          {() => (
            <>
              <DrawerHeader
                className="flex flex-col gap-1 no-scrollbar border-b px-6 py-3"
                style={{ borderBottomColor: "var(--border-color)" }}
              >
                <div className="flex items-center justify-between">
                  <h2
                    className="text-xl font-black tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Donor Details
                  </h2>
                  <button
                    onClick={closeDrawer}
                    className="p-1.5 hover:bg-slate-100 rounded-sm transition-colors text-slate-400"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    System Profile Identifier
                  </span>
                  {selectedDonor && getStatusBadge(selectedDonor.status)}
                </div>
              </DrawerHeader>

              <DrawerBody className="px-6 py-3 space-y-4 overflow-y-auto no-scrollbar">
                {selectedDonor && (
                  <>
                    {/* Hero Section - NGO Style */}
                    <div className="relative pb-6 border-b border-slate-100">
                      <div className="flex flex-col items-center gap-4">
                        {/* Avatar with Badge - Literal NGO Style */}
                        <div className="relative w-24 h-24 mb-4 group transition-transform duration-500 hover:scale-105">
                          {/* Inner Avatar Box */}
                          <div className="w-full h-full p-1.5 rounded-sm bg-amber-50 border border-amber-100/50">
                            <div className="w-full h-full rounded-sm bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-3xl font-black text-white shadow-sm overflow-hidden uppercase italic">
                              {selectedDonor.businessName
                                .split(" ")
                                .map((n: string) => n[0])
                                .slice(0, 3)
                                .join("")}
                            </div>
                          </div>

                          {/* Status Float - Centered Bottom (NGO Reference) */}
                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-white p-1 rounded-sm border border-slate-100 ring-2 ring-slate-50 shadow-sm z-20 whitespace-nowrap">
                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 rounded-sm">
                              <div className="w-1.5 h-1.5 rounded-sm bg-amber-500 animate-pulse" />
                              <span className="text-[9px] font-black text-amber-600 uppercase tracking-tighter">
                                Corporate Donor
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Business Info */}
                        <div className="text-center space-y-3 max-w-sm">
                          <div className="space-y-0.5 w-full flex flex-col items-center">
                            <h3 className="text-2xl font-black text-slate-900 leading-[1.05] tracking-tight">
                              {selectedDonor.businessName}
                            </h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                              Global Identifier: #
                              {selectedDonor.id.toString().padStart(4, "0")}
                            </p>
                          </div>

                          {/* Badges Row */}
                          <div className="flex flex-wrap items-center justify-center gap-2">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-white/80 backdrop-blur-md border border-slate-200/50 transition-all hover:border-amber-500">
                              <span className="text-[9px] font-black text-amber-600/80 uppercase">
                                Type
                              </span>
                              <div className="w-1 h-3 bg-amber-100 rounded-full" />
                              <span className="text-xs font-mono font-bold text-slate-700">
                                {selectedDonor.type}
                              </span>
                            </div>
                            {getStatusBadge(selectedDonor.status)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-3 rounded-sm border border-amber-100 shadow-sm">
                        <div className="text-[9px] font-black text-amber-600/70 uppercase tracking-[0.2em] mb-1">
                          Total Donations
                        </div>
                        <div className="text-sm font-black text-amber-700">
                          {formatCurrency(selectedDonor.totalDonations)}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-3 rounded-sm border border-amber-100 shadow-sm">
                        <div className="text-[9px] font-black text-amber-600/70 uppercase tracking-[0.2em] mb-1">
                          Loyalty Points
                        </div>
                        <div className="text-sm font-black text-amber-700">
                          {selectedDonor.points.toLocaleString()} pts
                        </div>
                      </div>
                    </div>

                    {/* Contact & Connectivity Section */}
                    <section className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-sm bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-sm shrink-0">
                          <Phone size={16} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">
                            Connectivity
                          </h4>
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight mt-1 leading-none">
                            Communication Channels
                          </p>
                        </div>
                      </div>

                      {isEditMode ? (
                        <div className="bg-white p-2.5 rounded-sm border border-slate-200 shadow-sm space-y-2.5">
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
                        <div className="space-y-1.5">
                          {[
                            {
                              Icon: User,
                              label: "Contact Person",
                              value: selectedDonor.contactPerson,
                              color: "amber",
                              bg: "bg-amber-50/50",
                            },
                            {
                              Icon: Mail,
                              label: "Verified Email",
                              value: selectedDonor.email,
                              color: "blue",
                              bg: "bg-blue-50/50",
                            },
                            {
                              Icon: MapPin,
                              label: "Physical Address",
                              value: selectedDonor.address,
                              color: "purple",
                              bg: "bg-purple-50/50",
                            },
                          ].map((item, i) => (
                            <div
                              key={i}
                              className="group bg-white p-2.5 rounded-sm border border-slate-200 transition-all duration-300 border-b-2 border-b-transparent hover:border-b-[#22c55e] hover:bg-slate-50/30 shadow-sm"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-8 h-8 rounded-sm ${item.bg} flex items-center justify-center text-${item.color}-600 shrink-0 group-hover:scale-105 transition-transform duration-500`}
                                >
                                  <item.Icon size={16} strokeWidth={2.5} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 leading-none">
                                    {item.label}
                                  </p>
                                  <p className="text-[11px] font-black text-slate-800 leading-tight truncate uppercase tracking-tight mt-1">
                                    {item.value}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>

                    {/* Recent Donation History */}
                    {!isEditMode && (
                      <section className="space-y-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-sm bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                            <HistoryIcon size={16} strokeWidth={2.5} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">
                              Transaction History
                            </h4>
                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight mt-1 leading-none">
                              Recent Contributions
                            </p>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          {selectedDonor.donationHistory.map(
                            (item: DonationHistory, index: number) => (
                              <div
                                key={index}
                                className="group flex items-center gap-3 p-3 rounded-sm bg-white border border-slate-200 hover:border-hf-green/40 hover:bg-slate-50/30 transition-all duration-500 relative overflow-hidden shadow-sm"
                              >
                                <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-emerald-50/0 to-transparent group-hover:from-emerald-50/50 transition-colors" />
                                <div className="w-10 h-10 rounded-sm bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-hf-green/10 group-hover:text-hf-green transition-colors">
                                  <DollarSign size={18} strokeWidth={2.5} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-slate-900 leading-tight truncate">
                                    {item.event}
                                  </p>
                                  <p className="text-[10px] font-medium text-slate-500 uppercase tracking-tight">
                                    {item.date}
                                  </p>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="text-xs font-black text-hf-green">
                                    {formatCurrency(item.amount)}
                                  </p>
                                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                                    Allocated
                                  </p>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </section>
                    )}

                    {/* Verification Documents */}
                    {!isEditMode && (
                      <section className="space-y-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                            <FileText size={16} strokeWidth={2.5} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">
                              Legal & Compliance
                            </h4>
                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight mt-1 leading-none">
                              Identity Verification
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div
                            onClick={() => setIsPreviewOpen(true)}
                            className="p-3 rounded-sm bg-white border border-slate-200 transition-all duration-500 border-b-2 border-b-transparent hover:border-b-hf-green hover:bg-slate-50/30 shadow-sm flex items-center justify-between group cursor-pointer"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-sm bg-emerald-50 border border-emerald-100 flex items-center justify-center text-hf-green shrink-0 group-hover:scale-110 transition-transform">
                                <ShieldCheck size={18} strokeWidth={2.5} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-900 leading-tight truncate">
                                  Business_License.pdf
                                </p>
                                <div className="flex items-center gap-1.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-hf-green" />
                                  <span className="text-[9px] font-black text-hf-green uppercase tracking-widest">
                                    Verified
                                  </span>
                                  <span className="text-[9px] text-slate-400 font-bold ml-1">
                                    • 1.2 MB
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-slate-300 group-hover:text-hf-green transition-colors shrink-0">
                              <Eye size={16} strokeWidth={2.5} />
                            </div>
                          </div>
                        </div>
                      </section>
                    )}

                    {/* Actions Area */}
                    <div className="pt-2 flex gap-2">
                      {isEditMode ? (
                        <>
                          <button
                            onClick={() => setIsEditMode(false)}
                            className="flex-1 px-6 py-3 text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-sm border border-slate-200"
                          >
                            <RotateCcw size={14} />
                            Cancel
                          </button>
                          <ReusableButton
                            variant="primary"
                            className="flex-1 !bg-[#22c55e] hover:!bg-[#1ea34a] !text-white !font-black !px-4 !py-3 !text-[10px] uppercase tracking-widest !rounded-sm shadow-lg shadow-[#22c55e]/20"
                            onClick={handleUpdateDonor}
                          >
                            <Save size={14} />
                            Update Details
                          </ReusableButton>
                        </>
                      ) : (
                        <ReusableButton
                          variant="primary"
                          className="flex-1 !bg-[#22c55e] hover:!bg-[#1ea34a] !text-white !font-black !px-4 !py-3 !text-[10px] uppercase tracking-widest !rounded-sm shadow-lg shadow-[#22c55e]/20"
                          onClick={() => setIsEditMode(true)}
                        >
                          <Settings size={14} />
                          Edit Profile
                        </ReusableButton>
                      )}
                    </div>
                  </>
                )}
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
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
