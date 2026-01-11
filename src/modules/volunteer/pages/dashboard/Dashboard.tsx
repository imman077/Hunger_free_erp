import {
  MapPin,
  Clock,
  CheckCircle2,
  TrendingUp,
  Star,
  Zap,
  Calendar,
} from "lucide-react";
import { ImpactCards } from "../../../../global/components/resuable-components/ImpactCards";
import ResuableButton from "../../../../global/components/resuable-components/button";

const VolunteerDashboard = () => {
  const stats = [
    {
      label: "Deliveries Done",
      val: "842",
      trend: "+24 this month",
      color: "bg-[#22c55e]",
    },
    {
      label: "Impact Points",
      val: "24,500",
      trend: "Diamond Tier",
      color: "bg-[#22c55e]",
    },
    {
      label: "Trees Planted",
      val: "45",
      trend: "Your Forest",
      color: "bg-[#22c55e]",
    },
    {
      label: "Cash Earned",
      val: "₹8,500",
      trend: "Available: ₹2,500",
      color: "bg-orange-500",
    },
  ];

  const activeRoutes = [
    {
      id: 1,
      title: "Multi-Stop Route - Area 7",
      desc: "5 Pickups Pending • Bonus: +300 PTS",
      tag: "Hot Route",
      multiplier: "3X Multiplier Active",
      icon: <MapPin size={24} />,
      status: "pending",
    },
    {
      id: 2,
      title: "Express Delivery",
      desc: "Completed in 14 mins • Bonus: +200 PTS earned",
      tag: "Ultra Fast",
      multiplier: null,
      icon: <CheckCircle2 size={24} />,
      status: "completed",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      {/* Header Section */}
      <div
        className="bg-white border-b sticky top-0 z-20"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h1
                className="text-4xl font-black tracking-tighter uppercase mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Volunteer Dashboard
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-sm border border-emerald-100">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
                  </span>
                  <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest">
                    Active - Earning 3X Points 🔥
                  </span>
                </div>
                <p
                  className="text-xs font-bold flex items-center gap-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Calendar className="w-4 h-4 text-[#22c55e]" />
                  Today: Jan 10, 2026
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <ResuableButton
                variant="primary"
                className="px-10 py-3.5 !rounded-sm text-xs font-black uppercase tracking-widest shadow-lg shadow-[#22c55e]/20"
              >
                Find New Tasks
              </ResuableButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-10 pb-16">
        {/* Impact Cards */}
        <ImpactCards data={stats} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <section
              className="border p-8 rounded-sm bg-white shadow-sm"
              style={{ borderColor: "var(--border-color)" }}
            >
              <h3 className="text-sm font-black tracking-tight uppercase text-slate-800 mb-8 flex items-center gap-3">
                <TrendingUp size={18} className="text-[#22c55e]" />
                Active Routes & Recent missions
              </h3>

              <div className="space-y-4">
                {activeRoutes.map((route) => (
                  <div
                    key={route.id}
                    className="p-8 bg-white rounded-sm border flex items-start gap-6 group cursor-pointer hover:border-[#22c55e]/30 transition-all shadow-sm"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <div
                      className={`p-4 rounded-sm border flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform ${
                        route.status === "completed"
                          ? "bg-slate-100 border-slate-200 !text-slate-400"
                          : "bg-[#22c55e] border-white shadow-lg shadow-[#22c55e]/20"
                      }`}
                    >
                      {route.icon}
                    </div>
                    <div className="flex-1 text-left pt-0.5">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-black text-lg tracking-tight text-slate-800 group-hover:text-[#22c55e] transition-colors">
                          {route.title}
                        </h4>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#22c55e] bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-100">
                          {route.tag}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-500 mb-4">
                        {route.desc}
                      </p>
                      {route.multiplier && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] py-1 flex items-center gap-1.5 font-black uppercase tracking-widest text-orange-500">
                            <Clock size={12} /> {route.multiplier}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar Area (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Rewards Progress Sidebar */}
            <section
              className="border p-8 rounded-sm bg-white shadow-sm flex flex-col items-center text-center"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-sm bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-inner">
                  <Star
                    className="text-[#22c55e]"
                    size={40}
                    fill="currentColor"
                  />
                </div>
                <div className="absolute -top-2 -right-2 px-3 py-1 bg-[#22c55e] text-white rounded-sm border-2 border-white shadow-md">
                  <p className="text-[10px] font-black uppercase tracking-tight">
                    Rank 6
                  </p>
                </div>
              </div>

              <h4 className="text-3xl font-black uppercase tracking-tighter text-slate-800 mb-2">
                Diamond
              </h4>

              <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-sm">
                <Zap className="text-[#22c55e]" size={12} fill="currentColor" />
                <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest">
                  30% Bonus Active
                </span>
              </div>

              <div className="w-full space-y-6">
                <div className="flex justify-between items-end">
                  <div className="text-left">
                    <p className="text-[10px] font-black text-[#22c55e] uppercase tracking-[0.2em] mb-1">
                      Next Tier: Legend
                    </p>
                    <p className="text-xs font-semibold text-slate-400 leading-tight">
                      Earn{" "}
                      <span className="font-black text-slate-800">
                        5,500 more
                      </span>{" "}
                      points
                    </p>
                  </div>
                  <div className="flex items-end gap-0.5">
                    <span className="text-3xl font-black text-slate-800 leading-none">
                      82
                    </span>
                    <span className="text-sm font-black text-[#22c55e] mb-0.5">
                      %
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#22c55e] to-[#1eb054] rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "82%" }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest mt-3 px-1 text-slate-400">
                    <span>Platinum</span>
                    <span className="text-[#22c55e]">Diamond</span>
                    <span>Legend</span>
                  </div>
                </div>
              </div>

              <ResuableButton
                variant="primary"
                className="w-full mt-10 py-4 !rounded-sm text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[#22c55e]/20"
              >
                Redeem Cash Prizes
              </ResuableButton>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
