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
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm relative">
        {/* Isolated Decoration Layer */}
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[300px] h-[300px] bg-[#22c55e] opacity-[0.03] blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 px-6 py-6 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-start w-full md:w-auto">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-slate-800 uppercase leading-none">
                Donation <span className="text-[#22c55e]">Hub</span>
              </h1>
            </div>
          </div>

          <button
            onClick={() => navigate("/ngo/needs/post")}
            className="group flex items-center gap-2 px-6 py-3 bg-[#22c55e] hover:bg-green-600 text-white rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-green-600/20 w-full md:w-auto justify-center"
          >
            <Plus size={16} className="font-black" />
            <span className="text-[10px] font-black uppercase tracking-widest pt-0.5">
              Post New Need
            </span>
          </button>
        </div>

        {/* Global Control Bar */}
        <div className="relative z-10 px-6 py-4 bg-slate-50/50 flex flex-col xl:flex-row items-center justify-between gap-6 border-t border-slate-100">
          {/* Left: Context Navigation */}
          <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-sm w-full xl:w-auto">
            {[
              { id: "marketplace", label: "All Requests" },
              { id: "my-requests", label: "My Requests" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-center gap-3 px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all transition-duration-300 w-1/2 xl:w-auto ${
                  activeTab === tab.id
                    ? "bg-[#22c55e] text-white shadow-lg shadow-green-500/20"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                }`}
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
                  placeholder={`Search ${
                    activeTab === "marketplace" ? "resources" : "your requests"
                  }...`}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl text-[11px] font-bold focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 transition-all shadow-sm border"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
            )}

            <div className="flex items-center gap-3 shrink-0">
              {/* View Switcher */}
              <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
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
                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <view.icon size={14} />
                    <span className="hidden sm:inline">{view.label}</span>
                  </button>
                ))}
              </div>

              {viewMode === "card" && activeTab === "marketplace" && (
                <div className="relative group/filter">
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 shadow-xl rounded-xl opacity-0 invisible group-hover/filter:opacity-100 group-hover/filter:visible transition-all z-50 overflow-hidden">
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
                              ? "bg-emerald-50 text-[#22c55e]"
                              : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button className="flex items-center justify-center w-10 h-10 bg-white border border-slate-200 text-slate-400 hover:text-[#22c55e] hover:border-[#22c55e]/30 rounded-xl transition-all shadow-sm">
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
          <div className="bg-white border border-slate-100 rounded-md shadow-sm p-2 overflow-hidden">
            <ReusableTable
              variant="compact"
              data={finalFilteredDonations}
              onRowClick={(donation: DonationRequest) => {
                if (activeTab === "my-requests") {
                  handleViewTracking(donation);
                }
              }}
              columns={[
                { name: "Reference ID", uid: "id", sortable: true },
                {
                  name: "Resource",
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
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest tabular-nums bg-slate-50 border border-slate-100 px-2 py-1 rounded-sm">
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
                          iconClassName="bg-white border border-slate-100 shadow-sm"
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
                          className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-sm ${
                            donation.sourceType === "DONOR"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {donation.sourceType}
                        </span>
                      </div>
                    );
                  case "metadata":
                    return activeTab === "marketplace" ? (
                      <div className="flex items-center gap-1.5 text-slate-500 py-1">
                        <MapPin size={12} className="text-[#22c55e]" />
                        <span className="text-[11px] font-extrabold tracking-tight tabular-nums">
                          {donation.distance}
                        </span>
                      </div>
                    ) : (
                      <div className="py-1">
                        <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit">
                          <Activity size={10} /> {donation.status}
                        </span>
                      </div>
                    );
                  case "time":
                    return (
                      <div className="flex items-center gap-1.5 text-slate-400 py-1">
                        <Clock size={11} />
                        <span className="text-[10px] font-black uppercase tracking-[0.1em] tabular-nums">
                          {donation.time}
                        </span>
                      </div>
                    );
                  case "urgency":
                    return (
                      <span
                        className={`px-2.5 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-widest border ${
                          donation.urgency === "High"
                            ? "bg-amber-50 text-amber-600 border-amber-100"
                            : "bg-green-50 text-[#22c55e] border-green-100"
                        }`}
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
                            className="!bg-white border border-slate-100 text-slate-400 hover:text-[#22c55e] hover:border-[#22c55e]/30 transition-all min-w-0 h-8 w-8 shadow-sm"
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
                className={`group bg-white border border-slate-100 rounded-2xl overflow-hidden flex flex-col transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-green-500/5 relative ${
                  activeTab === "my-requests"
                    ? "cursor-pointer hover:border-[#22c55e]/30"
                    : ""
                }`}
              >
                <div className="p-5 flex-grow flex flex-col items-center text-center">
                  {/* Top Indicator */}
                  <div className="w-full flex justify-between items-center mb-4">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform duration-500">
                      {donation.icon}
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest border ${
                        donation.urgency === "High"
                          ? "bg-amber-50 text-amber-600 border-amber-100"
                          : "bg-green-50 text-[#22c55e] border-green-100"
                      }`}
                    >
                      {donation.urgency}
                    </span>
                  </div>

                  {/* Title */}
                  <h4
                    className={`text-[15px] font-black tracking-tight leading-tight mb-3 px-2 ${
                      activeTab === "marketplace"
                        ? "text-[#22c55e]"
                        : "text-slate-800"
                    }`}
                  >
                    {donation.title}
                  </h4>

                  {/* Metadata Row */}
                  <div className="flex flex-col items-center gap-2 w-full">
                    <div className="flex items-center gap-2 bg-slate-50/50 pl-1.5 pr-3 py-1 rounded-full border border-slate-100">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black text-white border border-white/20 uppercase ${
                          donation.sourceType === "DONOR"
                            ? "bg-emerald-500"
                            : "bg-blue-500"
                        }`}
                      >
                        {donation.source.substring(0, 2)}
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">
                        {donation.source}
                      </span>
                    </div>

                    {activeTab === "marketplace" && (
                      <div className="flex items-center gap-1 text-slate-400">
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
                  <div className="flex items-center gap-1 px-3 py-1 bg-slate-50/50 rounded-full border border-slate-100/50">
                    <Clock size={8} className="text-slate-400" />
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
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
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-[#22c55e] hover:border-[#22c55e]/30 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all shadow-sm active:scale-95"
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
          title="Donation Intelligence"
          subtitle={`Tracking ID: #HF-${selectedRequest?.id}2024`}
          size="md"
        >
          {selectedRequest && (
            <div className="space-y-6 px-5 md:px-7 pb-10">
              {/* Hero Section */}
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-3 relative overflow-hidden">
                <div className="absolute top-3 right-3 flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                  <span className="text-[8px] font-black text-[#22c55e] uppercase tracking-widest">
                    LIVE SYSTEM
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black tracking-tighter text-slate-900 uppercase">
                      {selectedRequest.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#22c55e]/10 text-[#22c55e] text-[9px] font-black uppercase tracking-widest rounded-full border border-[#22c55e]/20">
                        {selectedRequest.status}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        • {selectedRequest.urgency} Urgency
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shrink-0">
                    <span className="text-2xl">{selectedRequest.icon}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  {selectedRequest.description ||
                    "Active donation request being processed through the HungerFree Intelligence Network."}
                </p>
              </div>

              {/* Resource Intelligence Grid */}
              <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100 grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest block">
                    QUANTITY
                  </span>
                  <span className="text-[10px] font-bold text-slate-700">
                    {selectedRequest.quantity || "Pending Estimation"}
                  </span>
                </div>
                <div className="space-y-1 border-x border-slate-100 px-2">
                  <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest block">
                    RESOURCE TYPE
                  </span>
                  <span className="text-[10px] font-bold text-slate-700">
                    {selectedRequest.resourceType || "General Food"}
                  </span>
                </div>
                <div className="space-y-1 pl-2">
                  <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest block">
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
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <Clock size={14} className="text-[#22c55e]" />
                    Live Tracking Activity
                  </h4>
                  <div className="relative space-y-4 before:absolute before:inset-0 before:ml-2.5 before:h-full before:w-0.5 before:bg-slate-100">
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
                          className={`z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 bg-white ${
                            step.completed
                              ? "border-[#22c55e]"
                              : "border-slate-200"
                          }`}
                        >
                          {step.completed && (
                            <div className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                          )}
                        </div>
                        <div className="flex flex-1 justify-between items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm hover:border-[#22c55e]/30 transition-all min-w-0">
                          <div className="min-w-0">
                            <p
                              className={`text-[10px] font-black uppercase tracking-wider truncate mb-0.5 ${
                                step.completed
                                  ? "text-slate-900"
                                  : "text-slate-300"
                              }`}
                            >
                              {step.status}
                            </p>
                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tight">
                              {step.date}
                            </p>
                          </div>
                          <span
                            className={`text-[10px] font-black tabular-nums shrink-0 ${
                              step.completed
                                ? "text-[#22c55e]"
                                : "text-slate-300"
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
                <div className="p-6 rounded-2xl border border-slate-100 bg-white space-y-4 hover:shadow-lg transition-all duration-500">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                      <MapPin size={16} className="text-[#22c55e]" />
                    </div>
                    Pickup Point
                  </div>
                  <div className="space-y-1">
                    <p className="text-[13px] font-black text-slate-900 uppercase tracking-tight">
                      {selectedRequest.source}
                    </p>
                    <p className="text-[11px] font-semibold text-slate-600 leading-relaxed">
                      {selectedRequest.status === "Available"
                        ? "Address Hidden (Revealed after acceptance)"
                        : selectedRequest.pickupAddress || "Verified Location"}
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-slate-100 bg-white space-y-4 hover:shadow-lg transition-all duration-500">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <Building2 size={16} className="text-blue-500" />
                    </div>
                    Delivery Point
                  </div>
                  <div className="space-y-1">
                    <p className="text-[13px] font-black text-slate-900 uppercase tracking-tight">
                      Hope Shelter Main
                    </p>
                    <p className="text-[11px] font-semibold text-slate-600 leading-relaxed">
                      {selectedRequest.deliveryAddress || "NGO Main Hub"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Personnel Section */}
              {selectedRequest.status !== "Available" && (
                <div className="p-8 rounded-2xl border border-slate-100 bg-white space-y-6 shadow-sm">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    Assigned Personnel
                  </h4>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-14 h-14 rounded-full bg-slate-50 border-4 border-slate-100 flex items-center justify-center text-[#22c55e] font-black text-xl shadow-sm shrink-0 uppercase">
                        {selectedRequest.volunteer?.name.charAt(0) || "V"}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <p className="text-[13px] font-black text-slate-900 uppercase tracking-tight truncate">
                          {selectedRequest.volunteer?.name || "Field Agent"}
                        </p>
                        <div className="flex items-center gap-3 whitespace-nowrap">
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                            <Star
                              className="fill-yellow-400 text-yellow-400"
                              size={10}
                            />
                            {selectedRequest.volunteer?.rating || "4.8"}
                          </span>
                          {selectedRequest.volunteer?.phone && (
                            <a
                              href={`tel:${selectedRequest.volunteer.phone.replace(/\s+/g, "")}`}
                              className="text-[10px] font-black text-slate-400/80 flex items-center gap-1.5 py-0.5 tracking-tight group cursor-pointer hover:text-[#22c55e] transition-colors"
                            >
                              <Phone
                                size={11}
                                className="text-slate-300 group-hover:text-[#22c55e] transition-colors"
                              />
                              {selectedRequest.volunteer.phone}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    {selectedRequest.volunteer?.phone && (
                      <a
                        href={`tel:${selectedRequest.volunteer.phone.replace(/\s+/g, "")}`}
                        className="w-11 h-11 rounded-full bg-white border border-slate-100 text-[#22c55e] flex items-center justify-center shadow-lg shadow-[#22c55e]/5 hover:shadow-[#22c55e]/20 hover:scale-105 active:scale-95 transition-all outline-none ring-offset-2 ring-green-100 hover:ring-2 shrink-0"
                      >
                        <Phone size={18} />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Info Note */}
              <div className="flex items-center gap-4 p-5 bg-blue-50 border border-blue-100 rounded-2xl group hover:border-blue-200 transition-colors duration-300">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-blue-100 group-hover:scale-110 transition-transform">
                  <Info className="text-blue-500" size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-blue-800 leading-relaxed">
                    Intelligence Tracking Active
                  </p>
                  <p className="text-[10px] font-medium text-blue-600/80 leading-relaxed">
                    Your donation is currently being tracked by our Intelligence
                    System. Live updates are provided by our field volunteers
                    via mobile app.
                  </p>
                </div>
              </div>
            </div>
          )}
        </ResuableDrawer>

        {/* Accept Donation Modal */}
        <ResuableModal
          isOpen={isAcceptModalOpen}
          onOpenChange={setIsAcceptModalOpen}
          title="Accept Donation"
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
                      <span>Accept & Assign Logistics</span>
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
                  <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-20 scale-150" />
                  <div className="w-16 h-16 bg-[#22c55e] rounded-full flex items-center justify-center relative z-10 shadow-lg shadow-green-500/20">
                    <Check className="text-white" size={32} strokeWidth={3} />
                  </div>
                </div>

                <div className="text-center space-y-3 z-10">
                  <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#22c55e] leading-none mb-1">
                    Synchronized
                  </h3>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">
                    Logistics Synchronized!
                  </h2>
                  <p className="text-[12px] font-bold text-slate-500 max-w-[320px] leading-relaxed mx-auto">
                    Resource{" "}
                    <span className="text-slate-900 font-black px-1.5 py-0.5 bg-slate-100 rounded-sm">
                      #{acceptingDonation?.id}
                    </span>{" "}
                    has been accepted and mission assigned to{" "}
                    <span className="text-[#22c55e] font-black">
                      {selectedVolunteer.name}
                    </span>{" "}
                    (Nearby Field Agent).
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-50">
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

                <p className="absolute bottom-2 text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-4">
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
                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-2.5">
                  <div className="w-9 h-9 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-lg shrink-0">
                    {acceptingDonation?.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-tight leading-tight mb-0.5 truncate">
                      {acceptingDonation?.title}
                    </h4>
                    <p className="text-[9px] font-black text-slate-400 flex items-center gap-1">
                      <Building2 size={10} className="text-slate-300" />
                      {acceptingDonation?.source}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2.5 text-emerald-600 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/50">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 border border-emerald-100 shadow-sm">
                      <Navigation size={12} className="text-[#22c55e]" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[9px] font-black uppercase tracking-[0.1em]">
                        Logistic Optimization
                      </p>
                      <p className="text-[9px] font-bold text-emerald-800/80 leading-relaxed">
                        By accepting, our system will automatically broadcast
                        this mission to nearby field agents for immediate
                        pickup.
                      </p>
                    </div>
                  </div>

                  {/* Nearby Volunteer Selection */}
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                        Nearby Field Agents
                      </span>
                      <span className="text-[8px] font-black text-[#22c55e] bg-white px-1 py-0.5 rounded-full border border-emerald-100 shadow-sm">
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
                              ? "bg-white border-[#22c55e]/30 shadow-sm"
                              : "bg-transparent border-transparent grayscale-[0.5] opacity-70 hover:opacity-100"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-black border uppercase shadow-inner transition-colors ${
                                selectedVolunteer.id === vol.id
                                  ? "bg-emerald-50 text-[#22c55e] border-emerald-100"
                                  : "bg-slate-100 text-slate-500 border-white"
                              }`}
                            >
                              {vol.initials}
                            </div>
                            <div>
                              <p
                                className={`text-[11px] font-black uppercase tracking-tight transition-colors ${
                                  selectedVolunteer.id === vol.id
                                    ? "text-slate-800"
                                    : "text-slate-500"
                                }`}
                              >
                                {vol.name}
                              </p>
                              <p className="text-[8px] font-black text-slate-400">
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
                    <div className="p-2.5 bg-white border border-slate-100 rounded-xl space-y-1 shadow-sm">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.1em]">
                        Urgency
                      </p>
                      <div className="flex items-center gap-1.5 pt-1 border-t border-slate-50">
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
                    <div className="p-2.5 bg-white border border-slate-100 rounded-xl space-y-1 shadow-sm">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.1em]">
                        Quantity
                      </p>
                      <div className="pt-1 border-t border-slate-50 flex items-center gap-1">
                        <Box size={10} className="text-slate-400" />
                        <p className="text-[12px] font-black text-slate-700 uppercase tracking-tight">
                          {acceptingDonation?.quantity || "Units"}
                        </p>
                      </div>
                    </div>
                    <div className="p-2.5 bg-white border border-slate-100 rounded-xl space-y-1 shadow-sm">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.1em]">
                        Value
                      </p>
                      <div className="pt-1 border-t border-slate-50">
                        <p className="text-[12px] font-black text-slate-700 uppercase tracking-tight">
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
