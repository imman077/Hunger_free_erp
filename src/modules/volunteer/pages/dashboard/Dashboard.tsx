import {
  MapPin,
  Clock,
  CheckCircle2,
  Trophy,
  TrendingUp,
  Star,
} from "lucide-react";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";

const VolunteerDashboard = () => {
  const stats = [
    {
      title: "Deliveries Completed",
      value: "32",
      change: "+4 this week",
      changeColor: "text-green-600",
    },
    {
      title: "Hours Volunteered",
      value: "156",
      change: "Top 5% in city",
      changeColor: "text-blue-600",
    },
    {
      title: "Carbon Offset",
      value: "45kg",
      change: "e-Vehicle used",
      changeColor: "text-emerald-600",
    },
    {
      title: "Active Assignments",
      value: "2",
      change: "Due today",
      changeColor: "text-orange-600",
    },
  ];

  return (
    <div className="w-full space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-black text-start">
          Volunteer Dashboard
        </h1>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#ecfdf5] rounded-full border border-[#d1fae5]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
          </span>
          <span className="text-xs font-bold text-[#16a34a]">
            Active - Available for Pickups
          </span>
        </div>
      </div>

      <ImpactCards
        data={stats.map((item) => ({
          label: item.title,
          val: item.value,
          trend: item.change,
          color: item.changeColor.includes("green")
            ? "bg-[#22c55e]"
            : item.changeColor.includes("blue")
            ? "bg-blue-500"
            : "bg-orange-500",
        }))}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="md:col-span-2 bg-white rounded-md p-5 border border-gray-100 flex flex-col items-start min-h-[300px]">
          <h3 className="text-lg font-semibold text-black mb-4">
            Today's Schedule
          </h3>
          <div className="w-full space-y-4">
            <div className="p-4 bg-[#ecfdf5]/50 rounded-xl border border-[#d1fae5] flex items-start gap-4 group cursor-pointer hover:bg-[#ecfdf5] transition-all">
              <div className="p-3 bg-[#22c55e] text-white rounded-xl shadow-lg shadow-[#d1fae5]">
                <MapPin size={24} />
              </div>
              <div className="flex flex-col items-start pt-0.5">
                <h4 className="font-bold text-gray-900">
                  Food Collection - Local Bakery
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Pickup at 2:00 PM • 15th Ave Street
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="text-[10px] px-2 py-0.5 bg-white rounded-full border border-[#d1fae5] text-[#16a34a] font-bold uppercase">
                    Pickup Pending
                  </span>
                  <span className="text-[10px] text-gray-400 py-0.5 flex items-center gap-1">
                    <Clock size={10} /> 45 mins from now
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-4 opacity-75">
              <div className="p-3 bg-blue-500 text-white rounded-xl">
                <CheckCircle2 size={24} />
              </div>
              <div className="flex flex-col items-start pt-0.5">
                <h4 className="font-bold text-gray-900">
                  Delivery - Orphanage Home
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Completed at 10:30 AM • Downtown Area
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] px-2 py-0.5 bg-blue-50 rounded-full text-blue-700 font-bold uppercase">
                    Completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Progress */}
        <div className="bg-white rounded-[32px] p-8 border border-slate-100 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-3xl bg-white border border-slate-100 flex items-center justify-center">
              <Trophy className="text-[#22c55e]" size={40} strokeWidth={1.5} />
            </div>
            <div className="absolute -top-2 -right-2 px-3 py-1 bg-[#22c55e] rounded-full border-2 border-white">
              <p className="text-[10px] font-black text-white uppercase tracking-tight">
                Level 4
              </p>
            </div>
          </div>

          <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
            Elite Courier
          </h4>

          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#22c55e]/30 rounded-full">
            <Star className="text-[#22c55e]" size={12} fill="currentColor" />
            <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-wider">
              Master Volunteer Path
            </span>
          </div>

          <div className="w-full mt-10 space-y-6">
            <div className="flex justify-between items-end">
              <div className="text-start">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp size={14} className="text-[#22c55e]" />
                  <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest">
                    Next Milestone
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500">
                  <span className="font-black text-slate-900">8 more</span>{" "}
                  deliveries to reach{" "}
                  <span className="font-bold text-[#22c55e]">Level 5</span>
                </p>
              </div>
              <div className="flex items-end gap-0.5">
                <span className="text-3xl font-black text-slate-900 leading-none">
                  85
                </span>
                <span className="text-sm font-black text-[#22c55e] mb-0.5">
                  %
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                <div
                  className="h-full bg-gradient-to-r from-[#22c55e] to-[#4ade80] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: "85%" }}
                />
              </div>
              <div className="flex justify-between items-center text-[9px] font-black text-slate-300 uppercase tracking-widest mt-3 px-1">
                <span>Rookie</span>
                <span className="text-[#22c55e]">Elite</span>
                <span>Legendary</span>
              </div>
            </div>
          </div>

          <button className="w-full mt-10 py-4 bg-[#22c55e] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#16a34a] transition-all active:scale-95">
            Claim Rewards
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
