import {
  MapPin,
  Clock,
  CheckCircle2,
  TrendingUp,
  Star,
  Zap,
} from "lucide-react";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";

const VolunteerDashboard = () => {
  const stats = [
    {
      title: "Deliveries Completed",
      value: "842",
      change: "+24 this month",
      changeColor: "text-green-600",
    },
    {
      title: "Impact Points",
      value: "24,500",
      change: "Diamond Tier",
      changeColor: "text-blue-600",
    },
    {
      title: "Trees Planted",
      value: "45",
      change: "Your Forest",
      changeColor: "text-emerald-600",
    },
    {
      title: "Cash Earned",
      value: "₹8,500",
      change: "Available: ₹2,500",
      changeColor: "text-orange-600",
    },
  ];

  return (
    <div className="w-full space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-black text-start uppercase tracking-tighter">
          Volunteer Dashboard
        </h1>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#ecfdf5] rounded-full border border-[#d1fae5]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
          </span>
          <span className="text-xs font-bold text-[#16a34a]">
            Active - Earning 3X Points 🔥
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
            ? "bg-blue-600"
            : item.changeColor.includes("emerald")
            ? "bg-emerald-600"
            : "bg-orange-500",
        }))}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="md:col-span-2 bg-white rounded-md p-5 border border-gray-100 flex flex-col items-start min-h-[300px]">
          <h3 className="text-lg font-semibold text-black mb-4 uppercase tracking-tight">
            Active Routes
          </h3>
          <div className="w-full space-y-4">
            <div className="p-4 bg-[#ecfdf5]/50 rounded-xl border border-[#d1fae5] flex items-start gap-4 group cursor-pointer hover:bg-[#ecfdf5] transition-all">
              <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100">
                <MapPin size={24} />
              </div>
              <div className="flex flex-col items-start pt-0.5">
                <h4 className="font-bold text-gray-900 tracking-tight">
                  Multi-Stop Route - Area 7
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  5 Pickups Pending • Bonus: +300 PTS
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="text-[10px] px-2 py-0.5 bg-blue-600 rounded-full text-white font-black uppercase tracking-widest">
                    Hot Route
                  </span>
                  <span className="text-[10px] text-gray-400 py-0.5 flex items-center gap-1 font-bold uppercase">
                    <Clock size={10} /> 3X Multiplier Active
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-4">
              <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-100">
                <CheckCircle2 size={24} />
              </div>
              <div className="flex flex-col items-start pt-0.5">
                <h4 className="font-bold text-gray-900 tracking-tight">
                  Express Delivery
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Completed in 14 mins • Bonus: +200 PTS earned
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-50 rounded-full text-emerald-700 font-black uppercase tracking-widest">
                    Ultra Fast
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ULTRA Rewards Progress */}
        <div className="bg-white rounded-[32px] p-8 border border-slate-100 flex flex-col items-center text-center shadow-sm">
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <Star className="text-blue-600" size={40} fill="currentColor" />
            </div>
            <div className="absolute -top-2 -right-2 px-3 py-1 bg-blue-600 rounded-full border-2 border-white">
              <p className="text-[10px] font-black text-white uppercase tracking-tight">
                Rank 6
              </p>
            </div>
          </div>

          <h4 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
            Diamond
          </h4>

          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
            <Zap className="text-blue-600" size={12} fill="currentColor" />
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
              30% Bonus Active
            </span>
          </div>

          <div className="w-full mt-10 space-y-6">
            <div className="flex justify-between items-end">
              <div className="text-start">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp size={14} className="text-blue-600" />
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    Next Tier: Legend
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500">
                  Earn{" "}
                  <span className="font-black text-slate-900">5,500 more</span>{" "}
                  points
                </p>
              </div>
              <div className="flex items-end gap-0.5">
                <span className="text-3xl font-black text-slate-900 leading-none">
                  82
                </span>
                <span className="text-sm font-black text-blue-600 mb-0.5">
                  %
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: "82%" }}
                />
              </div>
              <div className="flex justify-between items-center text-[9px] font-black text-slate-300 uppercase tracking-widest mt-3 px-1">
                <span>Platinum</span>
                <span className="text-blue-600">Diamond</span>
                <span>Legend</span>
              </div>
            </div>
          </div>

          <button className="w-full mt-10 py-4 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100">
            Redeem Cash Prizes
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
