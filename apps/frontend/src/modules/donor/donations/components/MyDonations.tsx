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
  Users,
  User,
  ShoppingBag,
  Utensils,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  LayoutList,
  Hourglass,
  Search,
  Truck,
  Heart,
  Download,
  RotateCcw,
  Lock,
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
  const [statusFilter, setStatusFilter] = useState("Pending");
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
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
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
    if (!selectedDonation || otpValue.length !== 6) return;
    setIsVerifying(true);
    setOtpError("");
    const result = await verifyPickup(String(selectedDonation.id), otpValue);
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
            val: donationHistory
              .reduce(
                (acc: number, curr: DonationDetail) => acc + (parseFloat(curr.quantity) * 2.5 || 0),
                0,
              )
              .toFixed(0),
            trend: "All time",
            color: "#3b82f6",
            icon: Users,
          },
          {
            label: "Food Saved",
            val: donationHistory
              .reduce((acc: number, curr: DonationDetail) => acc + (parseFloat(curr.quantity) || 0), 0)
              .toFixed(1),
            trend: "kg (CO₂ Impact)",
            color: "#f59e0b",
            icon: Leaf,
          },
          {
            label: "Active Requests",
            val: donationHistory
              .filter(
                (d: DonationDetail) =>
                  d.status === "PENDING" ||
                  d.status === "ACCEPTED" ||
                  d.status === "ASSIGNED",
              )
              .length.toString(),
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
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-5 py-2.5 pr-10 text-[11px] font-bold uppercase tracking-wider text-slate-600 outline-none hover:border-emerald-200 transition-all cursor-pointer w-full"
                >
                  <option>Pending</option>
                  <option>Accepted</option>
                  <option>Assigned</option>
                  <option>Delivered</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-emerald-500 transition-colors"
                  size={14}
                />
              </div>
              <div className="relative group w-full md:w-auto">
                <select
                  value={sortOrder}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortOrder(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 rounded-xl px-5 py-2.5 pr-10 text-[11px] font-bold uppercase tracking-wider text-slate-600 outline-none hover:border-emerald-200 transition-all cursor-pointer w-full"
                >
                  <option>Newest First</option>
                  <option>Oldest First</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-emerald-500 transition-colors"
                  size={14}
                />
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
                      "0 0 0 0px rgba(34, 197, 94, 0)",
                    ],
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                    opacity: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const container =
                      sliderRef.current ||
                      document.querySelector(".donation-history-slider");
                    if (container)
                      container.scrollBy({ left: -420, behavior: "smooth" });
                  }}
                  className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-[0_12px_40px_rgba(34,197,94,0.15)] border-2 border-emerald-100 flex items-center justify-center text-[#22c55e] z-[100] hover:text-white hover:bg-[#22c55e] transition-all cursor-pointer group/arrow active:scale-90"
                >
                  <ChevronLeft
                    size={32}
                    className="transition-transform group-hover/arrow:-translate-x-1"
                    strokeWidth={3}
                  />
                </motion.button>
              )}
            </AnimatePresence>

            <div
              ref={sliderRef}
              onScroll={checkScroll}
              className="donation-history-slider flex overflow-x-auto no-scrollbar gap-6 pb-6"
            >
              {(() => {
                const statusMap: Record<string, string[]> = {
                  Pending: ["PENDING"],
                  Accepted: ["ACCEPTED"],
                  Assigned: ["ASSIGNED"],
                  Delivered: ["DELIVERED"],
                };

                const filtered = (donationHistory || [])
                  .filter((d: DonationDetail) => {
                    const allowedStatuses = statusMap[statusFilter] || [
                      statusFilter.toUpperCase(),
                    ];
                    return allowedStatuses.includes(d.status.toUpperCase());
                  })
                  .sort((a: DonationDetail, b: DonationDetail) => {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    return sortOrder === "Newest First"
                      ? dateB - dateA
                      : dateA - dateB;
                  });

                return filtered.length > 0 ? (
                  filtered.map((donation: DonationDetail) => (
                    <div
                      key={donation.id}
                      className={`flex-shrink-0 w-full sm:w-[380px] border rounded-[2.5rem] p-4 transition-all duration-300 group/card relative shadow-sm hover:shadow-xl ${
                        donation.status === "PENDING" ? "border-orange-100/50" :
                        donation.status === "ACCEPTED" ? "border-blue-100/50" :
                        donation.status === "DELIVERED" ? "border-emerald-100/50 bg-[#fcfdfc]" :
                        "border-slate-100 hover:border-emerald-100"
                      }`}
                    >
                      {/* Top Info - Theme Driven */}
                      <div className="flex justify-between items-center mb-3 px-1">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          donation.status === "PENDING" ? "bg-orange-50 text-orange-600" :
                          donation.status === "ACCEPTED" ? "bg-blue-50 text-blue-600" :
                          donation.status === "DELIVERED" ? "bg-emerald-50 text-emerald-700" :
                          "bg-emerald-50 text-emerald-600"
                        }`}>
                          {donation.status === "PENDING" ? <Clock size={12} strokeWidth={3} /> :
                           donation.status === "ACCEPTED" ? <CheckCircle2 size={12} strokeWidth={3} /> :
                           donation.status === "DELIVERED" ? <CheckCircle2 size={12} strokeWidth={3} /> :
                           <User size={12} strokeWidth={3} />}
                          <span>{donation.status}</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {donation.date}
                        </span>
                      </div>

                      {/* Image Hub - Theme Driven */}
                      <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-4 shadow-sm">
                        <img
                          src={
                            donation.status === "PENDING" || donation.status === "ACCEPTED"
                              ? "/drawer_images/cooked_food.png"
                              : donation.image || `/donation_images/${["chicken_gravy.png", "packed_lunch.png", "packet_curry.png"][donation.id % 3]}`
                          }
                          className={`w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110 ${
                            donation.status === "DELIVERED" ? "saturate-[0.8] opacity-95" : ""
                          }`}
                          alt={donation.foodType}
                        />
                        {/* Floating Status Icon - Hub Style */}
                        <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center border border-white/50 ${
                          donation.status === "PENDING" ? "text-orange-500" :
                          donation.status === "ACCEPTED" ? "text-blue-600" :
                          "text-[#22c55e]"
                        }`}>
                          {donation.status === "PENDING" ? <Hourglass size={20} strokeWidth={2.5} /> :
                           donation.status === "ACCEPTED" ? <ShieldCheck size={20} strokeWidth={2.5} /> :
                           donation.status === "DELIVERED" ? <CheckCircle2 size={20} strokeWidth={2.5} /> :
                           <ShieldCheck size={20} strokeWidth={2.5} />}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="px-1 space-y-4 mb-4">
                        <div className="space-y-1">
                          <h3 className={`text-[24px] font-black tracking-tight leading-none ${
                            donation.status === "DELIVERED" ? "text-slate-700" : "text-slate-800"
                          }`}>
                            {donation.foodType}
                          </h3>
                          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            {donation.status === "PENDING" ? "10 LITERS" : 
                             donation.status === "ACCEPTED" ? "5 KG" : 
                             donation.status === "DELIVERED" ? "12 CANS" : "15 UNITS"} • Veg • Homemade
                          </p>
                        </div>

                        {/* Status Specific Info Lines */}
                        <div className="space-y-3.5">
                          {/* NGO Line */}
                          <div className="flex items-start gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              donation.status === "PENDING" ? "bg-orange-50 text-orange-500" :
                              donation.status === "ACCEPTED" ? "bg-blue-50 text-blue-500" :
                              "bg-emerald-50 text-emerald-600"
                            }`}>
                              <MapPin size={16} strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[14px] font-bold text-slate-700">
                                {donation.status === "PENDING" ? "Matching nearby NGOs..." : donation.ngo}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400">
                                {donation.status === "PENDING" ? "Searching for the best match" :
                                 donation.status === "ACCEPTED" ? "NGO has accepted your donation" :
                                 donation.status === "DELIVERED" ? "Donation received successfully" : "Pickup in progress"}
                              </span>
                            </div>
                          </div>

                          {/* Date/Time Line */}
                          <div className="flex items-start gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              donation.status === "PENDING" ? "bg-orange-50 text-orange-500" :
                              donation.status === "ACCEPTED" ? "bg-blue-50 text-blue-500" :
                              "bg-emerald-50 text-emerald-600"
                            }`}>
                              <Clock size={16} strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[14px] font-bold text-slate-700">
                                {donation.date}, {donation.status === "DELIVERED" ? "6:25 PM" : "6:00 PM - 7:00 PM"}
                              </span>
                            </div>
                          </div>

                          {/* Extra Status Rows (Volunteer / Delivery Team) */}
                          {donation.status === "DELIVERED" ? (
                            <div className="flex items-start gap-4">
                              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                <User size={16} strokeWidth={2.5} />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400">Received by</span>
                                <span className="text-[14px] font-bold text-slate-700">{donation.ngo} Team</span>
                              </div>
                            </div>
                          ) : (donation.volunteer || donation.status === "ASSIGNED") && (
                            <div className="flex items-center justify-between p-2.5 bg-slate-50/50 rounded-[1.25rem] border border-slate-100/50">
                              <div className="flex items-center gap-3">
                                <img src="/drawer_images/user.png" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" alt="V" />
                                <div className="flex flex-col leading-tight">
                                  <span className="text-[8px] font-black uppercase tracking-wider text-emerald-600/80">Volunteer</span>
                                  <span className="text-[13px] font-black uppercase tracking-tight text-slate-700">Suresh Kumar</span>
                                </div>
                              </div>
                              <button className="w-8 h-8 rounded-full bg-[#22c55e] text-white flex items-center justify-center shadow-md shadow-emerald-500/20 active:scale-90 transition-transform">
                                <Phone size={14} fill="currentColor" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Action Banners */}
                        {donation.status === "PENDING" ? (
                          <div className="p-3 bg-orange-50/50 border border-orange-100/50 rounded-2xl flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-orange-500 shadow-sm shrink-0">
                              <Search size={16} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[11px] font-black text-orange-600">We are finding the best NGO</span>
                              <span className="text-[9px] font-bold text-slate-400">Estimated acceptance in 10-15 min</span>
                            </div>
                          </div>
                        ) : donation.status === "ACCEPTED" ? (
                          <div className="p-3 bg-blue-50/50 border border-blue-100/50 rounded-2xl flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                              <Truck size={16} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[11px] font-black text-blue-600">Preparing for pickup</span>
                              <span className="text-[9px] font-bold text-slate-400">NGO is arranging a volunteer</span>
                            </div>
                          </div>
                        ) : donation.status === "DELIVERED" ? (
                          <div className="p-3 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                              <Heart size={16} fill="currentColor" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[11px] font-black text-emerald-600">Thank you!</span>
                              <span className="text-[9px] font-bold text-slate-400">Your donation will feed many in need 🎉</span>
                            </div>
                          </div>
                        ) : (
                          <div className="p-3 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                                <Truck size={16} />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[11px] font-black text-emerald-600">Volunteer on the way</span>
                                <span className="text-[9px] font-bold text-slate-400">ETA: 20 mins • 2.4 km away</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-full shadow-sm border border-emerald-100">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[8px] font-black uppercase text-emerald-600 tracking-tighter">Live</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Footer Actions & Stats - Theme Driven */}
                      <div className="pt-4 border-t border-slate-100/50 space-y-4">
                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={() => handleDetailsClick(donation)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-2xl bg-slate-50 text-slate-500 border border-slate-200/50 hover:bg-slate-100 transition-all text-[10px] font-black uppercase tracking-wider whitespace-nowrap"
                          >
                            <Info size={14} />
                            <span>View Details</span>
                          </button>

                          {donation.status === "DELIVERED" ? (
                            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-2xl bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition-all text-[10px] font-black uppercase tracking-wider whitespace-nowrap">
                              <Download size={14} />
                              <span>Receipt</span>
                            </button>
                          ) : (
                            <button
                              className={`flex-[1.2] flex items-center justify-center gap-2 px-3 py-3 rounded-2xl font-black uppercase tracking-wider text-[10px] transition-all active:scale-95 shadow-md whitespace-nowrap text-white ${
                                donation.status === "PENDING" ? "bg-orange-500 hover:bg-orange-600" :
                                donation.status === "ACCEPTED" ? "bg-blue-600 hover:bg-blue-700" :
                                "bg-[#2e7d32] hover:bg-[#1b5e20]"
                              }`}
                            >
                              {donation.status === "PENDING" ? "Cancel Order" : 
                               donation.status === "ACCEPTED" ? "Track Flow" : "Live Track"}
                            </button>
                          )}
                        </div>
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
                      "0 0 0 0px rgba(34, 197, 94, 0)",
                    ],
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                    opacity: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.8 }}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    const container =
                      sliderRef.current ||
                      (document.querySelector(".donation-history-slider") as HTMLElement);
                    if (container)
                      container.scrollBy({ left: 420, behavior: "smooth" });
                  }}
                  className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-[0_12px_40px_rgba(34,197,94,0.15)] border-2 border-emerald-100 flex items-center justify-center text-[#22c55e] z-[100] hover:text-white hover:bg-[#22c55e] transition-all cursor-pointer group/arrow active:scale-90"
                >
                  <ChevronRight
                    size={32}
                    className="transition-transform group-hover/arrow:translate-x-1"
                    strokeWidth={3}
                  />
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
        subtitle={
          <span className="flex items-center gap-1.5">
            Tracking ID:{" "}
            <span className="text-[#22c55e] font-bold">
              #DON-{selectedDonation?.id}00{selectedDonation?.id}
            </span>
          </span>
        }
        size="md"
        headerExtra={
          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-emerald-50/60 text-[#22c55e] rounded-xl border border-emerald-100/50">
            <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
            <span className="text-[11px] font-bold tracking-tight">
              Live Tracking
            </span>
          </div>
        }
      >
        {selectedDonation ? (
          (() => {
            const d = selectedDonation!;
            return (
            <div className="space-y-6 p-6 bg-white">
              {/* Hero Section Card - Exactly as per Image */}
              <div className="relative rounded-[2rem] overflow-hidden group shadow-sm min-h-[240px] bg-white border border-slate-50">
                {/* Background Image (Globe + Bowl) */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  <img
                    src="/drawer_images/cooked_food.png"
                    className="w-full h-full object-cover opacity-100"
                    alt="Background"
                  />
                </div>

                <div className="relative p-8 z-10 flex flex-col justify-between h-full min-h-[240px]">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-[26px] font-bold text-slate-800 tracking-tight leading-tight">
                          {d.foodType}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg bg-orange-50 text-orange-600 border border-orange-100/30">
                            {d.status}
                          </span>
                          <span className="text-[12px] font-black text-slate-400 uppercase tracking-widest">
                            • {d.ngo}
                          </span>
                        </div>
                        <p className="text-[13px] font-bold text-slate-400/80 tracking-tight">
                          {d.description || "Freshly Prepared Meals"}
                        </p>
                      </div>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-emerald-900/5 flex items-center justify-center text-[#22c55e] border border-white shrink-0">
                      <Package size={24} strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Impact Banner - Minimalist to avoid hiding image */}
                  <div className="flex items-center gap-2.5 px-3 py-2 bg-emerald-50/50 backdrop-blur-sm border border-emerald-100/30 rounded-xl w-fit max-w-[60%]">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-emerald-500 shrink-0">
                      <Leaf size={16} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[11px] font-black leading-tight text-emerald-600">
                        {d.quantity} of food rescued
                      </span>
                      <span className="text-[8px] font-bold text-slate-400/80 tracking-tight">
                        by {d.ngo}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Updates Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-[#22c55e] border border-emerald-100/40 shrink-0">
                      <LayoutList size={16} strokeWidth={2.5} />
                    </div>
                    <h4 className="text-[13px] font-black uppercase tracking-widest text-slate-700">
                      Recent Updates
                    </h4>
                  </div>
                  <button className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 group hover:text-emerald-700 transition-colors">
                    View all updates
                    <ChevronRight
                      size={12}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </button>
                </div>

                <div className="relative space-y-3 px-1">
                  {/* Vertical Connecting Line - Mathematically Centered (px-1=4px + node center=12px = 16px) */}
                  <div className="absolute left-[15px] top-6 bottom-6 w-[2px] border-l-2 border-dashed border-slate-200" />

                  {/* Step 1: Picked Up */}
                  <div className="relative flex items-center gap-4 group/step">
                    <div className="relative z-10 w-6 h-6 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center shadow-sm shrink-0">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <div className="flex-1 p-3.5 rounded-xl bg-slate-50/50 border border-slate-100/50 flex items-center gap-4 hover:bg-white hover:shadow-lg transition-all duration-300 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100 shadow-sm">
                        <ShoppingBag size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13.5px] font-bold text-slate-800 tracking-tight truncate">
                          Food picked up successfully
                        </p>
                        <p className="text-[10px] font-bold text-slate-400">
                          Today, 10:30 AM
                        </p>
                      </div>
                      <div className="px-2.5 py-1 rounded-lg text-[8px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm shrink-0 whitespace-nowrap">
                        Completed
                      </div>
                    </div>
                  </div>

                  {/* Step 2: In Transit */}
                  <div className="relative flex items-center gap-4 group/step">
                    <div className="relative z-10 w-6 h-6 rounded-full bg-white border-2 border-blue-400 flex items-center justify-center shadow-sm shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    </div>
                    <div className="flex-1 p-3.5 rounded-xl bg-slate-50/50 border border-slate-100/50 flex items-center gap-4 hover:bg-white hover:shadow-lg transition-all duration-300 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-500 shrink-0 border border-blue-100 shadow-sm">
                        <User size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13.5px] font-bold text-slate-800 tracking-tight truncate">
                          Food in transit to NGO
                        </p>
                        <p className="text-[10px] font-bold text-slate-400">
                          Today, 11:05 AM •{" "}
                          {d.volunteer?.name || "Our Volunteer"}
                        </p>
                      </div>
                      <div className="px-2.5 py-1 rounded-lg text-[8px] font-black uppercase bg-blue-50 text-blue-600 border border-blue-100 shadow-sm shrink-0 whitespace-nowrap">
                        In Transit
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Pending Delivery */}
                  <div className="relative flex items-center gap-4 group/step">
                    <div className="relative z-10 w-6 h-6 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shadow-sm shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    </div>
                    <div className="flex-1 p-3.5 rounded-xl bg-slate-50/50 border border-slate-100/50 flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 shrink-0 border border-slate-100 shadow-sm">
                        <Building2 size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13.5px] font-bold text-slate-700 tracking-tight truncate">
                          NGO will confirm delivery
                        </p>
                        <p className="text-[10px] font-bold text-slate-400">
                          Est. Tomorrow, 2:00 PM
                        </p>
                      </div>
                      <div className="px-2.5 py-1 rounded-lg text-[8px] font-black uppercase bg-slate-100 text-slate-500 border border-slate-200 shadow-sm shrink-0 whitespace-nowrap">
                        Pending
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Final Delivery */}
                  <div className="relative flex items-center gap-4 group/step opacity-60">
                    <div className="relative z-10 w-6 h-6 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm shrink-0"></div>
                    <div className="flex-1 p-3.5 rounded-xl bg-slate-50/30 border border-slate-100 border-dashed flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-300 shrink-0 border border-slate-100 shadow-sm">
                        <CheckCircle2 size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13.5px] font-bold text-slate-500 tracking-tight truncate">
                          Delivery to beneficiary
                        </p>
                        <p className="text-[10px] font-bold text-slate-400">
                          Est. Tomorrow
                        </p>
                      </div>
                      <div className="px-2.5 py-1 rounded-lg text-[8px] font-black uppercase bg-slate-50 text-slate-400 border border-slate-100 shadow-sm shrink-0 whitespace-nowrap">
                        Upcoming
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* Enhanced Delivery Verification UI - Exactly as per Image */}
              {d.status === "ASSIGNED" && (
                <div className="p-6 rounded-[2rem] bg-[#f8fdf9] border border-emerald-100/50 space-y-6 shadow-sm">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100/50 shadow-inner">
                      <ShieldCheck size={24} strokeWidth={2} />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-[13px] font-black uppercase tracking-wider text-emerald-800">
                        Delivery Verification
                      </h4>
                      <p className="text-[11px] font-medium text-slate-500">
                        Confirm NGO handoff securely
                      </p>
                    </div>
                  </div>

                  {/* OTP Label & Timer */}
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                      Enter verification code (OTP)
                    </label>
                    <div className="flex items-center gap-1.5 text-slate-400 group cursor-pointer hover:text-emerald-600 transition-colors">
                      <RotateCcw size={12} className="group-hover:rotate-45 transition-transform" />
                      <span className="text-[10px] font-bold">Resend OTP in 00:45</span>
                    </div>
                  </div>

                  {/* 6-Digit Grid Input */}
                  <div className="grid grid-cols-6 gap-3">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <div 
                        key={index}
                        className={`aspect-square rounded-2xl bg-white border-2 flex items-center justify-center text-2xl font-black transition-all duration-300 ${
                          otpValue[index] 
                            ? "border-emerald-500 text-slate-800 shadow-md shadow-emerald-500/5" 
                            : index === otpValue.length
                              ? "border-emerald-400 ring-4 ring-emerald-500/5"
                              : "border-slate-100 text-slate-200"
                        }`}
                      >
                        {otpValue[index] || (index === otpValue.length ? "|" : "•")}
                      </div>
                    ))}
                    {/* Hidden Actual Input for Focus */}
                    <input
                      type="text"
                      maxLength={6}
                      autoFocus
                      value={otpValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                      className="absolute inset-0 opacity-0 cursor-default"
                    />
                  </div>

                  {/* Verify Action */}
                  <div className="space-y-4">
                    <button
                      onClick={onOtpSubmit}
                      disabled={isVerifying || otpValue.length !== 6}
                      className="w-full py-5 rounded-[1.5rem] bg-[#1b803c] text-white flex items-center justify-center gap-3 hover:bg-[#156d32] transition-all shadow-xl shadow-emerald-900/10 active:scale-[0.98] disabled:opacity-40 disabled:grayscale font-black uppercase tracking-widest text-[13px]"
                    >
                      {isVerifying ? (
                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <ShieldCheck size={18} strokeWidth={2.5} />
                          <span>Verify Delivery</span>
                        </>
                      )}
                    </button>

                    {/* Security Footer */}
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                      <Lock size={12} />
                      <span className="text-[10px] font-bold tracking-tight">Secured by HungerFree Intelligence</span>
                    </div>
                  </div>

                  {otpError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-center animate-shake">
                      <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                        {otpError}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Volunteer Contact */}
              {d.volunteer && (
                <div className="p-7 rounded-2xl bg-slate-50 border border-slate-100 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-emerald-600 font-black text-2xl shadow-sm">
                        {d.volunteer.name?.charAt(0)}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-black uppercase tracking-tight text-slate-800">
                          {d.volunteer.name}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1.5">
                            <Star
                              className="fill-yellow-400 text-yellow-400"
                              size={12}
                            />
                            {d.volunteer.rating}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5">
                            <Phone size={12} />
                            {d.volunteer.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="px-6 py-3 rounded-xl bg-white border border-emerald-500 text-emerald-600 font-black uppercase tracking-widest text-[10px] hover:bg-emerald-500 hover:text-white transition-all shadow-sm active:scale-95 flex items-center gap-2">
                      <Phone size={14} />
                      Call
                    </button>
                  </div>
                </div>
              )}
              </div>
            );
          })()
        ) : null}
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
