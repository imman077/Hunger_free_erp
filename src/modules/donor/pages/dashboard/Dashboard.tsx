import {
  Heart,
  Package,
  Clock,
  Star,
  TrendingUp,
  ShieldCheck,
  Zap,
  Trophy,
} from "lucide-react";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";
import {
  INITIAL_TIERS,
  INITIAL_MILESTONES,
  getIcon,
} from "../../../../global/constants/milestone_config";

const DonorDashboard = () => {
  const currentPoints = 24500;
  const currentTier =
    INITIAL_TIERS.find((t) => currentPoints >= t.pointsRequired) ||
    INITIAL_TIERS[0];
  const nextTier = INITIAL_TIERS[INITIAL_TIERS.indexOf(currentTier) + 1];
  const progressToNext = nextTier
    ? ((currentPoints - currentTier.pointsRequired) /
        (nextTier.pointsRequired - currentTier.pointsRequired)) *
      100
    : 100;

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
      value: currentPoints.toLocaleString(),
      change: `${currentTier.name} Tier`,
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
  ];

  return (
    <div className="w-full space-y-4 max-w-[1600px] mx-auto bg-transparent">
      {/* Hero / Header Section */}
      <div
        className="relative overflow-hidden rounded-md p-5 md:p-6 border"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[350px] h-[350px] bg-green-500 opacity-[0.03] blur-[110px] rounded-full" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1
              className="text-2xl md:text-3xl font-black tracking-tighter"
              style={{ color: "var(--text-primary)" }}
            >
              Welcome back, <span className="text-green-500">Anish!</span>
            </h1>
            <p
              className="font-medium text-xs max-w-md text-start leading-tight"
              style={{ color: "var(--text-muted)" }}
            >
              Your kindness has touched over{" "}
              <span
                className="font-black underline decoration-green-500 decoration-2 underline-offset-4"
                style={{ color: "var(--text-primary)" }}
              >
                1,200 lives
              </span>{" "}
              this month alone.
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
                <div
                  className={`w-10 h-10 rounded-sm flex items-center justify-center shadow-lg shadow-green-500/10 transition-transform duration-300 group-hover/hero-stat:-translate-y-1`}
                  style={{ backgroundColor: `${currentTier.color}15` }}
                >
                  <Trophy
                    className="w-5 h-5"
                    style={{ color: currentTier.color }}
                  />
                </div>
                <div className="text-start">
                  <p
                    className="text-[8px] font-black uppercase tracking-widest mb-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Current Contribution Tier
                  </p>
                  <div className="flex items-center gap-2">
                    <h3
                      className="text-base font-black tracking-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {currentTier.name}
                    </h3>
                    <div className="p-1 px-1.5 rounded-sm bg-green-500/10">
                      <TrendingUp className="text-green-500 w-2.5 h-2.5" />
                    </div>
                  </div>
                </div>
              </div>

              {nextTier && (
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span
                      className="text-[8px] font-black uppercase tracking-widest"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Progress to {nextTier.name}
                    </span>
                    <span className="text-[8px] font-black text-green-600 uppercase tabular-nums">
                      {Math.round(progressToNext)}%
                    </span>
                  </div>
                  <div
                    className="h-1 w-full rounded-full overflow-hidden"
                    style={{ backgroundColor: "var(--bg-tertiary)" }}
                  >
                    <div
                      className="h-full bg-green-500 transition-all duration-1000"
                      style={{ width: `${progressToNext}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6">
        <ImpactCards
          className="gap-3 md:gap-4"
          data={stats.map((stat) => ({
            label: stat.title,
            val: stat.value,
            trend: stat.change,
            color: stat.color === "#22c55e" ? "bg-green-500" : "bg-slate-300",
          }))}
        />
      </div>

      <div className="px-6 grid grid-cols-1 lg:grid-cols-12 gap-4 pt-0 items-stretch">
        {/* Left Column: Milestones */}
        <div className="lg:col-span-8 flex flex-col h-full">
          <div
            className="rounded-md p-5 md:p-6 space-y-6 flex flex-col h-full overflow-hidden border"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="flex items-center justify-between px-1">
              <h2
                className="text-[11px] font-black uppercase tracking-widest"
                style={{ color: "var(--text-primary)" }}
              >
                Impact Milestones
              </h2>
              <button className="text-[8px] font-black text-green-600 hover:text-green-700 uppercase tracking-widest transition-colors focus:outline-none">
                VIEW ALL
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 flex-1 overflow-y-auto pr-2 max-h-[500px] thin-scrollbar">
              {INITIAL_MILESTONES.filter((badge) => badge.category === "donors")
                .map((badge, i) => ({
                  badge,
                  i,
                  isUnlocked: i < 3,
                }))
                .sort((a, b) => {
                  if (a.isUnlocked && !b.isUnlocked) return -1;
                  if (!a.isUnlocked && b.isUnlocked) return 1;
                  return 0;
                })
                .map(({ badge, i, isUnlocked }) => {
                  const BadgeIcon = getIcon(badge.icon || "Award");
                  return (
                    <div
                      key={i}
                      className={`group relative p-6 rounded-md border flex flex-col items-center text-center gap-4 transition-all duration-300 justify-center h-full ${
                        isUnlocked
                          ? "shadow-sm hover:shadow-md"
                          : "opacity-40 grayscale"
                      }`}
                      style={{
                        backgroundColor: isUnlocked
                          ? "var(--bg-secondary)"
                          : "var(--bg-tertiary)",
                        borderColor: isUnlocked
                          ? "var(--color-emerald-light)"
                          : "var(--border-color)",
                      }}
                    >
                      <div
                        className={`w-14 h-14 shrink-0 rounded-sm flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2 ${
                          isUnlocked
                            ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
                            : "bg-slate-500/10 text-slate-500"
                        }`}
                      >
                        <BadgeIcon size={24} />
                      </div>

                      <div className="space-y-1 flex-1 flex flex-col justify-center">
                        <h3
                          className="text-xs font-black uppercase tracking-tight leading-tight"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {badge.name}
                        </h3>
                        <p
                          className="text-[10px] font-bold leading-snug"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {badge.desc}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-md text-[7px] font-black uppercase tracking-widest ${
                          isUnlocked
                            ? "bg-green-500/10 text-green-600 border border-green-500/20"
                            : "opacity-30 border border-current"
                        }`}
                        style={{ color: isUnlocked ? "" : "var(--text-muted)" }}
                      >
                        {isUnlocked ? "UNLOCKED" : "LOCKED"}
                      </span>
                      {!isUnlocked && (
                        <div
                          className="absolute top-4 right-4 opacity-20"
                          style={{ color: "var(--text-primary)" }}
                        >
                          <Clock size={16} />
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Right Column: Activity */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <div
            className="rounded-md p-5 md:p-6 space-y-6 flex flex-col h-full overflow-hidden border"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="flex items-center justify-between px-1">
              <h2
                className="text-[11px] font-black uppercase tracking-widest"
                style={{ color: "var(--text-primary)" }}
              >
                Recent Activity
              </h2>
              <button className="text-[8px] font-black text-green-600 hover:text-green-700 uppercase tracking-widest transition-colors focus:outline-none">
                DETAILS
              </button>
            </div>

            <div className="space-y-4 flex-1">
              {recentDonations.map((activity, idx) => {
                const isCollected = activity.status === "Collected";

                return (
                  <div
                    key={idx}
                    className="group flex items-center justify-between p-3 px-4 rounded-md transition-all duration-300 hover:bg-slate-500/5 cursor-pointer border shadow-sm"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-md shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                          isCollected
                            ? "bg-green-500/10 text-green-600 border border-green-500/10"
                            : "bg-blue-500/10 text-blue-500 border border-blue-500/10"
                        }`}
                      >
                        <Package
                          size={18}
                          className="transition-transform group-hover:-translate-y-0.5"
                        />
                      </div>

                      <div className="min-w-0 text-start">
                        <h3
                          className="text-sm font-black tracking-tight truncate group-hover:text-green-600 transition-colors mb-0.5 leading-none"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {activity.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <p
                            className="text-[9px] font-black uppercase tracking-widest truncate leading-none"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {activity.ngo}
                          </p>
                        </div>
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
                        className={`px-2.5 py-0.5 rounded-sm text-[7px] font-black uppercase tracking-[0.2em] border ${
                          isCollected
                            ? "text-green-600 bg-green-500/10 border-green-500/20"
                            : "text-blue-500 bg-blue-500/10 border-blue-500/20"
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
    </div>
  );
};

export default DonorDashboard;
