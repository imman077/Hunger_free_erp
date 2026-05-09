import { motion } from "framer-motion";
import {
  Package,
  Clock,
  TrendingUp,
  Trophy,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import ImpactCards from "../../../../global/components/resuable-components/ImpactCards";
import {
  INITIAL_TIERS,
  INITIAL_MILESTONES,
  getIcon,
} from "../../../../global/constants/milestone_config";
import { useDonorDashboard } from "../hooks/useDonorDashboard";
import { type DonorStat, type RecentActivity } from "../../store/donor-schemas";
import NGONeedsFeed from "./NGONeedsFeed";
import WeeklyImpactBanner from "./WeeklyImpactBanner";

const DonorDashboard = () => {
  const { currentPoints, stats, recentActivities, urgentNeedsCount, profile } =
    useDonorDashboard();

  // Fix: Find the highest tier achieved by searching from the top down
  const currentTier =
    [...INITIAL_TIERS]
      .reverse()
      .find((t) => currentPoints >= t.pointsRequired) || INITIAL_TIERS[0];

  const nextTier = INITIAL_TIERS[INITIAL_TIERS.indexOf(currentTier) + 1];

  const pointsInRange = nextTier
    ? currentPoints - currentTier.pointsRequired
    : 0;
  const rangeTotal = nextTier
    ? nextTier.pointsRequired - currentTier.pointsRequired
    : 1;

  const progressToNext = nextTier
    ? Math.min((pointsInRange / rangeTotal) * 100, 100)
    : 100;

  const pointsRemaining = nextTier
    ? nextTier.pointsRequired - currentPoints
    : 0;

  const firstName = profile?.name ? profile.name.split(" ")[0] : "Anish";

  return (
    <div className="w-full space-y-4 max-w-[1600px] mx-auto bg-transparent p-4">
      {/* Hero / Header Section */}
      <div
        className="relative overflow-hidden p-5 md:p-10"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[450px] h-[450px] bg-green-500 opacity-[0.04] blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[300px] h-[300px] bg-blue-500 opacity-[0.03] blur-[100px] rounded-full" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-4 flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-2"
            >
              <div className="relative inline-block">
                {/* Decorative Elements (Confetti) - Closer to Text */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: -25 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute -top-6 -left-4 w-4 h-2 bg-green-500 rounded-full"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: 30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 15 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="absolute top-2 -left-8 w-2.5 h-1.5 bg-green-400 rounded-full"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: 45 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="absolute -top-4 -right-8 w-3.5 h-2 bg-green-300 rounded-full"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: -30 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute bottom-10 -right-8 w-3 h-1.5 bg-green-500 rounded-full"
                />
                {/* <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="absolute bottom-2 -right-6"
                >
                  <Sparkles className="text-yellow-400 w-6 h-6 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" strokeWidth={2} />
                </motion.div> */}

                <h1
                  className="text-3xl md:text-6xl font-black tracking-tighter leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  Welcome back, <br />
                  <span className="text-green-500">{firstName}!</span>
                </h1>
              </div>
              <p className="text-sm font-medium opacity-60 max-w-lg leading-relaxed">
                You've made a significant impact this week. Your contributions
                are helping us reach our goal of a zero-hunger community.
              </p>
            </motion.div>

            {/* <div className="flex items-center gap-3 pt-2">
              <button className="px-6 py-2.5 rounded-sm bg-green-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg shadow-green-500/20 active:scale-95">
                New Donation
              </button>
              <button className="px-6 py-2.5 rounded-sm border border-[var(--border-color)] text-[var(--text-primary)] text-[10px] font-black uppercase tracking-widest hover:bg-[var(--bg-secondary)] transition-all active:scale-95">
                View History
              </button>
            </div> */}
          </div>

          {/* Premium Tier Cards - High Fidelity Refinement */}
          <div className="flex flex-col sm:flex-row gap-4 lg:shrink-0 items-stretch">
            {/* Card 1: Current Rank */}
            <motion.div
              whileHover={{ y: -2 }}
              className="relative group/tier flex flex-col gap-4 p-5 rounded-2xl border-[0.5px] min-w-[240px] transition-all duration-500"
              style={{
                backgroundColor: "#ffffff",
                borderColor: "var(--border-color, #f1f5f9)",
                boxShadow: "0 4px 20px -10px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-green-500">
                  Current Rank
                </span>
                <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center transition-colors group-hover/tier:bg-green-100">
                  <ArrowUpRight
                    className="text-green-500/40 group-hover/tier:text-green-500 transition-colors"
                    size={14}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden bg-green-50 transition-transform duration-500 group-hover/tier:scale-105">
                  <Trophy
                    className="w-6 h-6 text-green-500 relative z-10"
                    strokeWidth={2}
                  />
                </div>
                <div className="space-y-1 text-start">
                  <h3 className="text-xl font-black tracking-tight text-slate-900">
                    {currentTier.name}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 p-0.5 px-2.5 rounded-full bg-green-50 text-green-500 border border-green-100">
                    <TrendingUp size={10} strokeWidth={2.5} />
                    <span className="text-[9px] font-black uppercase tracking-wider">
                      {currentTier.bonus} Bonus
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Next Tier Progress */}
            {nextTier && (
              <motion.div
                whileHover={{ y: -2 }}
                className="relative group/progress flex flex-col justify-between p-5 rounded-2xl border-[0.5px] min-w-[300px] transition-all duration-500"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "var(--border-color, #f1f5f9)",
                  boxShadow: "0 4px 20px -10px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1.5 text-start">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-green-500">
                        Next Milestone
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <h4 className="text-lg font-black uppercase tracking-wider text-slate-900">
                          {nextTier.name}
                        </h4>
                      </div>
                    </div>
                    <div className="text-end space-y-0.5">
                      <p className="text-base font-black text-green-500 tabular-nums leading-none">
                        {pointsRemaining.toLocaleString()} PTS
                      </p>
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">
                        TO ACHIEVE
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="relative h-2 w-full rounded-full bg-slate-50 overflow-hidden">
                      {/* Flowing Water Progress Bar */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressToNext}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="absolute h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #22c55e, #4ade80, #22c55e)",
                          backgroundSize: "200% 100%",
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 w-full h-full"
                          animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                            backgroundSize: "200% 100%",
                          }}
                        />
                      </motion.div>
                    </div>
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[9px] font-black text-slate-200 tabular-nums">
                        {currentTier.pointsRequired}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-black text-green-500">
                          {Math.round(progressToNext)}%
                        </span>
                        <span className="text-[7px] font-black text-slate-300 uppercase">
                          Complete
                        </span>
                      </div>
                      <span className="text-[9px] font-black text-slate-200 tabular-nums">
                        {nextTier.pointsRequired}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid & Banner - Fluid Layout */}
      {/* Stats Grid & Banner - Side-by-Side Full Width */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-stretch w-full px-0">
        <div className="shrink-0">
          <ImpactCards
            className="gap-4 md:gap-6"
            data={[
              {
                label: "Total Donations",
                val:
                  stats.find((s: DonorStat) => s.title === "Total Donations")
                    ?.value || "342",
                trend:
                  stats.find((s: DonorStat) => s.title === "Total Donations")
                    ?.change || "+ 12 this week",
                color: "bg-green-500",
                image: "/stats_icon/donation.png",
              },
              {
                label: "Urgent NGO Needs",
                val: urgentNeedsCount.toString(),
                trend:
                  urgentNeedsCount > 0 ? "Requires Attention" : "All Clear",
                color: "bg-red-500",
                image: "/stats_icon/urgent.png",
              },
            ]}
          />
        </div>

        {/* Dashboard Banner - Occupies Remaining Space with Matched Height */}
        <div className="flex-1 flex flex-col min-h-[140px] bg-[#F8F8F3] rounded-2xl">
          <div className="relative flex-1 w-full rounded-2xl overflow-hidden shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)] group border-[0.5px] border-slate-200/50 bg-[#F8F8F3]">
            {/* Background Illustration - Perfectly Right-Aligned */}
            <div className="absolute inset-0 flex justify-end">
              <img
                src="/dashboard_banner1.png"
                alt="Dashboard Banner"
                className="h-full w-auto object-contain object-right select-none pointer-events-none"
              />
            </div>

            {/* Content Overlay - Floating Over Background */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12">
              <h2 className="text-xl md:text-2xl font-black tracking-tight leading-[1.1] text-slate-800">
                Together, we can <br />
                reduce food waste and <br />
                <span className="text-green-500">end hunger.</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pb-4 items-stretch">
        {/* Left Column: NGO Needs Feed */}
        <div className="lg:col-span-8 flex flex-col h-full">
          <NGONeedsFeed />
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
              <button className="text-[8px] font-black text-green-500 hover:text-green-700 uppercase tracking-widest transition-colors focus:outline-none">
                DETAILS
              </button>
            </div>

            <div className="space-y-4 flex-1">
              {recentActivities.map((activity: RecentActivity, idx: number) => {
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
                            ? "bg-green-500/10 text-green-500 border border-green-500/10"
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
                          className="text-sm font-black tracking-tight truncate group-hover:text-green-500 transition-colors mb-0.5 leading-none"
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
                            ? "text-green-500 bg-green-500/10 border-green-500/20"
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

      {/* Full Width Row: Impact Milestones */}
      <div className="">
        <div
          className="rounded-md p-5 md:p-8 space-y-8 flex flex-col h-full overflow-hidden border"
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
            <button className="text-[8px] font-black text-green-500 hover:text-green-700 uppercase tracking-widest transition-colors focus:outline-none">
              VIEW ALL
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 overflow-y-auto pr-2 h-auto max-h-[400px] thin-scrollbar scroll-smooth">
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
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
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

      {/* Weekly Impact Banner Section */}
      <div className="pb-10">
        <WeeklyImpactBanner />
      </div>
    </div>
  );
};

export default DonorDashboard;
