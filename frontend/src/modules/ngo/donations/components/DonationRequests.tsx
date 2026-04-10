import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ngoDonationsService } from "../api/donations.api";
import { ngoNeedsService } from "../../needs/api/needs.api";
import { toast } from "sonner";
import { useAuthStore } from "../../../../global/contexts/auth-store";
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
  Star,
  Check,
  Loader2,
  AlertTriangle,
  Navigation,
  Box,
  ChevronUp,
  ChevronDown,
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
  expiryTime?: string;
  origin: "DONATION" | "NEED";
  isMine?: boolean;
  isSupported?: boolean;
  volunteer?: {
    name: string;
    phone: string;
    rating: string;
  };
}

const DonationRequests = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [viewMode, setViewMode] = useState<"table" | "card">("card");
  const [activeTab, setActiveTab] = useState<"marketplace" | "my-requests" | "community-requests">(
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
  const [supportQty, setSupportQty] = useState("");
  const [supportPhone, setSupportPhone] = useState("");

  // Sync state when modal opens for a NEED
  useEffect(() => {
    if (isAcceptModalOpen && acceptingDonation?.origin === "NEED") {
      // Pre-fill quantity (strip 'packs', 'kg' etc if possible or just use string)
      setSupportQty(acceptingDonation.quantity?.split(' ')[0] || "");
      // Pre-fill phone from user profile
      const phone = user?.ngo_profile?.contact_number || user?.profile?.phone || "";
      setSupportPhone(phone);
    }
  }, [isAcceptModalOpen, acceptingDonation, user]);

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

  const handleConfirmAccept = async () => {
    if (!acceptingDonation) return;
    
    setIsAccepting(true);
    try {
      if (acceptingDonation.origin === "NEED") {
        await ngoDonationsService.supportNeed(acceptingDonation.id, {
          quantity: parseFloat(supportQty) || 0,
          phone: supportPhone
        });
      } else {
        await ngoDonationsService.acceptDonation(acceptingDonation.id);
      }
      
      setIsAccepting(false);
      setIsAcceptSuccess(true);
      startCloseTimer(2500);
      
      // Refresh data
      fetchDonations();
    } catch (error) {
      setIsAccepting(false);
      toast.error(
        acceptingDonation.origin === "NEED" 
          ? "Failed to support need. It might already be closed."
          : "Failed to accept donation. It might already be claimed."
      );
      setIsAcceptModalOpen(false);
    }
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

  const [donations, setDonations] = useState<DonationRequest[]>([]);

  const fetchDonations = useCallback(async () => {
    try {
      let rawDonations = [];
      let rawNeeds = [];

      // Use try-catch blocks individually if needed, but here we'll handle the array results
      if (activeTab === "marketplace") {
        const response = await ngoDonationsService.getMarketplaceDonations();
        rawDonations = response?.results || (Array.isArray(response) ? response : []);
      } else if (activeTab === "community-requests") {
        const response = await ngoNeedsService.getMyNeeds(); // Backend returns all needs
        rawNeeds = response?.results || (Array.isArray(response) ? response : []);
      } else {
        const results = await Promise.allSettled([
          ngoDonationsService.getMyRequests(),
          ngoNeedsService.getMyNeeds()
        ]);
        
        const donationsRes = results[0].status === 'fulfilled' ? results[0].value : [];
        const needsRes = results[1].status === 'fulfilled' ? results[1].value : [];
        
        rawDonations = donationsRes?.results || (Array.isArray(donationsRes) ? donationsRes : []);
        rawNeeds = needsRes?.results || (Array.isArray(needsRes) ? needsRes : []);
      }

      // Map Donations
      const mappedDonations: DonationRequest[] = rawDonations.map((d: any) => ({
        id: d.id,
        title: d.title || d.food_category,
        source: d.donor_name || "Private Donor",
        sourceType: d.donor_role || "DONOR",
        isOwn: d.accepted_ngo === user?.id || Boolean(d.accepted_ngo_name && activeTab === "my-requests"), 
        distance: "Nearby",
        icon: d.food_category === "Cooked Food" ? "🥗" : "🥖",
        time: d.created_at ? new Date(d.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recently",
        urgency: d.status === "PENDING" ? "High" : "Normal",
        status: d.status === "PENDING" ? "Available" : (d.status === "ACCEPTED" ? "Approved" : d.status),
        progress: d.status === "PENDING" ? 25 : (d.status === "ACCEPTED" ? 50 : 75),
        description: d.description,
        quantity: d.quantity,
        expiryTime: d.expiry_time ? new Date(d.expiry_time).toLocaleDateString() : "No Expiry",
        pickupAddress: d.pickup_address,
        origin: "DONATION",
        isMine: d.donor_id === user?.id,
        isSupported: d.accepted_ngo === user?.id,
      }));

      // Map Needs
      const mappedNeeds: DonationRequest[] = rawNeeds.map((n: any) => ({
        id: n.id,
        title: n.item_name,
        source: n.ngo_name || "Partner NGO",
        sourceType: "NGO",
        isOwn: Boolean(n.is_mine) || (Array.isArray(n.supporter_ids) && n.supporter_ids.includes(user?.id)), 
        distance: "Community",
        icon: "📋",
        time: n.created_at ? new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recently",
        urgency: n.urgency || "Normal",
        status: n.status || "Open",
        progress: 10,
        description: n.description,
        quantity: `${n.quantity} ${n.unit}`,
        origin: "NEED",
        isMine: Boolean(n.is_mine),
        isSupported: Array.isArray(n.supporter_ids) && n.supporter_ids.includes(user?.id),
      }));

      setDonations([...mappedDonations, ...mappedNeeds]);
    } catch (error) {
      toast.error("Failed to load requests");
    }
  }, [activeTab]);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  const finalFilteredDonations = donations
    .filter((d) => {
      // 1. Marketplace: Only show external Donor donations that are available
      if (activeTab === "marketplace") {
        return d.origin === "DONATION" && !d.isOwn && d.status === "Available";
      }
      
      // 2. Community: Only show external NGO Needs
      if (activeTab === "community-requests") {
        return d.origin === "NEED" && !d.isOwn;
      }
      
      // 3. My Records: Show ONLY actual fulfillments (accepted/supported)
      if (activeTab === "my-requests") {
        return d.isSupported;
      }
      return true;
    })
    .filter((d) => roleFilter === "ALL" || d.sourceType === roleFilter)
    .filter((d) => {
      const search = searchQuery.toLowerCase();
      if (!search) return true;
      return (
        d.title?.toLowerCase().includes(search) ||
        d.source?.toLowerCase().includes(search) ||
        d.id?.toString().includes(search)
      );
    });

  const handleAccept = useCallback(
    (donation: DonationRequest) => {
      handleAcceptClick(donation);
    },
    [handleAcceptClick]
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center w-full col-span-full">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm border bg-[var(--bg-secondary)] border-[var(--border-color)]">
        <Search size={32} className="text-[var(--text-muted)]" />
      </div>
      <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-[var(--text-primary)]">
        No Matching Requests
      </h3>
      <p className="text-sm font-medium max-w-xs text-[var(--text-muted)]">
        We couldn't find any donations or needs matching your current filters.
      </p>
    </div>
  );

  const renderCard = (donation: DonationRequest) => (
    <div
      className="group relative flex flex-col rounded-[24px] border transition-all duration-500 hover:-translate-y-1.5 bg-[var(--bg-primary)]/90 backdrop-blur-lg overflow-hidden"
      style={{ 
        borderColor: "var(--border-color)",
        boxShadow: "0 12px 24px -12px rgba(0,0,0,0.08)"
      }}
    >
      {/* Precision Side Status Indicator */}
      <div
        className={`absolute left-0 top-4 bottom-4 w-1 rounded-r-full transition-all duration-500 group-hover:w-1.5 ${
          donation.status === "Assigned"
            ? "bg-amber-400 shadow-[2px_0_8px_rgba(251,191,36,0.4)]"
            : donation.status === "In Transit"
              ? "bg-blue-400 shadow-[2px_0_8px_rgba(96,165,250,0.4)]"
              : donation.status === "Completed"
                ? "bg-emerald-400 shadow-[2px_0_8px_rgba(52,211,153,0.4)]"
                : activeTab === "community-requests"
                  ? "bg-blue-500 shadow-[2px_0_8px_rgba(59,130,246,0.3)]"
                  : "bg-emerald-500 shadow-[2px_0_8px_rgba(16,185,129,0.3)]"
        }`}
      />

      <div className="p-5 flex-grow flex flex-col items-center text-center relative z-10">
        {/* Header Area */}
        <div className="w-full flex justify-between items-center mb-4">
          <div className="w-10 h-10 rounded-[14px] bg-[var(--bg-secondary)] flex items-center justify-center text-lg shadow-inner border border-[var(--border-color)] group-hover:scale-105 transition-transform duration-500">
            {donation.icon}
          </div>
          <div className={`px-2 py-0.5 rounded-lg text-[7px] font-black uppercase tracking-[0.2em] border ${
            donation.urgency === "High"
              ? "bg-red-50 text-red-600 border-red-100"
              : "bg-emerald-50 text-emerald-600 border-emerald-100"
          }`}>
            {donation.urgency}
          </div>
        </div>

        {/* Informative Title */}
        <h4 className={`text-[15px] font-[800] tracking-tight leading-tight mb-3 px-1 transition-colors ${
            activeTab === "community-requests" ? "text-blue-600" : (activeTab === "marketplace" ? "text-emerald-600" : "text-[var(--text-primary)]")
        }`}>
          {donation.title}
        </h4>

        {/* Minimalist Entity Pill */}
        <div className="flex flex-col items-center gap-3 w-full mb-4">
           <div className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl border bg-[var(--bg-secondary)]/50 border-[var(--border-color)] shadow-sm group-hover:bg-white transition-colors duration-500 h-8">
              <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[8px] font-black text-white shadow-sm ${
                 donation.sourceType === "DONOR" ? "bg-gradient-to-br from-emerald-400 to-emerald-600" : "bg-gradient-to-br from-blue-400 to-blue-600"
              }`}>
                {donation.source.substring(0,2)}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tight text-[var(--text-primary)]">{donation.source}</span>
           </div>

           <div className="flex items-center gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1">
                <Clock size={10} className="text-[var(--text-muted)]" />
                <span className="text-[8px] font-bold uppercase text-[var(--text-primary)]">{donation.time}</span>
              </div>
              {activeTab === "marketplace" && (
                <div className="flex items-center gap-1">
                  <MapPin size={10} className="text-emerald-500" />
                  <span className="text-[8px] font-bold uppercase text-[var(--text-primary)]">{donation.distance}</span>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Optimized Action Area */}
      <div className="px-5 pb-5 pt-0">
          {activeTab === "my-requests" ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewTracking(donation);
              }}
              className="w-full h-9 flex items-center justify-center gap-2 rounded-[12px] text-[8px] font-black uppercase tracking-[0.25em] transition-all border bg-white border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:shadow-sm active:scale-95"
            >
              <Eye size={12} className="text-emerald-500" />
              Live Trace
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAccept(donation);
              }}
              className={`w-full h-9 flex items-center justify-center gap-2 text-white rounded-[12px] text-[8px] font-black uppercase tracking-[0.25em] transition-all shadow-md active:scale-95 ${
                donation.origin === "NEED" 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              <CheckCircle2 size={12} />
              {donation.origin === "NEED" ? "Support" : "Accept"}
            </button>
          )}
      </div>
    </div>
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
                NGO <span className="text-hf-green">Requests</span>
              </h1>
            </div>
          </div>

          <button
            onClick={() => navigate("/ngo/needs/post")}
            className="group flex items-center gap-2 px-6 py-3 bg-[#22c55e] hover:bg-green-600 text-white rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-green-600/20 w-full md:w-auto justify-center"
          >
            <Plus size={16} className="font-black" />
            <span className="text-[10px] font-black uppercase tracking-widest pt-0.5">
              Request Food
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
              { id: "marketplace", label: "Marketplace" },
              { id: "community-requests", label: "Community Needs" },
              { id: "my-requests", label: "My Records" },
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
                          className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border shadow-sm flex items-center gap-2"
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
                          {donation.origin === "NEED" ? (
                            <span className="text-[7px] bg-[#3b82f6]/10 text-[#3b82f6] px-1 rounded-sm">POSTED NEED</span>
                          ) : (
                            <span className="text-[7px] bg-[#10b981]/10 text-[#10b981] px-1 rounded-sm">ACCEPTED</span>
                          )}
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
          <div className="w-full">
            {activeTab === "my-requests" ? (
              <div className="space-y-20">
                {/* Hub 1: Accepted Donor Donations */}
                <div className="space-y-10 group/hub">
                  <div className="flex items-center justify-between px-4">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-[22px] bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/20 shadow-lg shadow-emerald-500/5 group-hover/hub:scale-110 transition-transform duration-500">
                        <Box size={24} className="stroke-[2.5]" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">
                          Donor Hub
                        </h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600/70">
                          Verified food donations from individual donors
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black px-4 py-1.5 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/20">
                        {finalFilteredDonations.filter(d => d.sourceType === "DONOR").length} ACTIVE
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-2">
                    {finalFilteredDonations.filter(d => d.sourceType === "DONOR").length > 0 ? (
                      finalFilteredDonations
                        .filter(d => d.sourceType === "DONOR")
                        .map((donation) => (
                        <div key={donation.id} onClick={() => handleViewTracking(donation)} className="h-full">
                           {renderCard(donation)}
                        </div>
                      ))
                    ) : (
                       renderEmptyState()
                    )}
                  </div>
                </div>

                {/* Horizontal Glass Divider */}
                <div className="relative h-[1px] w-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent opacity-50" />
                  <div className="absolute px-6 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-full py-1 text-[8px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)]">
                    Community Context Separation
                  </div>
                </div>

                {/* Hub 2: Community Needs Hub */}
                <div className="space-y-10 group/hub">
                  <div className="flex items-center justify-between px-4">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-[22px] bg-blue-500/10 flex items-center justify-center text-blue-600 border border-blue-500/20 shadow-lg shadow-blue-500/5 group-hover/hub:scale-110 transition-transform duration-500">
                        <Building2 size={24} className="stroke-[2.5]" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">
                          Community Hub
                        </h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600/70">
                          B2B Collaboration between NGO networks
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black px-4 py-1.5 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20">
                        {finalFilteredDonations.filter(d => d.sourceType === "NGO").length} ACTIVE
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-2">
                    {finalFilteredDonations.filter(d => d.sourceType === "NGO").length > 0 ? (
                      finalFilteredDonations
                        .filter(d => d.sourceType === "NGO")
                        .map((donation) => (
                        <div key={donation.id} onClick={() => handleViewTracking(donation)} className="h-full">
                           {renderCard(donation)}
                        </div>
                      ))
                    ) : (
                       renderEmptyState()
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-2">
                {finalFilteredDonations.map((donation) => (
                  <div
                    key={donation.id}
                    onClick={() => {
                        handleAcceptClick(donation);
                    }}
                    className="h-full"
                  >
                    {renderCard(donation)}
                  </div>
                ))}
                {finalFilteredDonations.length === 0 && renderEmptyState()}
              </div>
            )}
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
                    "We are coordinating your donation with our volunteers and partners to ensure a safe and timely delivery."}
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
                    QUANTITY
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
                    Live Trace
                  </h4>
                  <div className="relative space-y-4 before:absolute before:inset-0 before:ml-2.5 before:h-full before:w-0.5 before:bg-[var(--border-color)]">
                    {[
                      {
                        status: selectedRequest.isOwn
                          ? "Request Logged"
                          : "Donation Posted",
                        time: "10:45 AM",
                        date: "Today",
                        icon: Package,
                        completed: true,
                      },
                      {
                        status: "Agent Assigned",
                        time: "11:15 AM",
                        date: "Today",
                        icon: User,
                        completed: true,
                      },
                      {
                        status: "On the Way",
                        time: "Tracking Live",
                        date: "Active",
                        icon: Truck,
                        completed:
                          selectedRequest.status === "In Transit" ||
                          selectedRequest.status === "Completed",
                      },
                      {
                        status: "Delivered",
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
                      <span>Accepting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider">
                      <CheckCircle2 size={13} />
                      <span>Confirm Acceptance</span>
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
                    Success
                  </h3>
                  <h2
                    className="text-xl font-black tracking-tight leading-none uppercase"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Donation Accepted!
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
                    has been successfully accepted. A volunteer will be notified
                    for the pickup soon.
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
                        Acceptance Policy
                      </p>
                      <p
                        className="text-[9px] font-bold leading-relaxed opacity-80"
                        style={{ color: "var(--color-emerald-dark)" }}
                      >
                        By confirming, you agree to receive and distribute this
                        food donation to your registered beneficiaries.
                      </p>
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
                        Expiry
                      </p>
                      <div className="pt-1 border-t border-[var(--border-color)] flex items-center gap-1">
                        <Clock size={10} style={{ color: "var(--text-muted)" }} />
                        <p
                          className="text-[12px] font-black uppercase tracking-tight"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {acceptingDonation?.expiryTime || "Soon"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {acceptingDonation?.origin === "NEED" && (
                    <div className="space-y-3 pt-2 border-t border-[var(--border-color)]">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                        Fulfillment Details
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[8px] font-bold uppercase text-[var(--text-muted)] tracking-wider">
                            Amount to Donate
                          </label>
                          <div className="relative group">
                            <Box size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-emerald-500 transition-colors" />
                            <input 
                              type="number"
                              value={supportQty}
                              onChange={(e) => setSupportQty(e.target.value)}
                              className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl py-2 pl-9 pr-10 text-[12px] font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500/20 focus:border-emerald-500/40 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              placeholder="0"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                              <button 
                                onClick={() => setSupportQty(prev => ((parseInt(prev) || 0) + 1).toString())}
                                className="p-0.5 hover:bg-emerald-50 rounded text-[var(--text-muted)] hover:text-emerald-600 transition-colors"
                              >
                                <ChevronUp size={10} />
                              </button>
                              <button 
                                onClick={() => setSupportQty(prev => Math.max(0, (parseInt(prev) || 0) - 1).toString())}
                                className="p-0.5 hover:bg-emerald-50 rounded text-[var(--text-muted)] hover:text-emerald-600 transition-colors"
                              >
                                <ChevronDown size={10} />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[8px] font-bold uppercase text-[var(--text-muted)] tracking-wider">
                            Direct Contact
                          </label>
                          <div className="relative group">
                            <Phone size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-emerald-500 transition-colors" />
                            <input 
                              type="text"
                              value={supportPhone}
                              onChange={(e) => setSupportPhone(e.target.value)}
                              disabled={Boolean(user?.ngo_profile?.contact_number)}
                              className={`w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl py-2 pl-9 pr-4 text-[12px] font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500/20 focus:border-emerald-500/40 transition-all ${user?.ngo_profile?.contact_number ? 'opacity-70 cursor-not-allowed grayscale-[0.5]' : ''}`}
                              placeholder="+1..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
