import { useNavigate } from "react-router-dom";
import {
  Package,
  TrendingUp,
  Zap,
  ArrowUpRight,
  Trophy,
  Activity,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";

const NGODashboard = () => {
  const navigate = useNavigate();

  // Tier Logic for NGO (similar to Donor)
  const currentPoints = 45000;
  const progressToNext = 75; // 75% to next tier

  const stats = [
    {
      label: "Impact Points",
      val: currentPoints.toLocaleString(),
      trend: "Legend Tier",
      color: "bg-[#22c55e]",
    },
    {
      label: "Total Beneficiaries",
      val: "12,500",
      trend: "+1,200 this mo",
      color: "bg-[#22c55e]",
    },
    {
      label: "Fulfillment Rate",
      val: "94.2%",
      trend: "High Performance",
      color: "bg-[#22c55e]",
    },
    {
      label: "Grant Status",
      val: "₹3.0L",
      trend: "Unlocked",
      color: "bg-orange-600",
    },
  ];

  const notifications = [
    {
      title: "New Donation Available",
      desc: "Fresh bread from Local Bakery (10kg)",
      time: "10 mins ago",
      type: "donation",
      status: "action_needed",
    },
    {
      title: "Driver Assigned",
      desc: "Michael is on the way for pickup #2234",
      time: "45 mins ago",
      type: "logistics",
      status: "in_transit",
    },
    {
      title: "Impact Verified",
      desc: "Beneficiary report confirmed for Project Alpha",
      time: "2 hours ago",
      type: "impact",
      status: "completed",
    },
  ];

  return (
    <div className="w-full space-y-4 max-w-[1600px] mx-auto bg-transparent">
      {/* Hero / Operations Header (Matched to Donor Dashboard) */}
      <div
        className="relative overflow-hidden rounded-md p-5 md:p-6 shadow-sm border"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[350px] h-[350px] bg-[#22c55e] opacity-[0.03] blur-[110px] rounded-full" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1
              className="text-2xl md:text-3xl font-black tracking-tighter uppercase"
              style={{ color: "var(--text-primary)" }}
            >
              Operations <span className="text-[#22c55e]">Hub</span>
            </h1>
            <p
              className="font-medium text-[11px] max-w-sm text-start leading-tight"
              style={{ color: "var(--text-muted)" }}
            >
              A quick overview of your current impact and active tasks in the
              Central District.
            </p>
          </div>

          <div className="shrink-0">
            <div
              className="group/hero-stat flex flex-col gap-3 p-4 rounded-md border min-w-[280px] shadow-inner transition-colors duration-300"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-sm bg-green-500/10 flex items-center justify-center shadow-lg shadow-green-500/10 transition-transform duration-300 group-hover/hero-stat:-translate-y-1 text-[#22c55e]">
                  <Trophy size={18} />
                </div>
                <div className="text-start">
                  <p
                    className="text-[8px] font-black uppercase tracking-widest mb-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Agency Level
                  </p>
                  <div className="flex items-center gap-2">
                    <h3
                      className="text-base font-black tracking-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Platinum Partner
                    </h3>
                    <div className="p-1 px-1.5 rounded-sm bg-green-500/10">
                      <TrendingUp className="text-[#22c55e] w-2.5 h-2.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar (Matching Donor Style) */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span
                    className="text-[8px] font-black uppercase tracking-widest"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Next Tier Progress
                  </span>
                  <span className="text-[8px] font-black text-[#22c55e] uppercase tabular-nums">
                    {progressToNext}%
                  </span>
                </div>
                <div
                  className="h-1 w-full rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--bg-tertiary)" }}
                >
                  <div
                    className="h-full bg-[#22c55e] transition-all duration-1000"
                    style={{ width: `${progressToNext}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Hub (Matched to Donor px-6) */}
      <div className="px-6">
        <ImpactCards
          className="gap-3 md:gap-4"
          data={stats.map((stat) => ({
            label: stat.label,
            val: stat.val,
            trend: stat.trend,
            color: stat.color,
          }))}
        />
      </div>

      {/* Grid: Active Needs & Activity Feed (Matched to Donor Styling) */}
      <div className="px-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left Column: Operational Needs */}
        <div className="lg:col-span-8 flex flex-col h-full">
          <div
            className="rounded-md p-5 md:p-6 space-y-6 flex flex-col h-full overflow-hidden shadow-sm border"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="flex items-center justify-between px-1">
              <h2
                className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2"
                style={{ color: "var(--text-primary)" }}
              >
                <LayoutGrid size={12} className="text-[#22c55e]" /> Donation
                Marketplace
              </h2>
              <button
                onClick={() => navigate("/ngo/donations")}
                className="text-[8px] font-black text-[#22c55e] hover:text-green-700 uppercase tracking-widest transition-colors flex items-center gap-1 group"
              >
                VIEW MARKETPLACE
                <ArrowUpRight
                  size={12}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </button>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pr-1 thin-scrollbar">
              {[
                {
                  title: "Fresh Bakery Items",
                  desc: "Baker Street • 2km away",
                  type: "Immediate",
                },
                {
                  title: "Cooked Meals (20kg)",
                  desc: "Promenade Hotel • 5km away",
                  type: "Priority",
                },
                {
                  title: "Dairy Products",
                  desc: "Auroville Dairy • 12km away",
                  type: "Standard",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group p-3 px-4 rounded-md border hover:border-green-500/30 transition-all duration-300"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-start">
                      <h3
                        className="text-[11px] font-black tracking-tight group-hover:text-[#22c55e] transition-colors leading-none mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-[9px] font-bold uppercase tracking-wide"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-sm text-[7px] font-black uppercase tracking-widest border ${
                        item.type === "Priority"
                          ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                          : "bg-green-500/10 text-[#22c55e] border-green-500/20"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Information Feed */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <div
            className="rounded-md p-5 md:p-6 space-y-6 flex flex-col h-full overflow-hidden shadow-sm border"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="flex items-center justify-between px-1">
              <h2
                className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2"
                style={{ color: "var(--text-primary)" }}
              >
                <Activity size={12} className="text-[#22c55e]" /> Recent Feed
              </h2>
              <button className="text-[8px] font-black text-[#22c55e] hover:text-green-700 uppercase tracking-widest transition-colors flex items-center gap-1 group">
                LIVE UPDATES
                <ArrowUpRight
                  size={12}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </button>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pr-1 thin-scrollbar">
              {notifications.map((activity, idx) => {
                const isDonation = activity.type === "donation";
                return (
                  <div
                    key={idx}
                    className="group flex items-center justify-between p-3 px-4 rounded-md transition-all duration-300 hover:bg-slate-500/5 cursor-pointer border shadow-sm"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-md shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                          isDonation
                            ? "bg-green-500/10 text-[#22c55e] border-green-500/20"
                            : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        }`}
                      >
                        {isDonation ? (
                          <Package
                            size={18}
                            className="transition-transform group-hover:-translate-y-0.5"
                          />
                        ) : (
                          <Zap
                            size={18}
                            className="transition-transform group-hover:-translate-y-0.5"
                          />
                        )}
                      </div>

                      <div className="min-w-0 text-start">
                        <h3
                          className="text-sm font-black tracking-tight truncate group-hover:text-[#22c55e] transition-colors mb-0.5 leading-none"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {activity.title}
                        </h3>
                        <p
                          className="text-[10px] font-bold truncate leading-tight"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {activity.desc}
                        </p>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-end gap-1.5 shrink-0 ml-4 border-l pl-4"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <span
                        className="text-[8px] font-black uppercase tracking-[0.2em] tabular-nums font-sans"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {activity.time}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-sm text-[7px] font-black uppercase tracking-[0.2em] border flex items-center gap-1 ${
                          activity.status === "completed"
                            ? "text-[#22c55e] bg-green-500/10 border-green-500/20"
                            : activity.status === "in_transit"
                              ? "text-blue-500 bg-blue-500/10 border-blue-500/20"
                              : "text-amber-600 bg-amber-500/10 border-amber-500/20"
                        }`}
                      >
                        {activity.status.replace("_", " ")}
                        <ChevronRight size={8} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;
