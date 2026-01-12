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
import { Plus, Eye, ChevronDown, Filter, X } from "lucide-react";
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
  const [donors] = useState<Donor[]>([
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
    status: string
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
    onOpen();
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
    if (filter === "type") setFilterType("All");
    if (filter === "status") setFilterStatus("All");
  };

  const closeDrawer = () => {
    onClose();
    // setTimeout(() => setSelectedDonor(null), 300);
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
                    0
                  )
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
                <Dropdown placement="bottom-end">
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
                className="flex flex-col gap-1 no-scrollbar border-b px-6 py-4"
                style={{ borderBottomColor: "var(--border-color)" }}
              >
                <div className="flex items-center justify-between">
                  <h2
                    className="text-xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Donor Details
                  </h2>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Account Overview
                  </span>
                  {selectedDonor && getStatusBadge(selectedDonor.status)}
                </div>
              </DrawerHeader>

              <DrawerBody className="px-6 py-4 space-y-6 overflow-y-auto no-scrollbar">
                {selectedDonor && (
                  <>
                    {/* Business Overview */}
                    <div
                      className="p-4 rounded-lg border"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.1))",
                        borderColor: "rgba(245, 158, 11, 0.2)",
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white bg-gradient-to-br from-amber-400 to-orange-600 shadow-md">
                          {selectedDonor.businessName
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h3
                            className="font-bold text-lg leading-tight"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {selectedDonor.businessName}
                          </h3>
                          <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mt-1">
                            {selectedDonor.type}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        className="p-3 rounded-lg border text-center"
                        style={{
                          backgroundColor: "var(--bg-secondary)",
                          borderColor: "var(--border-color)",
                        }}
                      >
                        <p
                          className="text-[10px] font-black uppercase tracking-widest mb-1"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Total Donated
                        </p>
                        <p
                          className="text-lg font-black"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {formatCurrency(selectedDonor.totalDonations)}
                        </p>
                      </div>
                      <div
                        className="p-3 rounded-lg border text-center"
                        style={{
                          backgroundColor: "var(--bg-secondary)",
                          borderColor: "var(--border-color)",
                        }}
                      >
                        <p
                          className="text-[10px] font-black uppercase tracking-widest mb-1"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Reward Points
                        </p>
                        <p className="text-lg font-black text-amber-600">
                          {selectedDonor.points.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3
                        className="text-sm font-semibold uppercase tracking-wider mb-3"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-amber-600 text-sm">👤</span>
                          </div>
                          <div>
                            <div
                              className="text-[10px] font-black uppercase tracking-widest"
                              style={{ color: "var(--text-muted)" }}
                            >
                              Contact Person
                            </div>
                            <div
                              className="text-sm font-bold"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {selectedDonor.contactPerson}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-amber-600 text-sm">📧</span>
                          </div>
                          <div>
                            <div
                              className="text-[10px] font-black uppercase tracking-widest"
                              style={{ color: "var(--text-muted)" }}
                            >
                              Email Address
                            </div>
                            <div
                              className="text-sm font-bold break-all"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {selectedDonor.email}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-amber-600 text-sm">📍</span>
                          </div>
                          <div>
                            <div
                              className="text-[10px] font-black uppercase tracking-widest"
                              style={{ color: "var(--text-muted)" }}
                            >
                              Office Address
                            </div>
                            <div
                              className="text-sm font-bold leading-relaxed"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {selectedDonor.address}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Donation History */}
                    <div>
                      <h3
                        className="text-sm font-semibold uppercase tracking-wider mb-3"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Recent Donations
                      </h3>
                      <div className="space-y-2">
                        {selectedDonor.donationHistory.map(
                          (item: DonationHistory, index: number) => (
                            <div
                              key={index}
                              className="p-3 rounded border flex items-center justify-between group hover:border-amber-200 transition-colors"
                              style={{
                                backgroundColor: "var(--bg-secondary)",
                                borderColor: "var(--border-color)",
                              }}
                            >
                              <div className="min-w-0">
                                <p
                                  className="text-xs font-bold truncate pr-2"
                                  style={{ color: "var(--text-primary)" }}
                                >
                                  {item.event}
                                </p>
                                <p
                                  className="text-[10px] font-medium"
                                  style={{ color: "var(--text-muted)" }}
                                >
                                  {item.date}
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-xs font-black text-amber-600">
                                  {formatCurrency(item.amount)}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Verification Documents */}
                    <div>
                      <h3
                        className="text-sm font-semibold uppercase tracking-wider mb-3"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Verification Documents
                      </h3>
                      <div className="space-y-3">
                        <div
                          onClick={() => setIsPreviewOpen(true)}
                          className="p-3 rounded border flex items-center justify-between group hover:border-amber-200 transition-colors cursor-pointer"
                          style={{
                            backgroundColor: "var(--bg-secondary)",
                            borderColor: "var(--border-color)",
                          }}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <p
                                className="text-xs font-bold truncate pr-2"
                                style={{ color: "var(--text-primary)" }}
                              >
                                Business_License.pdf
                              </p>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-black text-amber-600 uppercase">
                                  Verified
                                </span>
                                <span className="text-[9px] text-slate-400 font-bold">
                                  • 1.2 MB
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-slate-400 group-hover:text-[#22c55e] transition-colors shrink-0">
                            <Eye size={16} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions Area */}
                    <div className="pt-4 flex gap-2">
                      <ReusableButton
                        variant="primary"
                        className="flex-1 !bg-amber-500 hover:!bg-amber-600 !text-white !font-black !px-4 !py-6 !text-xs uppercase tracking-widest !rounded-sm shadow-lg shadow-amber-500/20"
                      >
                        Message Donor
                      </ReusableButton>
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
