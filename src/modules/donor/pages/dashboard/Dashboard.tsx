import React from "react";
import {
  Heart,
  Package,
  Clock,
  Award,
  Star,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";

const DonorDashboard = () => {
  const stats = [
    {
      title: "Total Donations",
      value: "342",
      change: "+12 this week",
      icon: <Heart className="w-5 h-5" />,
      color: "#22c55e",
    },
    {
      title: "Impact Points",
      value: "24,500",
      change: "Diamond Tier",
      icon: <Star className="w-5 h-5" />,
      color: "#22c55e",
    },
    {
      title: "Trees Planted",
      value: "45",
      change: "Your Forest",
      icon: <Zap className="w-5 h-5" />,
      color: "#22c55e",
    },
    {
      title: "Available Points",
      value: "8,200",
      change: "Redeem for Cash",
      icon: <ShieldCheck className="w-5 h-5" />,
      color: "#22c55e",
    },
  ];

  const recentDonations = [
    {
      title: "Fresh Vegetables & Fruits",
      ngo: "Green Harvest NGO",
      time: "2 hours ago",
      status: "Collected",
      category: "Food",
    },
    {
      title: "Cooked Meals (10 portions)",
      ngo: "Hope Shelter",
      time: "Yesterday",
      status: "In Transit",
      category: "Meals",
    },
    {
      title: "Winter Blankets (5 sets)",
      ngo: "Unity NGO",
      time: "2 days ago",
      status: "Delivered",
      category: "Essentials",
    },
  ];

  return (
    <div className="w-full space-y-6 max-w-[1600px] mx-auto bg-transparent p-6 md:p-10">
      {/* Hero / Header Section */}
      <div className="relative overflow-hidden rounded-md bg-white p-6 md:p-8">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[450px] h-[450px] bg-green-500 opacity-[0.03] blur-[110px] rounded-full" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-sm bg-green-500/5 border border-green-500/10">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-green-600">
                Live Impact Status
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-800">
              Welcome back, <span className="text-green-500">Anish!</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm max-w-lg text-start leading-tight">
              Your kindness has touched over{" "}
              <span className="text-slate-800 font-black underline decoration-green-500 decoration-2 underline-offset-4">
                1,200 lives
              </span>{" "}
              this month alone.
            </p>
          </div>

          <div className="shrink-0">
            <div className="group/hero-stat flex items-center gap-6 bg-slate-50/50 p-5 md:p-6 rounded-md border border-slate-100 min-w-[280px] shadow-inner transition-colors duration-300 hover:bg-green-50/30">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-sm flex items-center justify-center shadow-lg shadow-green-500/20 transition-transform duration-300 group-hover/hero-stat:-translate-y-1">
                <Award className="text-white w-6 h-6" />
              </div>
              <div className="text-start">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                  Current Contribution Tier
                </p>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-black text-slate-800 tracking-tight">
                    Diamond Donor
                  </h3>
                  <div className="p-1 px-1.5 rounded-sm bg-green-500/10">
                    <TrendingUp className="text-green-500 w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <ImpactCards
        className="gap-4 md:gap-6"
        data={stats.map((stat) => ({
          label: stat.title,
          val: stat.value,
          trend: stat.change,
          color: stat.color === "#22c55e" ? "bg-green-500" : "bg-slate-300",
        }))}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-0">
        {/* Left Column: Milestones */}
        <div className="bg-white border border-slate-100 rounded-md p-8 md:p-10 space-y-8">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">
              Impact Milestones
            </h2>
            <button className="text-[9px] font-black text-green-600 hover:underline uppercase tracking-widest">
              View all
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              {
                name: "Kind Soul",
                desc: "Reached 50 donations milestone",
                status: "Unlocked",
                date: "Oct 24, 2024",
                icon: <Heart size={24} />,
                unlocked: true,
              },
              {
                name: "Food Hero",
                desc: "Donate 5 more times to unlock",
                status: "Locked",
                icon: <Package size={24} />,
                unlocked: false,
              },
            ].map((badge, i) => (
              <div
                key={i}
                className={`group relative p-6 rounded-md border flex flex-col items-center text-center gap-4 transition-all duration-300 justify-center ${
                  badge.unlocked
                    ? "bg-slate-50/50 border-slate-100 hover:border-green-500/30 hover:bg-white"
                    : "bg-slate-50/20 border-slate-100 opacity-50 grayscale"
                }`}
              >
                <div
                  className={`w-14 h-14 shrink-0 rounded-sm flex items-center justify-center text-white transition-transform duration-500 group-hover:-translate-y-2 ${
                    badge.unlocked
                      ? "bg-green-500 shadow-lg shadow-green-500/20"
                      : "bg-slate-300"
                  }`}
                >
                  {React.cloneElement(
                    badge.icon as React.ReactElement<{ size: number }>,
                    {
                      size: 28,
                    },
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-slate-800 tracking-tighter transition-colors duration-300 group-hover:text-green-600">
                    {badge.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-bold leading-relaxed max-w-[140px]">
                    {badge.desc}
                  </p>
                  <div className="pt-2">
                    {badge.unlocked ? (
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-100/50">
                        {badge.status}
                      </span>
                    ) : (
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-100/50 px-2 py-1 rounded-md border border-slate-200/50">
                        {badge.status}
                      </span>
                    )}
                  </div>
                </div>
                {!badge.unlocked && (
                  <div className="absolute top-4 right-4 text-slate-300">
                    <Clock size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Activity */}
        <div className="bg-white border border-slate-100 rounded-md p-8 md:p-10 space-y-8 h-full">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">
              Recent Activity
            </h2>
            <button className="text-[9px] font-black uppercase tracking-widest text-green-600 hover:underline underline-offset-4 transition-all">
              Details
            </button>
          </div>

          <div className="space-y-1">
            {recentDonations.map((activity, idx) => {
              const isCollected = activity.status === "Collected";

              return (
                <div
                  key={idx}
                  className="group flex items-center justify-between p-4 rounded-md transition-all duration-300 hover:bg-slate-50/80 cursor-pointer"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Status Icon Wrapper */}
                    <div
                      className={`w-10 h-10 rounded-md shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                        isCollected
                          ? "bg-green-50 text-green-600 border border-green-100/50"
                          : "bg-blue-50 text-blue-500 border border-blue-100/50"
                      }`}
                    >
                      <Package
                        size={18}
                        className="transition-transform group-hover:-translate-y-0.5"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[12px] font-black text-slate-800 tracking-tight truncate group-hover:text-green-600 transition-colors mb-0.5">
                        {activity.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">
                          {activity.ngo}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0 ml-4">
                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest tabular-nums font-sans">
                      {activity.time}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-sm text-[7px] font-black uppercase tracking-widest border ${
                        isCollected
                          ? "text-green-600 bg-green-50/50 border-green-100/50"
                          : "text-blue-500 bg-blue-50/50 border-blue-100/50"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
