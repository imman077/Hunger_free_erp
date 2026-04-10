import React, { useState, useCallback, useEffect } from "react";
import { ngoNeedsService } from "../../../ngo/needs/api/needs.api";
import { toast } from "sonner";
import {
  MapPin,
  Search,
  Eye,
  LayoutGrid,
  Table,
  Clock,
  Building2,
  Loader2,
  Box,
  Heart,
  TrendingUp,
} from "lucide-react";
import { Button } from "@heroui/react";
import ReusableTable, {
  TableChip,
} from "../../../../global/components/resuable-components/table";
import ResuableDrawer from "../../../../global/components/resuable-components/drawer";
import ResuableModal from "../../../../global/components/resuable-components/modal";
import ResuableInput from "../../../../global/components/resuable-components/input";
import ResuableButton from "../../../../global/components/resuable-components/button";
import { donationService } from "../api/donations.api";
import { useAuthStore } from "../../../../global/contexts/auth-store";
import axiosInstance from "../../../../global/utils/axios-instance";

interface NGONeed {
  id: number;
  ngo: number;
  item_name: string;
  category: string;
  quantity: number;
  unit: string;
  urgency: string;
  required_by: string;
  ngo_name: string;
  description: string;
  status: string;
  fulfilled_quantity?: number;
  supporter_ids?: number[];
  created_at: string;
  image?: string;
  distribution_address?: string;
  is_mine?: boolean;
}

