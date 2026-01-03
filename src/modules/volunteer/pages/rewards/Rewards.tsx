import {
  Award,
  Gift,
  Star,
  Trophy,
  Zap,
  Target,
  Medal,
  CheckCircle,
  Lock,
  TrendingUp,
} from "lucide-react";

const VolunteerRewards = () => {
  const userStats = {
    totalPoints: 3200,
    currentLevel: 4,
    levelName: "Elite Courier",
    nextLevel: 5,
    nextLevelName: "Master Volunteer",
    deliveriesToNextLevel: 8,
    totalDeliveries: 32,
  };

  const badges = [
    {
      id: 1,
      name: "First Steps",
      description: "Completed your first delivery",
      icon: <Target className="w-8 h-8" />,
      unlocked: true,
      unlockedDate: "Nov 10, 2024",
      color: "from-green-50 to-[#ecfdf5]",
      borderColor: "border-[#d1fae5]",
      iconColor: "bg-[#22c55e]",
    },
    {
      id: 2,
      name: "Speed Demon",
      description: "Complete 10 deliveries on time",
      icon: <Zap className="w-8 h-8" />,
      unlocked: true,
      unlockedDate: "Dec 5, 2024",
      color: "from-amber-50 to-amber-100/30",
      borderColor: "border-amber-200",
      iconColor: "bg-amber-500",
    },
    {
      id: 3,
      name: "Reliability Star",
      description: "Maintain 95% on-time rate",
      icon: <Star className="w-8 h-8" />,
      unlocked: true,
      unlockedDate: "Dec 18, 2024",
      color: "from-blue-50 to-blue-100/30",
      borderColor: "border-blue-200",
      iconColor: "bg-blue-500",
    },
    {
      id: 4,
      name: "Century Club",
      description: "Complete 100 deliveries",
      icon: <Trophy className="w-8 h-8" />,
      unlocked: false,
      progress: 32,
      total: 100,
      color: "from-purple-50 to-purple-100/30",
      borderColor: "border-purple-200",
      iconColor: "bg-purple-500",
    },
    {
      id: 5,
      name: "Eco Warrior",
      description: "Save 100kg of CO2 with e-vehicle",
      icon: <Medal className="w-8 h-8" />,
      unlocked: false,
      progress: 45,
      total: 100,
      color: "from-emerald-50 to-emerald-100/30",
      borderColor: "border-emerald-200",
      iconColor: "bg-emerald-500",
    },
  ];

  const rewards = [
    {
      id: 1,
      name: "Volunteer T-Shirt",
      points: 1000,
      description: "Official volunteer branded t-shirt",
      available: true,
      icon: "👕",
    },
    {
      id: 2,
      name: "Premium Delivery Bag",
      points: 2000,
      description: "Insulated delivery bag upgrade",
      available: true,
      icon: "🎒",
    },
    {
      id: 3,
      name: "Gift Card ($25)",
      points: 3000,
      description: "Amazon or local store gift card",
      available: true,
      icon: "🎁",
    },
    {
      id: 4,
      name: "VIP Recognition",
      points: 5000,
      description: "Featured on our website & social media",
      available: false,
      icon: "⭐",
    },
  ];

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="text-start">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
            My Rewards
          </h1>
          <p className="text-slate-500 font-bold text-sm tracking-wide mt-1">
            Track your progress and claim your achievements
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-sm border border-slate-100">
          <div className="w-12 h-12 bg-[#ecfdf5] border border-[#d1fae5] rounded-full flex items-center justify-center shrink-0">
            <Star className="text-[#22c55e]" size={22} fill="currentColor" />
          </div>
          <div className="text-start">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
              Available Balance
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-slate-900 tabular-nums">
                {userStats.totalPoints.toLocaleString()}
              </span>
              <span className="text-[10px] font-black text-[#22c55e] uppercase">
                Points
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Level Card */}
      <div className="relative bg-white rounded-sm border border-slate-100 p-8 text-slate-900">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10">
          {/* Trophy & Title Section */}
          <div className="flex items-center gap-8 lg:border-r lg:border-slate-100 lg:pr-10">
            <div className="relative shrink-0">
              <div className="w-28 h-28 rounded-3xl bg-white border border-slate-100 flex items-center justify-center">
                <Trophy
                  className="text-[#22c55e]"
                  size={48}
                  strokeWidth={1.5}
                />
              </div>
              <div className="absolute -top-2 -right-4 px-3 py-1 bg-[#22c55e] rounded-full border-2 border-white">
                <p className="text-[10px] font-black text-white uppercase tracking-tight">
                  Level 4
                </p>
              </div>
            </div>

            <div className="text-start">
              <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">
                {userStats.levelName}
              </h2>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#22c55e]/30 rounded-full">
                <Star
                  className="text-[#22c55e]"
                  size={14}
                  fill="currentColor"
                />
                <span className="text-[11px] font-black text-[#22c55e] uppercase tracking-wider">
                  {userStats.nextLevelName} Path
                </span>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="flex-1 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="flex-1 text-start">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={18} className="text-[#22c55e]" />
                  <h3 className="text-xs font-black text-[#22c55e] uppercase tracking-widest">
                    Next Milestone
                  </h3>
                </div>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  Complete{" "}
                  <span className="font-black text-slate-900">
                    8 more deliveries
                  </span>{" "}
                  to reach{" "}
                  <span className="text-[#22c55e] font-bold">Level 5</span>
                </p>
              </div>

              <div className="flex items-end gap-1">
                <span className="text-6xl font-black text-slate-900 leading-none tracking-tighter tabular-nums">
                  85
                </span>
                <span className="text-2xl font-black text-[#22c55e] mb-1.5">
                  %
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                <div
                  className="h-full bg-gradient-to-r from-[#22c55e] to-[#4ade80] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: "85%" }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-black text-slate-300 uppercase tracking-widest mt-3 px-1">
                <span>Rookie</span>
                <span className="text-[#22c55e]">Elite</span>
                <span>Legendary</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges & Achievements */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 bg-blue-50 border border-blue-100 rounded-sm">
            <Award className="text-blue-600" size={20} />
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">
            Badges & Achievements
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`relative p-6 rounded-sm border transition-all duration-300 group flex flex-col items-center ${
                badge.unlocked
                  ? `bg-white border-slate-200 hover:border-slate-300`
                  : "bg-slate-50 border-slate-100 opacity-80"
              }`}
            >
              <div className="relative mb-4">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden ${
                    badge.unlocked
                      ? `${badge.iconColor} text-white shadow-lg`
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  {badge.icon}
                  {badge.unlocked && (
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  )}
                </div>
                {badge.unlocked && (
                  <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-md border border-slate-50">
                    <CheckCircle className="text-[#22c55e] w-4 h-4" />
                  </div>
                )}
              </div>

              <h4
                className={`font-black text-center text-sm uppercase tracking-tight ${
                  badge.unlocked
                    ? "text-slate-900 transition-colors group-hover:text-[#22c55e]"
                    : "text-slate-400"
                }`}
              >
                {badge.name}
              </h4>
              <p className="text-[10px] text-slate-500 text-center font-bold mt-1 line-clamp-2">
                {badge.description}
              </p>

              {badge.unlocked ? (
                <div className="mt-4 pt-4 border-t border-slate-50 w-full">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">
                    Unlocked On
                  </p>
                  <p className="text-[10px] font-black text-slate-900 text-center mt-0.5 uppercase">
                    {badge.unlockedDate}
                  </p>
                </div>
              ) : (
                <div className="mt-4 w-full">
                  <div className="flex justify-between items-center mb-1.5 px-0.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase">
                      Progress
                    </p>
                    <p className="text-[9px] font-black text-slate-900 uppercase">
                      {badge.progress}/{badge.total}
                    </p>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-slate-400 h-full transition-all duration-500"
                      style={{
                        width: `${(badge.progress! / badge.total!) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Redeem Rewards */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 bg-blue-50 border border-blue-100 rounded-sm">
            <Gift className="text-blue-600" size={20} />
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">
            Redeem Rewards
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`relative bg-white rounded-sm border p-6 flex flex-col items-center text-center transition-all duration-300 ${
                reward.available
                  ? "border-slate-200 hover:border-slate-300"
                  : "border-slate-100 bg-slate-50 opacity-60"
              }`}
            >
              {/* Lock Icon for Unavailable */}
              {!reward.available && (
                <div className="absolute top-4 right-4 text-slate-300">
                  <Lock size={16} />
                </div>
              )}

              {/* Large Icon */}
              <div
                className={`w-28 h-28 rounded-2xl flex items-center justify-center text-6xl mb-4 transition-all ${
                  reward.available
                    ? "bg-amber-50 border border-amber-100"
                    : "bg-slate-100 grayscale"
                }`}
              >
                {reward.icon}
              </div>

              {/* Title */}
              <h4
                className={`text-lg font-black tracking-tight uppercase mb-1 ${
                  reward.available ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {reward.name}
              </h4>

              {/* Description */}
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                {reward.description}
              </p>

              {/* Points Badge */}
              <div className="flex items-center gap-1.5 mb-6">
                <Star
                  className={
                    reward.available ? "text-[#22c55e]" : "text-slate-300"
                  }
                  size={14}
                  fill="currentColor"
                />
                <span
                  className={`text-xl font-black ${
                    reward.available ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {reward.points.toLocaleString()}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase">
                  Points
                </span>
              </div>

              {/* Redeem Button */}
              {reward.available ? (
                <button className="w-full py-3 bg-[#22c55e] text-white rounded-sm text-[11px] font-black uppercase tracking-[0.15em] hover:bg-[#16a34a] transition-all active:scale-95">
                  Redeem Item
                </button>
              ) : (
                <div className="w-full py-3 bg-slate-100 text-slate-400 rounded-sm text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5">
                  <Lock size={10} />
                  Insufficient Points
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default VolunteerRewards;
