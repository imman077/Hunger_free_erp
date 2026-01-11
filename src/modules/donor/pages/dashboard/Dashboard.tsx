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
      color: "#f59e0b",
    },
    {
      title: "Impact Points",
      value: "24,500",
      change: "Diamond Tier",
      icon: <Star className="w-5 h-5" />,
      color: "#f59e0b",
    },
    {
      title: "Trees Planted",
      value: "45",
      change: "Your Forest",
      icon: <Zap className="w-5 h-5" />,
      color: "#f59e0b",
    },
    {
      title: "Available Points",
      value: "8,200",
      change: "Redeem for Cash",
      icon: <ShieldCheck className="w-5 h-5" />,
      color: "#f59e0b",
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
    <div className="w-full space-y-8 p-6 max-w-[1700px] mx-auto bg-transparent">
      {/* Hero / Header Section */}
      <div className="relative overflow-hidden rounded-md bg-white p-8 md:p-10 border border-slate-100">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[450px] h-[450px] bg-amber-500 opacity-[0.03] blur-[110px] rounded-full" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2.5 px-4 py-1 rounded-sm bg-amber-500/5 border border-amber-500/10">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-600">
                Live Impact Status
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-800">
              Welcome back, <span className="text-amber-500">Anish!</span>
            </h1>
            <p className="text-slate-500 font-medium text-base max-w-lg text-start leading-relaxed">
              Your kindness has touched over{" "}
              <span className="text-slate-800 font-black underline decoration-amber-500 decoration-2 underline-offset-4">
                1,200 lives
              </span>{" "}
              this month alone.
            </p>
          </div>

          <div className="shrink-0">
            <div className="group/hero-stat flex items-center gap-8 bg-slate-50/50 p-6 md:p-7 rounded-md border border-slate-100 min-w-[320px] shadow-inner transition-colors duration-300 hover:bg-amber-50/30">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-sm flex items-center justify-center shadow-lg shadow-amber-500/20 transition-transform duration-300 group-hover/hero-stat:-translate-y-1">
                <Award className="text-white w-7 h-7" />
              </div>
              <div className="text-start">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                  Current Contribution Tier
                </p>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">
                    Diamond Donor
                  </h3>
                  <div className="p-1.5 rounded-sm bg-amber-500/10">
                    <TrendingUp className="text-amber-500 w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <ImpactCards
        data={stats.map((stat) => ({
          label: stat.title,
          val: stat.value,
          trend: stat.change,
          color: stat.color === "#f59e0b" ? "bg-amber-500" : "bg-slate-300",
        }))}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
        {/* Left Column: Milestones */}
        <div className="bg-white border border-slate-100 rounded-md p-8 space-y-8">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              Impact Milestones
            </h2>
            <button className="text-[10px] font-black text-amber-600 hover:underline uppercase tracking-widest">
              View all
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                className={`group relative p-8 rounded-md border flex flex-col items-center text-center gap-5 transition-all duration-300 aspect-square justify-center ${
                  badge.unlocked
                    ? "bg-slate-50/50 border-slate-100 hover:border-amber-500/30 hover:bg-white"
                    : "bg-slate-50/20 border-slate-100 opacity-50 grayscale"
                }`}
              >
                <div
                  className={`w-16 h-16 shrink-0 rounded-sm flex items-center justify-center text-white transition-transform duration-500 group-hover:-translate-y-2 ${
                    badge.unlocked
                      ? "bg-amber-500 shadow-lg shadow-amber-500/20"
                      : "bg-slate-300"
                  }`}
                >
                  {React.cloneElement(
                    badge.icon as React.ReactElement<{ size: number }>,
                    {
                      size: 32,
                    }
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-slate-800 tracking-tighter transition-colors duration-300 group-hover:text-amber-600">
                    {badge.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-bold leading-relaxed max-w-[140px]">
                    {badge.desc}
                  </p>
                  <div className="pt-2">
                    {badge.unlocked ? (
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100/50">
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
        <div className="bg-white border border-slate-100 rounded-md p-8 space-y-8 h-full">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              Recent Activity
            </h2>
            <button className="text-[10px] font-black uppercase tracking-widest text-amber-600 hover:underline underline-offset-4 transition-all">
              Details
            </button>
          </div>

          <div className="space-y-2">
            {recentDonations.map((activity, idx) => {
              const isCollected = activity.status === "Collected";

              return (
                <div
                  key={idx}
                  className="group flex items-center justify-between p-4 rounded-md transition-all duration-300 hover:bg-slate-50/80 cursor-pointer"
                >
                  <div className="flex items-center gap-5 min-w-0">
                    {/* Status Icon Wrapper */}
                    <div
                      className={`w-12 h-12 rounded-md shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                        isCollected
                          ? "bg-amber-50 text-amber-600 border border-amber-100/50"
                          : "bg-blue-50 text-blue-500 border border-blue-100/50"
                      }`}
                    >
                      <Package
                        size={20}
                        className="transition-transform group-hover:-translate-y-0.5"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[13px] font-black text-slate-800 tracking-tight truncate group-hover:text-amber-600 transition-colors mb-1">
                        {activity.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
                          {activity.ngo}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0 ml-4">
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest tabular-nums font-sans">
                      {activity.time}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-widest border ${
                        isCollected
                          ? "text-amber-600 bg-amber-50/50 border-amber-100/50"
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
