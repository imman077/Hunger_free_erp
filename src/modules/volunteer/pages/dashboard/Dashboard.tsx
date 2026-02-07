import {
  MapPin,
  Clock,
  TrendingUp,
  Star,
  Zap,
  Trophy,
  Package,
  ShieldCheck,
  Calendar,
  ChevronRight,
} from "lucide-react";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";
import {
  INITIAL_TIERS,
  INITIAL_MILESTONES,
  getIcon,
} from "../../../../global/constants/milestone_config";

const VolunteerDashboard = () => {
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
      title: "Deliveries Done",
      value: "842",
      change: "+24 this month",
      icon: <Package className="w-5 h-5" />,
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
      title: "Cash Earned",
      value: "₹8,500",
      change: "Available: ₹2,500",
      icon: <ShieldCheck className="w-5 h-5" />,
      color: "#22c55e",
    },
  ];

  const recentTasks = [
    {
      title: "Multi-Stop Route - White Town",
      location: "5 Pickups Pending",
      time: "Hot Route",
      status: "3X Multiplier",
      category: "Delivery",
    },
    {
      title: "Express Delivery",
      location: "Mission Street Hub",
      time: "2 hours ago",
      status: "Completed",
      category: "Meals",
    },
  ];

  const activities = [
    {
      title: "Delivery Completed",
      time: "2 hours ago",
      desc: "Successfully delivered 15kg food bundle to Sector 4 Community Center.",
    },
    {
      title: "Profile Verified",
      time: "Yesterday",
      desc: "Vehicle insurance and registration documents verified by NGO.",
    },
    {
      title: "Badge Earned",
      time: "3 days ago",
      desc: "Awarded 'Master Courier' badge for 100+ successful deliveries.",
    },
  ];

  return (
    <div className="w-full space-y-4 max-w-[1600px] mx-auto bg-transparent">
      <div
        className="relative overflow-hidden rounded-md p-5 md:p-6 border"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[350px] h-[350px] bg-green-500 opacity-[0.05] blur-[110px] rounded-full" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1
              className="text-2xl md:text-3xl font-black tracking-tighter"
              style={{ color: "var(--text-primary)" }}
            >
              Welcome back, <span className="text-green-500">Rahul!</span>
            </h1>
            <p
              className="font-medium text-xs max-w-md text-start leading-tight"
              style={{ color: "var(--text-secondary)" }}
            >
              You've delivered over{" "}
              <span
                className="font-black underline decoration-green-500 decoration-2 underline-offset-4"
                style={{ color: "var(--text-primary)" }}
              >
                850 meals
              </span>{" "}
              this month. Heroes don't wear capes, they drive!
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <div
              className="group/hero-stat flex flex-col gap-3 p-4 rounded-md border min-w-[280px] shadow-inner transition-colors duration-300 hover:bg-green-500/5"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-sm flex items-center justify-center shadow-lg shadow-green-500/10 transition-transform duration-300 group-hover/hero-stat:-translate-y-1`}
                  style={{ backgroundColor: `${currentTier.color}20` }}
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
                    Current Volunteer Rank
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
                    style={{ backgroundColor: "var(--border-color)" }}
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
        {/* Recent Tasks (8 cols) */}
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
                className="text-[11px] font-black uppercase tracking-widest"
                style={{ color: "var(--text-primary)" }}
              >
                Ongoing & Recent Tasks
              </h2>
              <button className="text-[8px] font-black text-green-600 hover:text-green-700 uppercase tracking-widest transition-colors focus:outline-none">
                FIND NEW TASKS
              </button>
            </div>

            <div className="space-y-4 flex-1">
              {recentTasks.map((activity, idx) => {
                const isCompleted = activity.status === "Completed";
                return (
                  <div
                    key={idx}
                    className="group flex items-center justify-between p-4 rounded-md transition-all duration-300 hover:bg-slate-500/5 cursor-pointer border border-slate-100 hover:border-green-500/20 shadow-sm"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <div className="flex items-center gap-5 min-w-0">
                      <div
                        className={`w-12 h-12 rounded-md shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                          isCompleted
                            ? "bg-emerald-500/10 text-green-600 border border-emerald-500/10"
                            : "bg-orange-500/10 text-orange-500 border-orange-500/10"
                        }`}
                      >
                        <MapPin
                          size={20}
                          className="transition-transform group-hover:-translate-y-0.5"
                        />
                      </div>

                      <div className="min-w-0 text-start">
                        <h3
                          className="text-sm font-black tracking-tight truncate group-hover:text-green-600 transition-colors mb-1 leading-none"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {activity.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <p
                            className="text-[9px] font-black uppercase tracking-widest truncate leading-none"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {activity.location}
                          </p>
                          <span
                            className="w-1 h-1 rounded-full opacity-25"
                            style={{ backgroundColor: "var(--text-muted)" }}
                          />
                          <span
                            className="text-[9px] font-black uppercase tracking-widest"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {activity.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="flex flex-col items-end gap-2 shrink-0 ml-4 border-l pl-6"
                      style={{ borderColor: "var(--border-color)" }}
                    >
                      <span
                        className="text-[9px] font-black uppercase tracking-[0.2em] tabular-nums font-sans"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {activity.time}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-sm text-[8px] font-black uppercase tracking-[0.2em] border shadow-sm ${
                          isCompleted
                            ? "text-green-600 bg-green-500/10 border-green-500/20"
                            : "text-orange-600 bg-orange-500/10 border-orange-500/20"
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

        {/* Operational Status (4 cols) */}
        <div className="lg:col-span-4 space-y-4 h-full flex flex-col">
          {/* Transport Card */}
          <section
            className="p-6 rounded-md shadow-sm border"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
            }}
          >
            <h3
              className="text-[11px] font-black tracking-tight uppercase mb-5 flex items-center justify-between"
              style={{ color: "var(--text-primary)" }}
            >
              Transport Status
              <TrendingUp size={14} className="text-green-500" />
            </h3>
            <div
              className="flex items-center gap-4 p-3 rounded-md border group transition-colors hover:bg-green-500/5"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-color)",
              }}
            >
              <div
                className="w-12 h-12 rounded-md border flex items-center justify-center text-3xl shrink-0 group-hover:border-green-500/30"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                }}
              >
                🚲
              </div>
              <div className="text-left">
                <h5
                  className="text-sm font-black leading-none"
                  style={{ color: "var(--text-primary)" }}
                >
                  Electric Bicycle
                </h5>
                <p
                  className="text-[9px] font-black mt-1 uppercase tracking-widest leading-none"
                  style={{ color: "var(--text-muted)" }}
                >
                  Model: EcoRider 3000
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-green-500/10 text-green-600 text-[8px] font-black rounded-sm border border-green-500/10">
                    VERIFIED
                  </span>
                </div>
              </div>
              <ChevronRight
                size={16}
                className="ml-auto opacity-30 group-hover:opacity-100 group-hover:text-green-500 transition-all cursor-pointer"
              />
            </div>
          </section>

          {/* Availability Card */}
          <section
            className="p-6 rounded-md shadow-sm h-full border"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
            }}
          >
            <h3
              className="text-[11px] font-black tracking-tight uppercase mb-5 flex items-center justify-between"
              style={{ color: "var(--text-primary)" }}
            >
              Schedule: Week 06
              <Calendar size={14} className="text-green-500" />
            </h3>
            <div className="grid grid-cols-7 gap-1 flex-1">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => {
                const isActive = [0, 2, 4, 5].includes(idx);
                return (
                  <div
                    key={idx}
                    className={`aspect-square flex flex-col items-center justify-center rounded-sm border transition-all ${
                      isActive
                        ? "bg-green-500/10 border-green-500/20 shadow-sm"
                        : "opacity-20 translate-y-0"
                    }`}
                    style={{
                      borderColor: isActive
                        ? "var(--color-emerald)"
                        : "var(--border-color)",
                    }}
                  >
                    <span
                      className={`text-[8px] font-black ${
                        isActive ? "text-green-600" : ""
                      }`}
                      style={{ color: !isActive ? "var(--text-muted)" : "" }}
                    >
                      {day}
                    </span>
                    <div
                      className={`w-1 h-1 rounded-full mt-1 ${
                        isActive ? "bg-green-500" : "bg-slate-500/30"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
            <p
              className="text-[9px] font-bold mt-4 leading-tight italic"
              style={{ color: "var(--text-muted)" }}
            >
              Active days determine task priority and points multipliers.
            </p>
          </section>
        </div>
      </div>

      <div className="px-6 grid grid-cols-1 lg:grid-cols-12 gap-4 pb-10">
        {/* Task Milestones (8 cols) */}
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
                className="text-[11px] font-black uppercase tracking-widest"
                style={{ color: "var(--text-primary)" }}
              >
                Leveling & Milestones
              </h2>
              <button className="text-[8px] font-black text-green-600 hover:text-green-700 uppercase tracking-widest transition-colors focus:outline-none">
                ALL ACHIEVEMENTS
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1 overflow-y-auto pr-2 max-h-[300px] thin-scrollbar">
              {INITIAL_MILESTONES.filter(
                (badge) => badge.category === "volunteers",
              )
                .map((badge, i) => ({
                  badge,
                  i,
                  isUnlocked: i < 3,
                }))
                .map(({ badge, i, isUnlocked }) => {
                  const BadgeIcon = getIcon(badge.icon || "Award");
                  return (
                    <div
                      key={i}
                      className={`group relative p-4 rounded-md border flex flex-col items-center text-center gap-3 transition-all duration-300 justify-center h-[140px] ${
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
                        className={`w-11 h-11 shrink-0 rounded-sm flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-1.5 ${
                          isUnlocked
                            ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
                            : "bg-slate-500/10 text-slate-500"
                        }`}
                      >
                        <BadgeIcon size={18} />
                      </div>
                      <div className="space-y-0.5">
                        <h3
                          className="text-[10px] font-black uppercase tracking-tight leading-tight"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {badge.name}
                        </h3>
                        <p
                          className="text-[8px] font-bold leading-snug"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {isUnlocked ? "Unlocked" : "Locked"}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Activity Details (4 cols) */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <section className="bg-white border border-slate-100 p-6 rounded-md shadow-sm h-full flex flex-col">
            <h3 className="text-[11px] font-black tracking-tight uppercase text-slate-800 mb-6 flex items-center justify-between">
              Account History Log
              <Clock size={14} className="text-green-500" />
            </h3>
            <div className="relative space-y-6 flex-1">
              <div className="absolute left-[11px] top-1.5 bottom-1.5 w-px bg-slate-100" />
              {activities.map((activity, i) => (
                <div key={i} className="relative pl-8 group">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-sm border border-slate-100 flex items-center justify-center bg-white z-10 transition-colors group-hover:border-green-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-[10px] font-black text-slate-700 leading-none mb-1 group-hover:text-green-600 transition-colors uppercase">
                      {activity.title}
                    </h4>
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">
                      {activity.time}
                    </p>
                    <p className="text-[10px] text-slate-500 leading-tight font-medium">
                      {activity.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
