import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Eye,
  LayoutGrid,
  Table,
  Clock,
  Package,
  Truck,
  User,
  Activity,
  Building2,
  Phone,
  Info,
  Star,
  Check,
  Loader2,
  AlertTriangle,
  Navigation,
  Box,
} from "lucide-react";
import { Button } from "@heroui/react";
import ReusableTable, {
  TableChip,
} from "../../../../global/components/resuable-components/table";
import ResuableDrawer from "../../../../global/components/resuable-components/drawer";
import ResuableButton from "../../../../global/components/resuable-components/button";
import ResuableModal from "../../../../global/components/resuable-components/modal";

interface DonationRequest {
  id: number;
  title: string;
  source: string;
  sourceType: "DONOR" | "NGO";
  isOwn: boolean;
  distance: string;
  icon: string;
  time: string;
  urgency: "High" | "Normal";
  status: "Available" | "Assigned" | "In Transit" | "Completed";
  progress: number;
  description?: string;
  quantity?: string;
  resourceType?: string;
  quality?: string;
  pickupAddress?: string;
  deliveryAddress?: string;
  volunteer?: {
    name: string;
    phone: string;
    rating: string;
  };
}

const DonationRequests = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"table" | "card">("card");
  const [activeTab, setActiveTab] = useState<"marketplace" | "my-requests">(
    "marketplace",
  );
  const [selectedRequest, setSelectedRequest] =
    useState<DonationRequest | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [acceptingDonation, setAcceptingDonation] =
    useState<DonationRequest | null>(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isAcceptSuccess, setIsAcceptSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | "DONOR" | "NGO">("ALL");

  const handleViewTracking = (donation: DonationRequest) => {
    if (activeTab === "my-requests" || donation.status !== "Available") {
      setSelectedRequest(donation);
      setIsDrawerOpen(true);
    }
  };

  const handleAcceptClick = useCallback((donation: DonationRequest) => {
    setAcceptingDonation(donation);
    setIsAcceptModalOpen(true);
  }, []);

  const nearbyVolunteers = [
    {
      id: 1,
      name: "Rahul Sharma",
      distance: "1.2 km away",
      rating: "4.9",
      initials: "RS",
    },
    {
      id: 2,
      name: "Priya Singh",
      distance: "1.8 km away",
      rating: "4.8",
      initials: "PS",
    },
    {
      id: 3,
      name: "Amit Kumar",
      distance: "2.4 km away",
      rating: "4.7",
      initials: "AK",
    },
  ];

  const [selectedVolunteer, setSelectedVolunteer] = useState(
    nearbyVolunteers[0],
  );
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const timerRef = React.useRef<any>(null);
  const startTimeRef = React.useRef<number>(0);
  const remainingTimeRef = React.useRef<number>(2500);

  const startCloseTimer = (duration: number) => {
    startTimeRef.current = Date.now();
    remainingTimeRef.current = duration;

    timerRef.current = setTimeout(() => {
      setIsAcceptSuccess(false);
      setIsAcceptModalOpen(false);
      setAcceptingDonation(null);
      remainingTimeRef.current = 2500;
    }, duration);
  };

  const clearCloseTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(
        0,
        remainingTimeRef.current - elapsed,
      );
    }
  };

  const handleConfirmAccept = () => {
    setIsAccepting(true);
    // Simulate system transmission
    setTimeout(() => {
      setIsAccepting(false);
      setIsAcceptSuccess(true);
      startCloseTimer(2500);
    }, 1500);
  };

  const handleMouseEnterSuccess = () => {
    setIsTimerPaused(true);
    clearCloseTimer();
  };

  const handleMouseLeaveSuccess = () => {
    setIsTimerPaused(false);
    if (remainingTimeRef.current > 0) {
      startCloseTimer(remainingTimeRef.current);
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    // Optional: Only clear selectedRequest after drawer closes to avoid flickering
    // setTimeout(() => setSelectedRequest(null), 300);
  };

  const donations: DonationRequest[] = [
    {
      id: 1,
      title: "Excess Food from Corporate Event",
      source: "Global Tech Inc.",
      sourceType: "DONOR",
      isOwn: false,
      distance: "2km away",
      icon: "🥗",
      time: "10 mins ago",
      urgency: "High",
      status: "Available",
      progress: 25,
      description:
        "Premium catering surplus from a corporate luncheon. Includes organic salads, appetizers, and grain bowls.",
      quantity: "25-30 Kg",
      resourceType: "Perishable",
      quality: "High (Verified)",
      pickupAddress: "White Town Tech Park, East Tower, Floor 12, Pondicherry",
      deliveryAddress: "Auroville Community Kitchen, Heritage Town, Hub A",
    },
    {
      id: 2,
      title: "Fresh Bakery Items",
      source: "Local Bakery",
      sourceType: "DONOR",
      isOwn: false,
      distance: "5km away",
      icon: "🥖",
      time: "45 mins ago",
      urgency: "Normal",
      status: "Available",
      progress: 25,
      description:
        "Freshly baked bread, rolls, and pastries from the morning batch. Nutritious and safely packed.",
      quantity: "15 Kg",
      resourceType: "Dry Bakery",
      quality: "Freshly Prepared",
      pickupAddress:
        "Mission Street Bakery, Shop 42, Heritage Town, Puducherry",
      deliveryAddress: "Puducherry Distribution Center, North Wing, Lawspet",
    },
    {
      id: 3,
      title: "Bulk Rice & Grains Needed",
      source: "Global Help NGO",
      sourceType: "NGO",
      isOwn: true,
      distance: "My Request",
      icon: "🌾",
      time: "1 hour ago",
      urgency: "High",
      status: "In Transit",
      progress: 75,
      description:
        "High-density nutritional support for regional relief programs. Seeking premium grade grains for long-term storage.",
      quantity: "150-200 Kg",
      resourceType: "Dry Rations",
      quality: "Grade A Export",
      pickupAddress: "Lawspet Grain Reserve, Warehouse 7, Block D, Puducherry",
      deliveryAddress: "Pondy Help NGO Main Storage, Ariankuppam, Sector 2",
      volunteer: {
        name: "Vikram Sethi",
        phone: "+91 96543 21098",
        rating: "4.9",
      },
    },
    {
      id: 4,
      title: "Emergency Water Cans",
      source: "Red Cross Local",
      sourceType: "NGO",
      isOwn: false,
      distance: "12km away",
      icon: "💧",
      time: "2 hours ago",
      urgency: "High",
      status: "Available",
      progress: 25,
      description:
        "Purified drinking water cans for emergency displacement camps. 20L pressurized containers.",
      quantity: "50 Units",
      resourceType: "Liquids",
      quality: "ISI Certified",
      pickupAddress: "Puducherry Municipal Water Works, West Gate, ECR Road",
      deliveryAddress: "NGO Relief Site, Paradise Beach Zone 12",
    },
  ];

  const finalFilteredDonations = donations
    .filter((d) => (activeTab === "marketplace" ? !d.isOwn : d.isOwn))
    .filter((d) => roleFilter === "ALL" || d.sourceType === roleFilter)
    .filter(
      (d) =>
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.id.toString().includes(searchQuery),
    );

  const handleAccept = useCallback(
    (donation: DonationRequest) => {
      handleAcceptClick(donation);
    },
    [handleAcceptClick],
  );

  return (
    <div className="w-full space-y-6 max-w-[1400px] mx-auto p-4 md:p-8 bg-transparent">
      <div
        className="rounded-xl border shadow-sm relative"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        {/* Isolated Decoration Layer */}
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[300px] h-[300px] bg-[#22c55e] opacity-[0.03] blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 px-6 py-6 border-b border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-start w-full md:w-auto">
            <div className="space-y-1">
              <h1
                className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                Donation <span className="text-hf-green">Hub</span>
              </h1>
            </div>
          </div>

          <button
            onClick={() => navigate("/ngo/needs/post")}
            className="group flex items-center gap-2 px-6 py-3 bg-[#22c55e] hover:bg-green-600 text-white rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-green-600/20 w-full md:w-auto justify-center"
          >
            <Plus size={16} className="font-black" />
            <span className="text-[10px] font-black uppercase tracking-widest pt-0.5">
              Post Request
            </span>
          </button>
        </div>

        {/* Global Control Bar */}
        <div
          className="relative z-10 px-6 py-4 flex flex-col xl:flex-row items-center justify-between gap-6 border-t"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-color)",
          }}
        >
          {/* Left: Context Navigation */}
          <div
            className="flex items-center gap-1 p-1 rounded-xl shadow-sm w-full xl:w-auto border"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
            }}
          >
            {[
              { id: "marketplace", label: "All Needs" },
              { id: "my-requests", label: "My Requests" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-center gap-3 px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all transition-duration-300 w-1/2 xl:w-auto ${
                  activeTab === tab.id
                    ? "bg-[#22c55e] text-white shadow-lg shadow-green-500/20"
                    : "hover:bg-[var(--bg-tertiary)]"
                }`}
                style={{
                  backgroundColor:
                    activeTab === tab.id ? undefined : "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                  color: activeTab === tab.id ? "white" : "var(--text-muted)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right: Search & View Controls */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
            {/* Search Hub */}
            {viewMode === "card" && (
              <div className="relative w-full md:w-[280px]">
                <Search
                  size={14}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl text-[11px] font-bold focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 transition-all shadow-sm border"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
            )}

            <div className="flex items-center gap-3 shrink-0">
              {/* View Switcher */}
              <div
                className="flex items-center gap-1 p-1 rounded-xl shadow-sm border"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                }}
              >
                {[
                  { id: "table", icon: Table, label: "Table" },
                  { id: "card", icon: LayoutGrid, label: "Cards" },
                ].map((view) => (
                  <button
                    key={view.id}
                    onClick={() => setViewMode(view.id as any)}
                    className={`flex items-center gap-2.5 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      viewMode === view.id
                        ? "bg-[#22c55e] text-white shadow-lg shadow-green-500/20"
                        : "hover:bg-[var(--bg-secondary)]"
                    }`}
                    style={{
                      backgroundColor:
                        viewMode === view.id ? undefined : "var(--bg-primary)",
                      borderColor: "var(--border-color)",
                      color:
                        viewMode === view.id ? "white" : "var(--text-muted)",
                    }}
                  >
                    <view.icon size={14} />
                    <span className="hidden sm:inline">{view.label}</span>
                  </button>
                ))}
              </div>

              {viewMode === "card" && activeTab === "marketplace" && (
                <div className="relative group/filter">
                  <div
                    className="absolute right-0 top-full mt-2 w-48 shadow-xl rounded-xl opacity-0 invisible group-hover/filter:opacity-100 group-hover/filter:visible transition-all z-50 overflow-hidden border"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <div className="p-2 space-y-1">
                      {[
                        { value: "ALL", label: "All Entities" },
                        { value: "DONOR", label: "Donors Only" },
                        { value: "NGO", label: "NGOs Only" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setRoleFilter(opt.value as any)}
                          className={`w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors ${
                            roleFilter === opt.value
                              ? "bg-emerald-500/10 text-[#22c55e]"
                              : "text-[var(--text-muted)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-xl transition-all shadow-sm border"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-muted)",
                    }}
                  >
                    <Filter size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Content Based on View Mode */}
      <div className="h-auto">
        {viewMode === "table" && (
          <div
            className="border rounded-md shadow-sm p-2 overflow-hidden"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
            }}
          >
            <ReusableTable
              variant="compact"
              data={finalFilteredDonations}
              onRowClick={(donation: DonationRequest) => {
                if (activeTab === "my-requests") {
                  handleViewTracking(donation);
                }
              }}
              columns={[
                { name: "ID", uid: "id", sortable: true },
                {
                  name: "Item",
                  uid: "title",
                  sortable: true,
                  align: "start",
                },
                { name: "Source", uid: "source", sortable: true },
                { name: "Role", uid: "sourceType", sortable: true },
                {
                  name: activeTab === "marketplace" ? "Distance" : "Status",
                  uid: "metadata",
                  sortable: true,
                },
                { name: "Posted", uid: "time", sortable: false },
                { name: "Urgency", uid: "urgency", sortable: true },
                { name: "Actions", uid: "actions", sortable: false },
              ]}
              renderCell={(donation: DonationRequest, columnKey: React.Key) => {
                switch (columnKey) {
                  case "id":
                    return (
                      <div className="py-1">
                        <span
                          className="text-[10px] font-black uppercase tracking-widest tabular-nums border px-2 py-1 rounded-sm"
                          style={{
                            backgroundColor: "var(--bg-secondary)",
                            borderColor: "var(--border-color)",
                            color: "var(--text-muted)",
                          }}
                        >
                          #HF-{donation.id}024
                        </span>
                      </div>
                    );
                  case "title":
                    return (
                      <div className="py-1">
                        <TableChip
                          text={donation.title}
                          icon={
                            <span className="text-lg">{donation.icon}</span>
                          }
                          iconClassName="shadow-sm border"
                          maxWidth="max-w-[280px]"
                        />
                      </div>
                    );
                  case "source":
                    return (
                      <div className="py-1">
                        <TableChip
                          text={donation.source}
                          initials={donation.source.substring(0, 2)}
                          iconClassName={
                            donation.sourceType === "DONOR"
                              ? "bg-emerald-500 text-white"
                              : "bg-blue-500 text-white"
                          }
                        />
                      </div>
                    );
                  case "sourceType":
                    return (
                      <div className="py-1">
                        <span
                          className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border shadow-sm"
                          style={{
                            backgroundColor:
                              donation.sourceType === "DONOR"
                                ? "rgba(16, 185, 129, 0.08)"
                                : "rgba(59, 130, 246, 0.08)",
                            borderColor:
                              donation.sourceType === "DONOR"
                                ? "rgba(16, 185, 129, 0.2)"
                                : "rgba(59, 130, 246, 0.2)",
                            color:
                              donation.sourceType === "DONOR"
                                ? "#10b981"
                                : "#3b82f6",
                          }}
                        >
                          {donation.sourceType}
                        </span>
                      </div>
                    );
                  case "metadata":
                    return activeTab === "marketplace" ? (
                      <div
                        className="flex items-center gap-1.5 py-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <MapPin size={12} className="text-[#22c55e]" />
                        <span className="text-[11px] font-extrabold tracking-tight tabular-nums">
                          {donation.distance}
                        </span>
                      </div>
                    ) : (
                      <div className="py-1">
                        <span
                          className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit border"
                          style={{
                            backgroundColor: "rgba(59, 130, 246, 0.08)",
                            borderColor: "rgba(59, 130, 246, 0.2)",
                            color: "var(--color-blue)",
                          }}
                        >
                          <Activity size={10} /> {donation.status}
                        </span>
                      </div>
                    );
                  case "time":
                    return (
                      <div
                        className="flex items-center gap-1.5 py-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <Clock size={11} />
                        <span className="text-[10px] font-black uppercase tracking-[0.1em] tabular-nums">
                          {donation.time}
                        </span>
                      </div>
                    );
                  case "urgency":
                    return (
                      <span
                        className="px-2.5 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-widest border"
                        style={{
                          backgroundColor:
                            donation.urgency === "High"
                              ? "rgba(245, 158, 11, 0.08)"
                              : "rgba(34, 197, 94, 0.08)",
                          borderColor:
                            donation.urgency === "High"
                              ? "rgba(245, 158, 11, 0.2)"
                              : "rgba(34, 197, 94, 0.2)",
                          color:
                            donation.urgency === "High" ? "#f59e0b" : "#22c55e",
                        }}
                      >
                        {donation.urgency}
                      </span>
                    );
                  case "actions":
                    return (
                      <div className="flex items-center gap-2 justify-end">
                        {activeTab === "marketplace" ? (
                          <Button
                            size="sm"
                            className="h-8 px-4 rounded-md text-[10px] font-black tracking-widest uppercase shadow-sm bg-[#22c55e] hover:bg-green-600 text-white"
                            onPress={() => handleAcceptClick(donation)}
                          >
                            <div className="flex items-center gap-2">
                              <CheckCircle2 size={12} />
                              <span>Accept</span>
                            </div>
                          </Button>
                        ) : (
                          <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewTracking(donation);
                            }}
                            className="transition-all min-w-0 h-8 w-8 shadow-sm border"
                            style={{
                              backgroundColor: "var(--bg-primary)",
                              borderColor: "var(--border-color)",
                              color: "var(--text-muted)",
                            }}
                            title="View Intelligence Details"
                          >
                            <Eye size={15} />
                          </Button>
                        )}
                      </div>
                    );
                  default:
                    return null;
                }
              }}
            />
          </div>
        )}

        {viewMode === "card" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {finalFilteredDonations.map((donation) => (
              <div
                key={donation.id}
                onClick={() => {
                  if (activeTab === "my-requests") {
                    handleViewTracking(donation);
                  }
                }}
                className={`group border rounded-2xl overflow-hidden flex flex-col transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-green-500/5 relative ${
                  activeTab === "my-requests"
                    ? "cursor-pointer hover:border-[#22c55e]/30"
                    : ""
                }`}
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="p-5 flex-grow flex flex-col items-center text-center">
                  {/* Top Indicator */}
                  <div className="w-full flex justify-between items-center mb-4">
                    <div
                      className="w-8 h-8 rounded-lg border flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform duration-500"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      {donation.icon}
                    </div>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest border"
                      style={{
                        backgroundColor:
                          donation.urgency === "High"
                            ? "rgba(245, 158, 11, 0.08)"
                            : "rgba(34, 197, 94, 0.08)",
                        borderColor:
                          donation.urgency === "High"
                            ? "rgba(245, 158, 11, 0.2)"
                            : "rgba(34, 197, 94, 0.2)",
                        color:
                          donation.urgency === "High" ? "#f59e0b" : "#22c55e",
                      }}
                    >
                      {donation.urgency}
                    </span>
                  </div>

                  {/* Title */}
                  <h4
                    className={`text-[15px] font-black tracking-tight leading-tight mb-3 px-2 ${
                      activeTab === "marketplace" ? "text-[#22c55e]" : ""
                    }`}
                    style={{
                      color:
                        activeTab === "marketplace"
                          ? undefined
                          : "var(--text-primary)",
                    }}
                  >
                    {donation.title}
                  </h4>

                  {/* Metadata Row */}
                  <div className="flex flex-col items-center gap-2 w-full">
                    <div
                      className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black text-white border border-white/20 uppercase ${
                          donation.sourceType === "DONOR"
                            ? "bg-emerald-500"
                            : "bg-blue-500"
                        }`}
                      >
                        {donation.source.substring(0, 2)}
                      </div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {donation.source}
                      </span>
                    </div>

                    {activeTab === "marketplace" && (
                      <div
                        className="flex items-center gap-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <MapPin size={10} className="text-[#22c55e]" />
                        <span className="text-[9px] font-black uppercase tracking-wider">
                          {donation.distance}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action Area */}
                <div className="px-5 pb-5 pt-0 bg-transparent flex flex-col items-center gap-3">
                  <div
                    className="flex items-center gap-1 px-3 py-1 rounded-full border"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <Clock
                      size={8}
                      className="text-muted"
                      style={{ color: "var(--text-muted)" }}
                    />
                    <span
                      className="text-[8px] font-bold uppercase tracking-widest"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {donation.time}
                    </span>
                  </div>

                  <div className="w-full">
                    {activeTab === "marketplace" ? (
                      <button
                        onClick={() => handleAccept(donation)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#22c55e] hover:bg-green-600 text-white rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-green-500/10 active:scale-95"
                      >
                        <CheckCircle2 size={12} /> Accept
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewTracking(donation);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all shadow-sm active:scale-95 border"
                        style={{
                          backgroundColor: "var(--bg-primary)",
                          borderColor: "var(--border-color)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <Eye size={12} /> Live Trace
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Live Tracking Drawer */}
        <ResuableDrawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          title="Donation Info"
          subtitle={`ID: #HF-${selectedRequest?.id}2024`}
          size="md"
          hideHeaderBorder={true}
        >
          {selectedRequest && (
            <div className="space-y-6 p-3 sm:p-4 lg:p-5">
              {/* Hero Section */}
              <div
                className="p-5 rounded-sm border space-y-3 relative overflow-hidden"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-hf-green animate-pulse" />
                      <span className="text-[10px] font-black text-hf-green uppercase tracking-[0.2em]">
                        LIVE
                      </span>
                    </div>
                    <h3
                      className="text-xl md:text-2xl font-black tracking-tighter uppercase leading-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {selectedRequest.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 bg-hf-green/10 text-hf-green text-[9px] font-black uppercase tracking-widest rounded-md border border-hf-green/20">
                        {selectedRequest.status}
                      </span>
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest opacity-60"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        • {selectedRequest.urgency} Urgency
                      </span>
                    </div>
                  </div>
                  <div
                    className="w-14 h-14 rounded-sm flex items-center justify-center border shrink-0"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <span className="text-3xl">{selectedRequest.icon}</span>
                  </div>
                </div>

                <p
                  className="text-[11px] font-medium leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {selectedRequest.description ||
                    "Active donation request being processed through the HungerFree Intelligence Network."}
                </p>
              </div>

              {/* Resource Intelligence Grid */}
              <div
                className="rounded-sm p-4 border grid grid-cols-3 gap-2"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="space-y-1">
                  <span
                    className="text-[7px] font-black uppercase tracking-widest block"
                    style={{ color: "var(--text-muted)" }}
                  >
                    AMOUNT
                  </span>
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {selectedRequest.quantity || "Pending Estimation"}
                  </span>
                </div>
                <div
                  className="space-y-1 border-x px-2"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <span
                    className="text-[7px] font-black uppercase tracking-widest block"
                    style={{ color: "var(--text-muted)" }}
                  >
                    TYPE
                  </span>
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {selectedRequest.resourceType || "General Food"}
                  </span>
                </div>
                <div className="space-y-1 pl-2">
                  <span
                    className="text-[7px] font-black uppercase tracking-widest block"
                    style={{ color: "var(--text-muted)" }}
                  >
                    QUALITY
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600">
                    {selectedRequest.quality || "Verified Good"}
                  </span>
                </div>
              </div>

              {/* Progress Timeline Section - ONLY AFTER ACCEPTANCE */}
              {selectedRequest.status !== "Available" && (
                <div className="space-y-4">
                  <h4
                    className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <Clock size={14} className="text-[#22c55e]" />
                    Live Status
                  </h4>
                  <div className="relative space-y-4 before:absolute before:inset-0 before:ml-2.5 before:h-full before:w-0.5 before:bg-[var(--border-color)]">
                    {[
                      {
                        status: selectedRequest.isOwn
                          ? "Need Broadcasted"
                          : "Request Posted",
                        time: "10:45 AM",
                        date: "Today",
                        icon: Package,
                        completed: true,
                      },
                      {
                        status: selectedRequest.isOwn
                          ? "Volunteer Accepted"
                          : "Volunteer Assigned",
                        time: "11:15 AM",
                        date: "Today",
                        icon: User,
                        completed: true,
                      },
                      {
                        status: "In Transit",
                        time: "Sensing...",
                        date: "Active",
                        icon: Truck,
                        completed:
                          selectedRequest.status === "In Transit" ||
                          selectedRequest.status === "Completed",
                      },
                      {
                        status: "Delivery Confirmed",
                        time: "-- : --",
                        date: "Pending",
                        icon: CheckCircle2,
                        completed: selectedRequest.status === "Completed",
                      },
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className="relative flex items-center gap-4 pl-1"
                      >
                        <div
                          className={`z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                            step.completed
                              ? "border-[#22c55e]"
                              : "border-[var(--border-color)]"
                          }`}
                          style={{ backgroundColor: "var(--bg-primary)" }}
                        >
                          {step.completed && (
                            <div className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                          )}
                        </div>
                        <div
                          className="flex flex-1 justify-between items-center gap-3 p-2.5 rounded-sm border transition-all min-w-0"
                          style={{
                            backgroundColor: "var(--bg-primary)",
                            borderColor: "var(--border-color)",
                          }}
                        >
                          <div className="min-w-0">
                            <p
                              className={`text-[10px] font-black uppercase tracking-wider truncate mb-0.5 ${
                                step.completed
                                  ? "text-[var(--text-primary)]"
                                  : "text-[var(--text-muted)]"
                              }`}
                            >
                              {step.status}
                            </p>
                            <p
                              className="text-[8px] font-bold uppercase tracking-tight"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {step.date}
                            </p>
                          </div>
                          <span
                            className={`text-[10px] font-black tabular-nums shrink-0 ${
                              step.completed
                                ? "text-[#22c55e]"
                                : "text-[var(--text-muted)]"
                            }`}
                          >
                            {step.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Points Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className="p-6 rounded-sm border space-y-4 transition-all duration-500"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div
                    className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center border"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <MapPin size={16} className="text-[#22c55e]" />
                    </div>
                    Pickup Point
                  </div>
                  <div className="space-y-1">
                    <p
                      className="text-[13px] font-black uppercase tracking-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {selectedRequest.source}
                    </p>
                    <p
                      className="text-[11px] font-semibold leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {selectedRequest.status === "Available"
                        ? "Address Hidden (Revealed after acceptance)"
                        : selectedRequest.pickupAddress || "Verified Location"}
                    </p>
                  </div>
                </div>

                <div
                  className="p-6 rounded-sm border space-y-4 transition-all duration-500"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div
                    className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center border"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <Building2 size={16} className="text-blue-500" />
                    </div>
                    Delivery Point
                  </div>
                  <div className="space-y-1">
                    <p
                      className="text-[13px] font-black uppercase tracking-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Hope Shelter Main
                    </p>
                    <p
                      className="text-[11px] font-semibold leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {selectedRequest.deliveryAddress || "NGO Main Hub"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Field Agent Identification Unit */}
              {selectedRequest.status !== "Available" && (
                <div className="space-y-3 pt-2">
                  <h4
                    className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <User size={14} className="text-hf-green" />
                    Field Agent
                  </h4>
                  <div
                    className="p-3 rounded-sm border border-dashed flex items-center gap-4 transition-all duration-300 shadow-sm shadow-hf-green/5 overflow-hidden"
                    style={{
                      backgroundColor: "rgba(34, 197, 94, 0.03)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    {/* Agent Identity Profile */}
                    <div
                      className="w-11 h-11 rounded-sm border flex items-center justify-center shrink-0 relative"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "rgba(34, 197, 128, 0.2)",
                      }}
                    >
                      <span className="text-lg font-black text-hf-green uppercase">
                        {selectedRequest.volunteer?.name.charAt(0) || "V"}
                      </span>
                      {/* Operational Status Indicator */}
                      <div className="absolute -top-1 -right-1 flex items-center justify-center">
                        <div className="absolute w-3 h-3 rounded-full bg-hf-green/20 animate-ping" />
                        <div className="w-2 h-2 rounded-full bg-hf-green border border-[var(--bg-primary)] shadow-sm" />
                      </div>
                    </div>

                    {/* Agent Identification Data */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="space-y-0.5">
                        <p
                          className="text-[13px] font-black uppercase tracking-tight leading-tight truncate"
                          style={{ color: "var(--text-primary)" }}
                          title={selectedRequest.volunteer?.name}
                        >
                          {selectedRequest.volunteer?.name || "Field Agent"}
                        </p>

                        <div className="flex items-center gap-2">
                          <div
                            className="flex items-center gap-1 px-1 py-0.5 rounded-sm border shrink-0"
                            style={{
                              backgroundColor: "rgba(245, 158, 11, 0.05)",
                              borderColor: "rgba(245, 158, 11, 0.2)",
                            }}
                          >
                            <Star
                              className="fill-yellow-400 text-yellow-400"
                              size={8}
                            />
                            <span className="text-[9px] font-black text-yellow-600 tabular-nums">
                              {selectedRequest.volunteer?.rating || "4.8"}
                            </span>
                          </div>
                          <span className="text-[8px] font-black uppercase tracking-[0.1em] text-hf-green/60 px-2 border-l border-[var(--border-color)] truncate">
                            Verified Expert
                          </span>
                        </div>
                      </div>

                      {selectedRequest.volunteer?.phone && (
                        <div className="flex items-center gap-1.5 pt-1 border-t border-[var(--border-color)] border-dotted">
                          <Phone
                            size={9}
                            className="text-hf-green opacity-60 shrink-0"
                          />
                          <p
                            className="text-[10px] font-bold tracking-wider tabular-nums opacity-60 truncate"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {selectedRequest.volunteer.phone}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Primary Action Button */}
                    {selectedRequest.volunteer?.phone && (
                      <a
                        href={`tel:${selectedRequest.volunteer.phone.replace(/\s+/g, "")}`}
                        className="w-10 h-10 rounded-sm bg-hf-green flex items-center justify-center shadow-lg shadow-hf-green/10 hover:bg-emerald-600 transition-all duration-300 group shrink-0"
                      >
                        <Phone
                          size={18}
                          className="text-white group-hover:rotate-12 transition-transform"
                        />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </ResuableDrawer>

        {/* Accept Donation Modal */}
        <ResuableModal
          isOpen={isAcceptModalOpen}
          onOpenChange={setIsAcceptModalOpen}
          title="Confirm Acceptance"
          footer={
            !isAcceptSuccess && (
              <div className="flex items-center justify-end gap-3">
                <ResuableButton
                  variant="ghost"
                  size="sm"
                  disabled={isAccepting}
                  onClick={() => setIsAcceptModalOpen(false)}
                >
                  Cancel
                </ResuableButton>
                <ResuableButton
                  variant="primary"
                  size="md"
                  disabled={isAccepting}
                  onClick={handleConfirmAccept}
                  className="bg-[#22c55e] hover:bg-green-600 shadow-lg shadow-green-500/20 px-5 py-1.5 !rounded-lg"
                >
                  {isAccepting ? (
                    <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider">
                      <Loader2 size={13} className="animate-spin" />
                      <span>Assigning...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider">
                      <Truck size={13} />
                      <span>Confirm & Assign</span>
                    </div>
                  )}
                </ResuableButton>
              </div>
            )
          }
        >
          <div className="py-4">
            {isAcceptSuccess ? (
              <div
                className="relative flex flex-col items-center justify-center py-12 overflow-hidden animate-in fade-in zoom-in duration-500 cursor-default"
                onMouseEnter={handleMouseEnterSuccess}
                onMouseLeave={handleMouseLeaveSuccess}
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 rounded-full bg-emerald-100 dark:bg-emerald-900/40 animate-ping opacity-20 scale-150" />
                  <div className="w-16 h-16 bg-[#22c55e] rounded-full flex items-center justify-center relative z-10 shadow-lg shadow-green-500/20">
                    <Check className="text-white" size={32} strokeWidth={3} />
                  </div>
                </div>

                <div className="text-center space-y-3 z-10">
                  <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#22c55e] leading-none mb-1">
                    Assigned
                  </h3>
                  <h2
                    className="text-xl font-black tracking-tight leading-none uppercase"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Mission Assigned!
                  </h2>
                  <p
                    className="text-[12px] font-bold max-w-[320px] leading-relaxed mx-auto"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Resource{" "}
                    <span
                      className="font-black px-1.5 py-0.5 rounded-sm"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        color: "var(--text-primary)",
                      }}
                    >
                      #{acceptingDonation?.id}
                    </span>{" "}
                    has been accepted and mission assigned to{" "}
                    <span className="text-[#22c55e] font-black">
                      {selectedVolunteer.name}
                    </span>{" "}
                    (Nearby Field Agent).
                  </p>
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ backgroundColor: "var(--bg-secondary)" }}
                >
                  <div
                    className={`h-full bg-[#22c55e] ${isTimerPaused ? "animate-none" : "animate-[progress-shrink_2.5s_linear_forwards]"}`}
                    style={{
                      width: isTimerPaused
                        ? `${(remainingTimeRef.current / 2500) * 100}%`
                        : undefined,
                      animationDuration: `${remainingTimeRef.current}ms`,
                    }}
                  />
                </div>

                <p
                  className="absolute bottom-2 text-[9px] font-bold uppercase tracking-widest mt-4"
                  style={{ color: "var(--text-muted)" }}
                >
                  {isTimerPaused ? "Timer Paused" : "Closing automatically..."}
                </p>

                <style>{`
                  @keyframes progress-shrink {
                    from { width: ${(remainingTimeRef.current / 2500) * 100}%; }
                    to { width: 0%; }
                  }
                `}</style>
              </div>
            ) : (
              <div className="space-y-2">
                <div
                  className="p-2.5 border rounded-2xl flex items-start gap-2.5"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl shadow-sm border flex items-center justify-center text-lg shrink-0"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    {acceptingDonation?.icon}
                  </div>
                  <div className="min-w-0">
                    <h4
                      className="text-[13px] font-black uppercase tracking-tight leading-tight mb-0.5 truncate"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {acceptingDonation?.title}
                    </h4>
                    <p
                      className="text-[9px] font-black flex items-center gap-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Building2 size={10} className="opacity-50" />
                      {acceptingDonation?.source}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div
                    className="flex items-start gap-2.5 p-2.5 rounded-xl border"
                    style={{
                      backgroundColor: "rgba(34, 197, 94, 0.08)",
                      borderColor: "rgba(34, 197, 94, 0.2)",
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border shadow-sm"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "rgba(34, 197, 94, 0.2)",
                      }}
                    >
                      <Navigation size={12} className="text-[#22c55e]" />
                    </div>
                    <div className="space-y-0.5">
                      <p
                        className="text-[9px] font-black uppercase tracking-[0.1em]"
                        style={{ color: "var(--color-emerald-dark)" }}
                      >
                        Logistic Optimization
                      </p>
                      <p
                        className="text-[9px] font-bold leading-relaxed opacity-80"
                        style={{ color: "var(--color-emerald-dark)" }}
                      >
                        By accepting, our system will automatically broadcast
                        this mission to nearby field agents for immediate
                        pickup.
                      </p>
                    </div>
                  </div>

                  {/* Nearby Volunteer Selection */}
                  <div
                    className="p-2.5 border rounded-xl space-y-1.5"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[8px] font-black uppercase tracking-widest"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Nearby Field Agents
                      </span>
                      <span
                        className="text-[8px] font-black bg-white dark:bg-slate-900 border px-1 py-0.5 rounded-full shadow-sm"
                        style={{
                          color: "var(--color-emerald)",
                          borderColor: "rgba(34, 197, 94, 0.2)",
                        }}
                      >
                        {nearbyVolunteers.length} Active
                      </span>
                    </div>

                    <div className="space-y-1">
                      {nearbyVolunteers.map((vol) => (
                        <div
                          key={vol.id}
                          onClick={() => setSelectedVolunteer(vol)}
                          className={`flex items-center justify-between p-1.5 rounded-lg cursor-pointer transition-all duration-300 border ${
                            selectedVolunteer.id === vol.id
                              ? "shadow-sm"
                              : "bg-transparent border-transparent grayscale-[0.5] opacity-70 hover:opacity-100"
                          }`}
                          style={{
                            backgroundColor:
                              selectedVolunteer.id === vol.id
                                ? "var(--bg-primary)"
                                : undefined,
                            borderColor:
                              selectedVolunteer.id === vol.id
                                ? "rgba(34, 197, 94, 0.3)"
                                : undefined,
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-black border uppercase shadow-inner transition-colors"
                              style={{
                                backgroundColor:
                                  selectedVolunteer.id === vol.id
                                    ? "rgba(34, 197, 94, 0.08)"
                                    : "var(--bg-primary)",
                                borderColor:
                                  selectedVolunteer.id === vol.id
                                    ? "rgba(34, 197, 94, 0.2)"
                                    : "var(--border-color)",
                                color:
                                  selectedVolunteer.id === vol.id
                                    ? "#22c55e"
                                    : "var(--text-muted)",
                              }}
                            >
                              {vol.initials}
                            </div>
                            <div>
                              <p
                                className="text-[11px] font-black uppercase tracking-tight transition-colors"
                                style={{
                                  color:
                                    selectedVolunteer.id === vol.id
                                      ? "var(--text-primary)"
                                      : "var(--text-secondary)",
                                }}
                              >
                                {vol.name}
                              </p>
                              <p
                                className="text-[8px] font-black"
                                style={{ color: "var(--text-muted)" }}
                              >
                                {vol.distance} • ★ {vol.rating}
                              </p>
                            </div>
                          </div>
                          {selectedVolunteer.id === vol.id && (
                            <div className="flex items-center gap-1 animate-in fade-in zoom-in duration-300">
                              <div className="w-1 h-1 rounded-full bg-[#22c55e] animate-pulse" />
                              <span className="text-[7px] font-black text-[#22c55e] uppercase tracking-[0.05em] leading-none">
                                Selected
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div
                      className="p-2.5 border rounded-xl space-y-1 shadow-sm"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <p
                        className="text-[8px] font-black uppercase tracking-[0.1em]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Urgency
                      </p>
                      <div className="flex items-center gap-1.5 pt-1 border-t border-[var(--border-color)]">
                        <AlertTriangle
                          size={10}
                          className={
                            acceptingDonation?.urgency === "High"
                              ? "text-red-500"
                              : "text-amber-500"
                          }
                        />
                        <p
                          className={`text-[12px] font-black uppercase tracking-tight ${acceptingDonation?.urgency === "High" ? "text-red-500" : "text-amber-600"}`}
                        >
                          {acceptingDonation?.urgency}
                        </p>
                      </div>
                    </div>
                    <div
                      className="p-2.5 border rounded-xl space-y-1 shadow-sm"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <p
                        className="text-[8px] font-black uppercase tracking-[0.1em]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Quantity
                      </p>
                      <div className="pt-1 border-t border-[var(--border-color)] flex items-center gap-1">
                        <Box size={10} style={{ color: "var(--text-muted)" }} />
                        <p
                          className="text-[12px] font-black uppercase tracking-tight"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {acceptingDonation?.quantity || "Units"}
                        </p>
                      </div>
                    </div>
                    <div
                      className="p-2.5 border rounded-xl space-y-1 shadow-sm"
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <p
                        className="text-[8px] font-black uppercase tracking-[0.1em]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Value
                      </p>
                      <div className="pt-1 border-t border-[var(--border-color)]">
                        <p
                          className="text-[12px] font-black uppercase tracking-tight"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Premium
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ResuableModal>
      </div>
    </div>
  );
};

export default DonationRequests;