const NGOPosts = () => {
  const [viewMode, setViewMode] = useState<"table" | "card">("card");
  const [needs, setNeeds] = useState<NGONeed[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [selectedNeed, setSelectedNeed] = useState<NGONeed | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFulfillModalOpen, setIsFulfillModalOpen] = useState(false);
  const [isFulfilling, setIsFulfilling] = useState(false);
  const [fulfillForm, setFulfillForm] = useState({
    foodCategory: "",
    quantity: "",
    expiryDate: "",
    expiryTime: "",
    pickupAddress: "",
    contactPhone: "",
  });

  const fetchNeeds = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch NGO Needs
      const needsResponse = await ngoNeedsService.getMyNeeds();
      const rawNeeds = needsResponse?.results || (Array.isArray(needsResponse) ? needsResponse : []);
      
      // Fetch Pending Donations (Marketplace)
      let rawDonations: any[] = [];
      try {
        const donationsResponse = await axiosInstance.get("donations/?marketplace=true");
        rawDonations = donationsResponse.data?.results || (Array.isArray(donationsResponse.data) ? donationsResponse.data : []);
      } catch (err) {
        console.error("Failed to load donations", err);
      }

      // Map donations to NGONeed-like structure for the UI
      const mappedDonations = rawDonations.map((d: any) => ({
        id: d.id,
        ngo: 0, // Not applicable for a donor post
        item_name: d.food_items,
        category: d.food_category,
        quantity: d.quantity,
        unit: d.unit,
        urgency: "Normal", // Donors don't set urgency
        required_by: d.expiry_time?.split('T')[0] || "Flexible",
        ngo_name: d.donor_name || "Private Donor",
        description: d.description || d.pickup_address,
        status: "PENDING_DONATION", // Custom status for UI
        created_at: d.created_at,
        donor: d.donor,
      }));

      setNeeds([...rawNeeds, ...mappedDonations]);
    } catch (error) {
      toast.error("Failed to load marketplace content");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNeeds();
  }, [fetchNeeds]);

  const { user } = useAuthStore();
  const filteredNeeds = needs.filter((need) => {
    const matchesSearch =
      need.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      need.ngo_name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === "ALL" || need.category === categoryFilter;
    const isOpen = need.status === "Open" || need.status === "Fulfilling" || need.status === "PENDING_DONATION" || !need.status;
    
    return matchesSearch && matchesCategory && isOpen;
  });

  const handleApplyToHelp = async (need: NGONeed) => {
    // 1. If it's the NGO's own need, we just open tracking (Drawer)
    if (user && user.profile.role === "NGO" && (need.ngo === user.id || need.is_mine)) {
        setSelectedNeed(need);
        setIsDrawerOpen(true);
        return;
    }

    // 2. If it's a donor post (PENDING_DONATION), we accept it directly (or could show a confirmation)
    if (need.status === "PENDING_DONATION") {
        if (!confirm(`Are you sure you want to accept this donation of ${need.item_name}?`)) return;
        
        setIsLoading(true);
        try {
            await axiosInstance.patch(`donations/${need.id}/`, {
                accepted_ngo: user?.id,
                status: "ACCEPTED"
            });
            toast.success("Donation accepted successfully!");
            fetchNeeds();
        } catch (err) {
            toast.error("Failed to accept donation");
        } finally {
            setIsLoading(false);
        }
        return;
    }

    // 3. Otherwise, it's a regular NGO Need that needs fulfillment
    setFulfillForm({
      foodCategory: need.category || "Dry Ration",
      quantity: need.quantity.toString(),
      expiryDate: "",
      expiryTime: "",
      pickupAddress: "",
      contactPhone: "",
    });
    setSelectedNeed(need);
    setIsFulfillModalOpen(true);
  };

  const handleFulfillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNeed) return;

    setIsFulfilling(true);
    try {
      const submitData = new FormData();
      submitData.append("food_category", fulfillForm.foodCategory);
      submitData.append("food_items", selectedNeed.item_name);
      submitData.append("quantity", fulfillForm.quantity);
      submitData.append("unit", selectedNeed.unit);
      submitData.append(
        "pickup_address",
        fulfillForm.pickupAddress ||
          "Pickup location to be shared via contact.",
      );
      submitData.append("contact_phone", fulfillForm.contactPhone);
      submitData.append("related_need", selectedNeed.id.toString());
      submitData.append("accepted_ngo", selectedNeed.ngo.toString());

      // Provide a default expiry time (48 hours from now) for simple fulfillment
      const defaultExpiry = new Date();
      defaultExpiry.setHours(defaultExpiry.getHours() + 48);
      submitData.append("expiry_time", defaultExpiry.toISOString());

      await donationService.createDonation(submitData);
      toast.success("Support successfully pledged! The NGO will be notified.");
      setIsFulfillModalOpen(false);
      fetchNeeds(); // Refresh list
    } catch (error) {
      toast.error("Failed to submit support. Please check your data.");
    } finally {
      setIsFulfilling(false);
    }
  };

  const handleValueChange = (name: string, value: string) => {
    let newValue = value;
    if (name === "quantity" && selectedNeed) {
      const remaining = selectedNeed.quantity - (selectedNeed.fulfilled_quantity || 0);
      const numValue = parseInt(value);
      if (numValue > remaining) {
        newValue = remaining.toString();
      }
    }
    setFulfillForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const categories = [
    "ALL",
    ...Array.from(new Set(needs.map((n) => n.category))),
  ];

  return (
    <div className="w-full space-y-6 mx-auto p-4 bg-transparent">
      <div
        className="rounded-xl border shadow-sm relative overflow-hidden"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        {/* Isolated Decoration Layer */}
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[300px] h-[300px] bg-emerald-500 opacity-[0.03] blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[300px] h-[300px] bg-blue-500 opacity-[0.03] blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 px-6 py-10 border-b border-[var(--border-color)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h1
                className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                NGO <span className="text-emerald-500">Requests</span>
              </h1>
              <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em]">
                Help local NGOs by contributing what they need most
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none mb-1">
                  Live Update
                </span>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-lg border border-emerald-500/20">
                  <TrendingUp size={12} />
                  <span className="text-[13px] font-black tabular-nums">
                    {needs.length} Active Posts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Control Bar */}
        <div
          className="relative z-10 px-6 py-4 flex flex-col xl:flex-row items-center justify-between gap-6 border-t"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-color)",
          }}
        >
          {/* Left: Search */}
          <div className="relative w-full md:w-[400px]">
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items, NGOs, or locations..."
              className="w-full pl-11 pr-4 py-3 rounded-xl text-[12px] font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-sm border"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* Right: View & Filter Controls */}
          <div className="flex items-center gap-4 w-full xl:w-auto overflow-x-auto no-scrollbar pb-2 xl:pb-0">
            <div
              className="flex items-center gap-1 p-1 rounded-xl shadow-sm border shrink-0"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-color)",
              }}
            >
              {[
                { id: "table", icon: Table },
                { id: "card", icon: LayoutGrid },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id as any)}
                  className={`flex items-center justify-center p-2 rounded-lg transition-all ${
                    viewMode === mode.id
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : "hover:bg-[var(--bg-secondary)]"
                  }`}
                  style={{
                    backgroundColor:
                      viewMode === mode.id ? undefined : "var(--bg-primary)",
                    color: viewMode === mode.id ? "white" : "var(--text-muted)",
                  }}
                >
                  <mode.icon size={16} />
                </button>
              ))}
            </div>

            <div className="h-8 w-[1px] bg-[var(--border-color)] hidden md:block" />

            <div className="flex items-center gap-2">
              {categories.slice(0, 5).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                    categoryFilter === cat
                      ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                      : "bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-muted)] hover:border-emerald-500/50 hover:text-emerald-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 animate-in fade-in duration-500">
          <div className="relative">
            <div
              className="w-16 h-16 border-4 border-emerald-500/10 rounded-full animate-spin"
              style={{ borderTopColor: "var(--color-emerald-500)" }}
            />
            <Loader2
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500 animate-pulse"
              size={24}
            />
          </div>
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] animate-pulse">
            Fetching fresh needs...
          </p>
        </div>
      ) : filteredNeeds.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-[var(--bg-primary)] border border-[var(--border-color)] border-dashed rounded-2xl gap-6">
          <div className="bg-emerald-500/5 p-8 rounded-full">
            <Box size={48} className="text-emerald-500/20" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold tracking-tight">
              No needs found matching your criteria
            </h3>
            <p className="text-[var(--text-muted)] text-sm max-w-sm">
              Every NGO is currently well-stocked. Check back soon for new
              opportunities to support.
            </p>
          </div>
          <Button
            variant="flat"
            className="font-black text-[10px] uppercase tracking-widest"
            onPress={() => {
              setSearchQuery("");
              setCategoryFilter("ALL");
            }}
          >
            Clear all filters
          </Button>
        </div>
      ) : viewMode === "table" ? (
        <div className="border rounded-2xl shadow-sm p-4 overflow-hidden bg-[var(--bg-primary)] border-[var(--border-color)]">
          <ReusableTable
            data={filteredNeeds}
            onRowClick={(need: NGONeed) => {
              setSelectedNeed(need);
              setIsDrawerOpen(true);
            }}
            columns={[
              { name: "Need ID", uid: "id", sortable: true },
              { name: "Required Item", uid: "item_name", sortable: true },
              { name: "Organization", uid: "ngo_name", sortable: true },
              { name: "Urgency", uid: "urgency", sortable: true },
              { name: "Help Location", uid: "location", sortable: true },
              { name: "Quantity", uid: "quantity", sortable: true },
              { name: "Deadline", uid: "required_by", sortable: true },
              { name: "Actions", uid: "actions", sortable: false },
            ]}
            renderCell={(need: NGONeed, columnKey: React.Key) => {
              switch (columnKey) {
                case "id":
                  return (
                    <span className="text-[10px] font-black border px-2 py-1 rounded-sm bg-[var(--bg-secondary)] border-[var(--border-color)]">
                      #NEED-{need.id}
                    </span>
                  );
                case "item_name":
                  return (
                    <TableChip
                      text={need.item_name}
                      icon={<Box size={14} className="text-emerald-500" />}
                    />
                  );
                case "ngo_name":
                  return (
                    <TableChip
                      text={need.ngo_name || "Authorized NGO"}
                      initials={(need.ngo_name || "AN").substring(0, 2)}
                    />
                  );
                case "urgency":
                  return (
                    <span
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        need.urgency === "Urgent"
                          ? "bg-red-500/10 text-red-500 border-red-500/20"
                          : need.urgency === "High"
                            ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      }`}
                    >
                      {need.urgency}
                    </span>
                  );
                case "location":
                  return (
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-emerald-500" />
                      <span className="text-[11px] font-bold">
                        {need.distribution_address || "Service Zone"}
                      </span>
                    </div>
                  );
                case "quantity":
                  return (
                    <span className="text-[11px] font-bold tabular-nums">
                      {need.fulfilled_quantity && need.fulfilled_quantity > 0 ? (
                        <span className="text-emerald-500">{need.quantity - need.fulfilled_quantity} {need.unit} left</span>
                      ) : (
                        <span>{need.quantity} {need.unit}</span>
                      )}
                    </span>
                  );
                case "required_by":
                  return (
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                      <Clock size={12} />
                      <span className="text-[11px] font-bold">
                        {need.required_by || "Flexible"}
                      </span>
                    </div>
                  );
                case "actions":
                  return (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className={`${
                          user && user.profile.role === "NGO" && (need.ngo === user.id || need.is_mine)
                            ? "bg-blue-500"
                            : "bg-emerald-500"
                        } text-white font-black text-[9px] uppercase tracking-widest px-4 h-8 rounded-lg`}
                        onPress={() => handleApplyToHelp(need)}
                      >
                        {user && user.profile.role === "NGO" && (need.ngo === user.id || need.is_mine) ? "Track" : need.status === "PENDING_DONATION" ? "Accept" : "Fulfill"}
                      </Button>
                    </div>
                  );
                default:
                  return null;
              }
            }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNeeds.map((need) => (
            <div
              key={need.id}
              className="group relative flex flex-col bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
            >
              {/* Image / Icon Header */}
              <div className="relative h-48 overflow-hidden bg-[var(--bg-secondary)]">
                {need.image ? (
                  <img
                    src={need.image}
                    alt={need.item_name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-20">
                    <Box size={80} className="text-emerald-500" />
                  </div>
                )}

                {/* Badges Over Image */}
                <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] shadow-xl backdrop-blur-md border ${
                      need.urgency === "Urgent"
                        ? "bg-red-500 text-white border-red-400/50 animate-pulse"
                        : need.urgency === "High"
                          ? "bg-amber-500 text-white border-amber-400/50"
                          : "bg-emerald-500 text-white border-emerald-400/50"
                    }`}
                  >
                    {need.urgency}
                  </span>
                  
                  {need.status === "Fulfilling" && (
                    <span className="px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] shadow-xl backdrop-blur-md border bg-blue-500 text-white border-blue-400/50">
                      In Progress
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 z-20">
                  <div className="flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/20">
                    <MapPin size={10} className="text-white" />
                    <span className="text-[9px] font-black text-white uppercase tracking-widest">
                      {need.distribution_address || "Service Zone"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex-grow flex flex-col gap-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest leading-none bg-emerald-500/5 px-2 py-1 rounded">
                      {need.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight leading-tight group-hover:text-emerald-500 transition-colors">
                    {need.item_name}
                  </h3>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--text-muted)] uppercase tracking-wider text-[9px]">
                      Organization
                    </span>
                    <span className="font-black text-emerald-500">
                      {need.ngo_name || "Validated NGO"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--text-muted)] uppercase tracking-wider text-[9px]">
                      Requirement
                    </span>
                    <span className="font-black">
                      {need.fulfilled_quantity && need.fulfilled_quantity > 0 ? (
                        <span className="flex flex-col items-end">
                            <span className="text-emerald-500">{need.quantity - need.fulfilled_quantity} {need.unit} left</span>
                            <span className="text-[9px] text-[var(--text-muted)] font-normal uppercase">of {need.quantity} {need.unit}</span>
                        </span>
                      ) : (
                        <span>{need.quantity} {need.unit}</span>
                      )}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] leading-relaxed text-[var(--text-muted)] line-clamp-2 italic">
                  "
                  {need.description ||
                    "Help our organization gather resources for local communities in need."}
                  "
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <Button
                    className={`flex-1 font-black text-[10px] uppercase tracking-widest px-6 h-12 rounded-2xl shadow-lg active:scale-95 transition-all ${
                      user && user.profile.role === "NGO" && need.ngo === user.id
                        ? "bg-blue-500 hover:bg-blue-600 shadow-blue-500/20"
                        : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20"
                    } text-white`}
                    onPress={() => handleApplyToHelp(need)}
                  >
                    {user && user.profile.role === "NGO" && (need.ngo === user.id || need.is_mine) ? (
                      <>
                        <Clock size={14} />
                        Track Progress
                      </>
                    ) : need.status === "PENDING_DONATION" ? (
                      <>
                        <Box size={14} />
                        Accept Donation
                      </>
                    ) : (
                      <>
                        <Heart size={14} fill="currentColor" />
                        Support Need
                      </>
                    )}
                  </Button>
                  <Button
                    isIconOnly
                    className="bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-emerald-500 h-12 w-12 rounded-2xl transition-all"
                    onPress={() => {
                      setSelectedNeed(need);
                      setIsDrawerOpen(true);
                    }}
                  >
                    <Eye size={18} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Drawer */}
      <ResuableDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Need Details"
      >
        {selectedNeed && (
          <div className="space-y-8 p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Box size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter">
                    {selectedNeed.item_name}
                  </h2>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                    {selectedNeed.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                  Amount Needed
                </span>
                <span className="text-lg font-black">
                  {selectedNeed.quantity} {selectedNeed.unit}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                  Urgency Level
                </span>
                <span
                  className={`text-lg font-black ${selectedNeed.urgency === "Urgent" ? "text-red-500" : "text-emerald-500"}`}
                >
                  {selectedNeed.urgency}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2 flex items-center gap-2">
                <Building2 size={12} /> Organization
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-[var(--text-muted)]">
                    Organization
                  </span>
                  <span className="text-[11px] font-black">
                    {selectedNeed.ngo_name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-[var(--text-muted)]">
                    Help Location
                  </span>
                  <span className="text-[11px] font-black">
                    {selectedNeed.distribution_address ||
                      "Sector 4, Central Region"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2">
                Description
              </h4>
              <p className="text-xs leading-relaxed text-[var(--text-muted)] font-medium bg-[var(--bg-secondary)] p-4 rounded-2xl border border-[var(--border-color)] italic">
                "
                {selectedNeed.description ||
                  "The organization is seeking urgent food supplies to support local families in the designated region. Your contribution directly impacts the well-being of our beneficiaries."}
                "
              </p>
            </div>
          </div>
        )}
      </ResuableDrawer>

      {/* Fulfillment Modal */}
      <ResuableModal
        isOpen={isFulfillModalOpen}
        onOpenChange={(open) => setIsFulfillModalOpen(open)}
        onClose={() => setIsFulfillModalOpen(false)}
        title="Help with this request"
        size="2xl"
      >
        <form onSubmit={handleFulfillSubmit} className="space-y-6">
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
              <Heart size={20} fill="currentColor" />
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-tight text-emerald-600">
                Helping NGO
              </h3>
              <p className="text-[11px] font-bold text-emerald-700/80 uppercase tracking-widest mt-0.5">
                Providing {selectedNeed?.item_name}
              </p>
            </div>
          </div>

          {selectedNeed && (
            <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                How much they need total
              </span>
              <span className="text-sm font-black text-emerald-500">
                {selectedNeed.quantity} {selectedNeed.unit}
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResuableInput
              label="How many can you give?"
              type="number"
              value={fulfillForm.quantity}
              onChange={(val) => handleValueChange("quantity", val)}
              required
              placeholder={`Max ${selectedNeed ? selectedNeed.quantity - (selectedNeed.fulfilled_quantity || 0) : 0}`}
              min={1}
              max={selectedNeed ? selectedNeed.quantity - (selectedNeed.fulfilled_quantity || 0) : 0}
            />
            <ResuableInput
              label="Your phone number"
              type="tel"
              value={fulfillForm.contactPhone}
              onChange={(val) => handleValueChange("contactPhone", val)}
              required
              placeholder="+1 (000) 000-0000"
            />
          </div>

          <div className="pt-4 flex justify-end gap-4 border-t border-[var(--border-color)]">
            <ResuableButton
              variant="ghost"
              onClick={() => setIsFulfillModalOpen(false)}
              className="font-black text-[10px] uppercase tracking-widest"
            >
              Go back
            </ResuableButton>
            <ResuableButton
              type="submit"
              variant="dark"
              disabled={isFulfilling}
              className="min-w-[180px] !bg-emerald-500 hover:!bg-emerald-600"
              startContent={
                isFulfilling && <Loader2 size={16} className="animate-spin" />
              }
            >
              <span className="text-[10px] font-black uppercase tracking-widest">
                {isFulfilling ? "Saving..." : "I will help"}
              </span>
            </ResuableButton>
          </div>
        </form>
      </ResuableModal>
    </div>
  );
};

export default NGOPosts;
