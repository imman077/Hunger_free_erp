import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Package,
  MapPin,
  Clock,
  Building2,
  Phone,
  Info,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Leaf,
  Users2,
  Utensils,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import ResuableDrawer from "../../../../global/components/resuable-components/drawer";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";
import { useDonorDonations } from "../hooks/useDonorDonations";
import type { DonationDetail } from "../../store/donor-schemas";

const MyDonations = () => {
  const navigate = useNavigate();
  const { donationHistory, verifyPickup, refreshData } = useDonorDonations();
  const [selectedDonation, setSelectedDonation] =
    useState<DonationDetail | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpError, setOtpError] = useState("");
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortOrder, setSortOrder] = useState("Newest First");

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [donationHistory]);

  useEffect(() => {
    refreshData();
  }, []);

  const handleDetailsClick = (donation: DonationDetail) => {
    setSelectedDonation(donation);
    setOtpValue("");
    setOtpError("");
    setIsDrawerOpen(true);
  };

  const onOtpSubmit = async () => {
    if (!selectedDonation || otpValue.length !== 4) return;
    setIsVerifying(true);
    setOtpError("");
    const result = await verifyPickup(selectedDonation.id, otpValue);
    if (result.success) {
      setIsDrawerOpen(false);
      setOtpValue("");
    } else {
      setOtpError("Invalid verification code. Please try again.");
    }
    setIsVerifying(false);
  };

  return (
    <div className="w-full min-h-full flex flex-col space-y-6 max-w-[1600px] mx-auto p-6 md:p-10 bg-transparent pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0 mb-8">
        <div className="text-start space-y-2">
          <h1
            className="text-4xl md:text-5xl font-black tracking-tighter leading-none flex items-center"
            style={{ color: "var(--text-primary)" }}
          >
            <span className="mr-3">
              <span className="relative">
                M
                <div className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#22c55e] rounded-full opacity-80" />
              </span>
              y
            </span>
            <span className="relative mr-12 md:mr-14">
              Donations
              <img
                src="/heart_dec1.png"
                className="absolute left-full -bottom-1 w-12 h-auto md:w-14 animate-in fade-in zoom-in duration-700"
                alt="Heart Decoration"
              />
            </span>
          </h1>
          <div className="flex items-center gap-2">
            <p
              className="text-[12px] md:text-[13px] mt-1 font-medium tracking-normal opacity-60"
              style={{ color: "var(--text-secondary)" }}
            >
              Track and manage your community contributions
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/donor/donations/create")}
          className="group relative w-full sm:w-auto px-7 py-3 bg-[#22c55e] text-white rounded-2xl text-[13px] md:text-[14px] font-bold hover:bg-[#16a34a] transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-green-500/20 shrink-0"
        >
          {/* Decorative Sparks Left */}
          <img
            src="/btn_style_left1.png"
            className="absolute -top-4 -left-4 w-6 h-auto pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 md:opacity-100"
            alt="Decoration Left"
          />

          {/* Decorative Sparks Right */}
          <img
            src="/btn_style_right1.png"
            className="absolute -top-4 -right-4 w-6 h-auto pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 md:opacity-100"
            alt="Decoration Right"
          />

          <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-sm shrink-0">
            <Plus size={16} className="text-[#22c55e] stroke-[3.5]" />
          </div>
          <span className="tracking-tight">Create New Donation</span>
        </button>
      </div>

      {/* Dynamic Impact Stats Section */}
      <ImpactCards 
        data={[
          {
            label: "Total Donations",
            val: donationHistory.length.toString(),
            trend: "All time",
            color: "#22c55e",
            icon: Utensils,
          },
          {
            label: "Meals Donated",
            val: donationHistory.reduce((acc, curr) => acc + (parseFloat(curr.quantity) * 2.5 || 0), 0).toFixed(0),
            trend: "All time",
            color: "#3b82f6",
            icon: Users2,
          },
          {
            label: "Food Saved",
            val: donationHistory.reduce((acc, curr) => acc + (parseFloat(curr.quantity) || 0), 0).toFixed(1),
            trend: "kg (CO₂ Impact)",
            color: "#f59e0b",
            icon: Leaf,
          },
          {
            label: "Active Requests",
            val: donationHistory.filter(d => d.status === "PENDING" || d.status === "ACCEPTED" || d.status === "ASSIGNED").length.toString(),
            trend: "In progress",
            color: "#8b5cf6",
            icon: Package,
          },
        ]}
        className="mb-10 shrink-0"
      />

      <div className="w-full space-y-8">
        {/* Recent Contributions Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="relative">
              <h2 className="text-[13px] font-black uppercase tracking-[0.3em] text-[#22c55e]">
                Recent Contributions
              </h2>
              <div className="absolute -bottom-2 left-0 w-8 h-[3px] bg-[#22c55e] rounded-full" />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative group w-full md:w-auto">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-5 py-2.5 pr-10 text-[11px] font-bold uppercase tracking-wider text-slate-600 outline-none hover:border-emerald-200 transition-all cursor-pointer w-full"
                >
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Accepted</option>
                  <option>Assigned</option>
                  <option>Picked Up</option>
                  <option>Delivered</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-emerald-500 transition-colors" size={14} />
              </div>
              <div className="relative group w-full md:w-auto">
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-5 py-2.5 pr-10 text-[11px] font-bold uppercase tracking-wider text-slate-600 outline-none hover:border-emerald-200 transition-all cursor-pointer w-full"
                >
                  <option>Newest First</option>
                  <option>Oldest First</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-emerald-500 transition-colors" size={14} />
              </div>
            </div>
          </div>

          <div className="relative group">
            <AnimatePresence>
              {canScrollLeft && (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 0.8,
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 0 0px rgba(34, 197, 94, 0)",
                      "0 0 0 8px rgba(34, 197, 94, 0.1)",
                      "0 0 0 0px rgba(34, 197, 94, 0)"
                    ]
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ 
                    scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                    opacity: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const container = sliderRef.current || document.querySelector('.donation-history-slider');
                    if (container) container.scrollBy({ left: -420, behavior: 'smooth' });
                  }}
                  className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-[0_12px_40px_rgba(34,197,94,0.15)] border-2 border-emerald-100 flex items-center justify-center text-[#22c55e] z-[100] hover:text-white hover:bg-[#22c55e] transition-all cursor-pointer group/arrow active:scale-90"
                >
                  <ChevronLeft size={32} className="transition-transform group-hover/arrow:-translate-x-1" strokeWidth={3} />
                </motion.button>
              )}
            </AnimatePresence>

            <div 
              ref={sliderRef}
              onScroll={checkScroll}
              className="donation-history-slider flex overflow-x-auto no-scrollbar gap-6 pb-6"
            >
              {(() => {
                const filtered = donationHistory
                  .filter(d => statusFilter === "All Status" || d.status.toLowerCase() === statusFilter.toLowerCase())
                  .sort((a, b) => {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    return sortOrder === "Newest First" ? dateB - dateA : dateA - dateB;
                  });

                return filtered.length > 0 ? (
                  filtered.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex-shrink-0 w-full sm:w-[380px] bg-white border border-slate-100 rounded-[2.5rem] p-5 transition-all duration-300 hover:border-emerald-100 group/card relative shadow-sm hover:shadow-xl hover:shadow-emerald-500/5"
                  >
                    {/* Top Info */}
                    <div className="flex justify-between items-center mb-4 px-1">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${
                        donation.status === "PENDING" ? "text-amber-600 bg-amber-50" : 
                        donation.status === "DELIVERED" ? "text-emerald-600 bg-emerald-50" : 
                        "text-blue-600 bg-blue-50"
                      }`}>
                        {donation.status}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {donation.date}
                      </span>
                    </div>

                    {/* Image Hub */}
                    <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-6">
                      <img
                        src={donation.image || `/donation_images/${["chicken_gravy.png", "packed_lunch.png", "packet_curry.png"][donation.id % 3]}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                        alt={donation.foodType}
                      />
                      {/* Floating Status Icon */}
                      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[#22c55e] border border-slate-50">
                        {donation.status === "PENDING" ? <Package size={20} /> : 
                         donation.status === "DELIVERED" ? <CheckCircle2 size={20} /> : 
                         <ShieldCheck size={20} />}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-1 space-y-4 mb-8">
                      <div className="space-y-1">
                        <h3 className="text-xl font-black tracking-tight text-slate-800">
                          {donation.foodType}
                        </h3>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                          {donation.quantity} • Veg • Homemade
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5 text-slate-500">
                          <MapPin size={14} className="opacity-50" />
                          <span className="text-[11px] font-bold">{donation.ngo}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-slate-500">
                          <Clock size={14} className="opacity-50" />
                          <span className="text-[11px] font-bold italic">{donation.date}, 6:00 PM - 7:00 PM</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                      <button 
                        onClick={() => handleDetailsClick(donation)}
                        className="group/btn flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-[#22c55e] transition-all duration-300"
                      >
                        <div className="w-8 h-8 rounded-full bg-slate-50 group-hover/btn:bg-emerald-50 flex items-center justify-center transition-colors">
                          <Info size={14} className="group-hover/btn:scale-110 transition-transform" />
                        </div>
                        <span>View Details</span>
                      </button>
                      
                      <button className={`relative overflow-hidden group/action px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all duration-300 active:scale-95 shadow-sm hover:shadow-lg ${
                        donation.status === "PENDING" ? "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200/50" :
                        donation.status === "DELIVERED" ? "bg-[#22c55e] text-white hover:bg-[#16a34a] shadow-emerald-500/20" :
                        "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"
                      }`}>
                        <div className="flex items-center gap-2">
                          {donation.status === "PENDING" && <Plus size={14} className="rotate-45" />}
                          {donation.status === "DELIVERED" && <Users2 size={14} />}
                          {donation.status !== "PENDING" && donation.status !== "DELIVERED" && <MapPin size={14} />}
                          <span>
                            {donation.status === "PENDING" ? "Cancel" : 
                             donation.status === "DELIVERED" ? "Impact Note" : 
                             "Track Flow"}
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                  ))
                ) : (
                  <div className="w-full flex justify-center py-12 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                      No matching contributions found
                    </p>
                  </div>
                );
              })()}
            </div>

            <AnimatePresence>
              {canScrollRight && (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 0.8,
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 0 0px rgba(34, 197, 94, 0)",
                      "0 0 0 8px rgba(34, 197, 94, 0.1)",
                      "0 0 0 0px rgba(34, 197, 94, 0)"
                    ]
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ 
                    scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                    opacity: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const container = sliderRef.current || document.querySelector('.donation-history-slider');
                    if (container) container.scrollBy({ left: 420, behavior: 'smooth' });
                  }}
                  className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-[0_12px_40px_rgba(34,197,94,0.15)] border-2 border-emerald-100 flex items-center justify-center text-[#22c55e] z-[100] hover:text-white hover:bg-[#22c55e] transition-all cursor-pointer group/arrow active:scale-90"
                >
                  <ChevronRight size={32} className="transition-transform group-hover/arrow:translate-x-1" strokeWidth={3} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Empty State Illustration (Only if history is empty) */}
        {donationHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-8 flex flex-col items-center justify-center rounded-[24px] border border-slate-100 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] relative overflow-hidden group"
          >
            {/* Subtle Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-green-50/20 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Illustration */}
              <div className="relative w-56 h-40 md:w-64 md:h-48 mb-4">
                <img
                  src="/no_donation.png"
                  alt="No Donations"
                  className="w-full h-full object-contain opacity-90"
                />
              </div>

              {/* Content */}
              <div className="space-y-2 mb-8">
                <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                  No donations yet
                </h3>
                <p className="text-[13px] md:text-sm font-bold text-slate-500/70 max-w-sm leading-relaxed">
                  You haven't created any donation requests yet. <br />
                  Start sharing surplus food and help someone in need.
                </p>
              </div>

              <button
                onClick={() => navigate("/donor/donations/create")}
                className="px-10 py-4 bg-[#22c55e] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#16a34a] transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-green-500/10"
              >
                <img
                  src="/giving.png"
                  className="w-5 h-5 object-contain"
                  alt="Giving"
                />
                <span>Start Your Journey</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Donation Details Drawer */}
      <ResuableDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Donation Intelligence"
        subtitle={`Tracking ID: #DON-${selectedDonation?.id}00${selectedDonation?.id}`}
        size="md"
      >
        {(() => {
          if (!selectedDonation) return null;
          const d = selectedDonation;
          return (
            <div className="space-y-8 p-4 sm:p-6 lg:p-8">
              {/* Hero Section */}
              <div
                className="p-6 rounded-2xl border shadow-sm space-y-4"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <h3
                      className="text-2xl font-black tracking-tight leading-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {d.foodType}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 bg-[#22c55e]/10 text-[#22c55e] text-[9px] font-black uppercase tracking-widest rounded-lg border border-[#22c55e]/20">
                        {d.status}
                      </span>
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest opacity-40"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        • {d.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center border shrink-0 bg-hf-green/10 border-hf-green/20">
                    <Package className="text-hf-green" size={28} />
                  </div>
                </div>
                <p
                  className="text-xs font-semibold leading-relaxed opacity-60"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {d.description}
                </p>
              </div>

              {/* Tracking Timeline */}
              <div className="space-y-4">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                  <Clock size={14} className="text-[#22c55e]" />
                  Live Tracking Activity
                </h4>
                <div className="relative space-y-4 before:absolute before:inset-0 before:ml-2.5 before:h-full before:w-0.5 before:bg-[var(--border-color)]">
                  {d.timeline.map((item, index) => (
                    <div
                      key={index}
                      className="relative flex items-center gap-4 pl-1"
                    >
                      <div
                        className={`z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${item.completed ? "border-[#22c55e]" : "border-[var(--border-color)]"}`}
                        style={{ backgroundColor: "var(--bg-primary)" }}
                      >
                        {item.completed && (
                          <div className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                        )}
                      </div>
                      <div
                        className="flex flex-1 justify-between items-center gap-3 p-2.5 rounded-md border shadow-sm hover:border-[#22c55e]/30 transition-all min-w-0"
                        style={{
                          backgroundColor: "var(--bg-primary)",
                          borderColor: "var(--border-color)",
                        }}
                      >
                        <div className="min-w-0">
                          <p
                            className="text-[11px] font-black uppercase tracking-wider truncate mb-0.5"
                            style={{
                              color: item.completed
                                ? "var(--text-primary)"
                                : "var(--text-muted)",
                            }}
                          >
                            {item.status}
                          </p>
                          <p
                            className="text-[9px] font-bold uppercase"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {item.date}
                          </p>
                        </div>
                        <span className="text-[10px] font-black text-[#22c55e] tabular-nums shrink-0">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pickup & Delivery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className="p-6 rounded-2xl border space-y-4"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-hf-green">
                    <MapPin size={16} />
                    Pickup Point
                  </div>
                  <p
                    className="text-xs font-bold leading-relaxed"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {d.pickupAddress}
                  </p>
                </div>
                <div
                  className="p-6 rounded-2xl border space-y-4"
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">
                    <Building2 size={16} />
                    Delivery Point
                  </div>
                  <div className="space-y-1.5">
                    <h5
                      className="text-xs font-black uppercase tracking-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {d.ngo}
                    </h5>
                    <p
                      className="text-[11px] font-bold leading-relaxed opacity-60"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {d.deliveryAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Volunteer Section */}
              {d.volunteer && (
                <div
                  className="p-6 rounded-2xl border space-y-6"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
                    Assigned Personnel
                  </h4>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className="w-14 h-14 rounded-2xl border flex items-center justify-center text-hf-green font-black text-2xl shadow-sm shrink-0 bg-[var(--bg-primary)]"
                        style={{ borderColor: "var(--border-color)" }}
                      >
                        {d.volunteer.name.charAt(0)}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <p
                          className="text-sm font-black uppercase tracking-tight truncate"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {d.volunteer.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                          <span className="text-[10px] font-bold text-hf-green flex items-center gap-1.5">
                            <Star
                              className="fill-yellow-400 text-yellow-400"
                              size={12}
                            />
                            {d.volunteer.rating}
                          </span>
                          <span
                            className="text-[10px] font-bold opacity-50 flex items-center gap-1.5"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            <Phone size={12} />
                            {d.volunteer.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full sm:w-auto px-6 py-3 rounded-xl border border-hf-green text-hf-green font-black uppercase tracking-widest text-[10px] hover:bg-hf-green hover:text-white transition-all shadow-sm active:scale-95 flex items-center justify-center gap-3 bg-[var(--bg-primary)]">
                      <Phone size={16} />
                      Call Volunteer
                    </button>
                  </div>
                </div>
              )}

              {/* Secure Handover Protocol - OTP Entry */}
              {d.status === "ASSIGNED" && (
                <div
                  className="p-6 rounded-2xl border-2 border-dashed space-y-6 relative overflow-hidden group"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "rgba(34, 197, 94, 0.2)",
                    background:
                      "linear-gradient(145deg, var(--bg-secondary) 0%, rgba(34, 197, 94, 0.05) 100%)",
                  }}
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-hf-green/5 rounded-full blur-3xl" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-hf-green/10 flex items-center justify-center border border-hf-green/20">
                      <ShieldCheck className="text-hf-green" size={20} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#22c55e]">
                        Secure Handover
                      </h4>
                      <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                        Enter Volunteer's Device Code
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        maxLength={4}
                        value={otpValue}
                        onChange={(e) =>
                          setOtpValue(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="• • • •"
                        disabled={isVerifying}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl py-4 text-center text-3xl font-black tracking-[0.5em] text-hf-green placeholder:text-[var(--text-muted)]/20 focus:border-hf-green/50 focus:ring-4 focus:ring-hf-green/5 outline-none transition-all"
                      />
                      <button
                        onClick={onOtpSubmit}
                        disabled={isVerifying || otpValue.length !== 4}
                        className="h-[68px] aspect-square rounded-xl bg-[#22c55e] text-white flex items-center justify-center hover:bg-[#16a34a] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-500/20 active:scale-95 shrink-0"
                      >
                        {isVerifying ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <CheckCircle2 size={24} />
                        )}
                      </button>
                    </div>
                    {otpError && (
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest text-center animate-pulse">
                        {otpError}
                      </p>
                    )}
                    <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase text-center opacity-60 leading-relaxed italic">
                      The volunteer will show you a 4-digit code on their
                      device. Ask them for the code to finalize the pickup.
                    </p>
                  </div>
                </div>
              )}

              {/* Info Note */}
              <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-md border border-blue-100/50">
                <Info className="text-blue-500 shrink-0" size={16} />
                <p className="text-[10px] font-medium text-blue-700 leading-relaxed italic">
                  Your donation is currently being tracked by our Intelligence
                  System. Live updates are provided by our field volunteers
                  using the HungerFree Mobile App.
                </p>
              </div>
            </div>
          );
        })()}
      </ResuableDrawer>
    </div>
  );
};

const Star = ({ className, size, ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default MyDonations;


// Providing Backend Donation Samples