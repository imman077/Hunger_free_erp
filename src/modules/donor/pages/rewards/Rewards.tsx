import {
  Award,
  Gift,
  Star,
  Heart,
  Package,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Icon } from "../../../../global/components/resuable-components/Icon";

const DonorRewards = () => {
  const userStats = {
    totalPoints: 1250,
    currentTier: "Level 3 Donor",
    nextTier: "Level 4 Donor",
    pointsToNextTier: 250,
    totalDonations: 24,
  };

  const badges = [
    {
      id: 1,
      name: "Kind Soul",
      description: "Made your first donation",
      icon: <Heart size={32} />,
      unlocked: true,
      unlockedDate: "Dec 15, 2024",
      color: "emerald",
    },
    {
      id: 2,
      name: "Generous Giver",
      description: "Donated 10 times",
      icon: <Gift size={32} />,
      unlocked: true,
      unlockedDate: "Dec 20, 2024",
      color: "blue",
    },
    {
      id: 3,
      name: "Food Hero",
      description: "Donate 30 times",
      icon: <Package size={32} />,
      unlocked: false,
      progress: 24,
      total: 30,
      color: "purple",
    },
    {
      id: 4,
      name: "Community Champion",
      description: "Reach 2000 impact points",
      icon: <Trophy size={32} />,
      unlocked: false,
      progress: 1250,
      total: 2000,
      color: "orange",
    },
  ];

  const rewards = [
    {
      id: 1,
      name: "Thank You Certificate",
      points: 500,
      description: "Digital certificate of appreciation",
      available: true,
      icon: "ribbon",
    },
    {
      id: 2,
      name: "Exclusive Donor Badge",
      points: 1000,
      description: "Special badge for your profile",
      available: true,
      icon: "verified",
    },
    {
      id: 3,
      name: "VIP Event Access",
      points: 1500,
      description: "Invitation to exclusive donor events",
      available: false,
      icon: "calendar",
    },
    {
      id: 4,
      name: "Personalized Impact Report",
      points: 2000,
      description: "Detailed report of your contributions",
      available: false,
      icon: "trending",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-black text-start">
          My Rewards
        </h1>
        <p className="text-gray-600 mt-2 text-start">
          Track your achievements and redeem rewards
        </p>
      </div>

      {/* Points & Tier Progress */}
      <div className="bg-emerald-900 rounded-none p-10 text-white relative overflow-hidden group">
        <div className="flex justify-between items-start mb-10 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-white/10 rounded-none border border-white/20">
                <Star className="text-[#34d399] w-6 h-6" />
              </div>
              <h2 className="text-4xl font-black tracking-tighter">
                {userStats.totalPoints.toLocaleString()} Points
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#34d399] text-sm font-black uppercase tracking-[0.2em]">
                {userStats.currentTier}
              </span>
              <div className="h-0.5 w-12 bg-white/20" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-[#34d399]/60 text-[10px] font-black uppercase tracking-[0.3em] mb-1">
              Next Tier
            </p>
            <span className="px-3 py-1 bg-white/10 rounded-none border border-white/20 text-sm font-black uppercase tracking-wider text-white">
              {userStats.nextTier}
            </span>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="flex justify-between items-end px-1">
            <p className="text-[11px] font-black text-[#6ee7b7] uppercase tracking-[0.2em]">
              Progress to {userStats.nextTier}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black leading-none text-[#34d399]">
                {Math.round(
                  (userStats.totalPoints /
                    (userStats.totalPoints + userStats.pointsToNextTier)) *
                    100
                )}
              </span>
              <span className="text-xs font-black text-[#16a34a]">%</span>
            </div>
          </div>
          <div className="w-full bg-white/5 h-3 rounded-none overflow-hidden p-0.5 border border-white/10">
            <div
              className="bg-[#34d399] h-full rounded-none transition-all duration-1000"
              style={{
                width: `${
                  (userStats.totalPoints /
                    (userStats.totalPoints + userStats.pointsToNextTier)) *
                  100
                }%`,
              }}
            />
          </div>
          <p className="text-[10px] font-bold text-center text-[#22c55e]/80 uppercase tracking-widest">
            {userStats.pointsToNextTier} more points to level up
          </p>
        </div>
      </div>

      {/* Badges & Achievements Section */}
      <div className="bg-white rounded-none border border-gray-100 p-10 relative group/achSection">
        <div className="flex items-center gap-3 mb-10 relative z-10">
          <Award className="text-[#22c55e] w-5 h-5" />
          <h3 className="text-sm font-black text-gray-900 tracking-tighter uppercase leading-none">
            Impact Milestones
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`group/badge relative p-6 rounded-none border transition-all duration-300 cursor-default flex flex-col items-center
              ${
                badge.unlocked
                  ? `bg-white border-${badge.color}-100 hover:border-${badge.color}-200`
                  : "bg-gray-50 border-gray-100 grayscale opacity-60"
              }
            `}
            >
              <div
                className={`w-16 h-16 rounded-none flex items-center justify-center mb-5 transition-all duration-300 group-hover/badge:scale-105
                ${
                  badge.unlocked
                    ? badge.color === "emerald"
                      ? "bg-[#22c55e] text-white"
                      : badge.color === "blue"
                      ? "bg-blue-500 text-white"
                      : badge.color === "purple"
                      ? "bg-purple-500 text-white"
                      : "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }
              `}
              >
                {badge.icon}
              </div>
              <h4 className="text-sm font-black text-gray-900 text-center tracking-tight mb-1">
                {badge.name}
              </h4>
              <p className="text-[10px] text-gray-500 font-bold text-center mb-4 leading-tight">
                {badge.description}
              </p>

              {badge.unlocked ? (
                <div
                  className={`mt-auto px-3 py-1 bg-${badge.color}-100/50 text-${badge.color}-700 border border-${badge.color}-200 rounded-none text-[9px] font-black uppercase tracking-widest`}
                >
                  Unlocked {badge.unlockedDate}
                </div>
              ) : (
                <div className="mt-auto w-full space-y-2">
                  <div className="w-full bg-gray-200 h-1.5 rounded-none overflow-hidden">
                    <div
                      className="bg-[#22c55e] h-full rounded-none transition-all duration-1000"
                      style={{
                        width: `${(badge.progress! / badge.total!) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-[9px] font-black text-center text-gray-400 uppercase tracking-widest">
                    {badge.progress} / {badge.total}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Redeem Rewards Section - Redesigned */}
      <div className="bg-white rounded-none border border-gray-100 p-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-[#ecfdf5] text-[#16a34a] rounded-none border border-[#d1fae5]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-gray-900 tracking-tighter uppercase leading-none">
            Redeem Rewards
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`group relative p-5 rounded-none border transition-all duration-300 ${
                reward.available
                  ? "border-gray-100 bg-white hover:border-emerald-200"
                  : "border-gray-100 bg-gray-50/50"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-none flex items-center justify-center mb-4 transition-all duration-300 ${
                    reward.available
                      ? "bg-[#ecfdf5] text-[#16a34a] border border-[#d1fae5] group-hover:bg-[#d1fae5]"
                      : "bg-gray-100 text-gray-400 border border-gray-200"
                  }`}
                >
                  <Icon name={reward.icon} className="w-5 h-5" />
                </div>

                {/* Title */}
                <h4 className="text-sm font-black text-gray-900 tracking-tight mb-1">
                  {reward.name}
                </h4>

                {/* Description */}
                <p className="text-[10px] text-gray-500 font-bold mb-4 leading-relaxed">
                  {reward.description}
                </p>

                {/* Points & Button */}
                <div className="w-full space-y-3 mt-auto">
                  <div className="flex items-center justify-center gap-1.5">
                    <Star className="text-amber-500 w-3.5 h-3.5" />
                    <span className="text-xs font-black text-gray-900">
                      {reward.points} Points
                    </span>
                  </div>

                  {reward.available ? (
                    <button className="w-full px-4 py-2 bg-[#22c55e] text-white text-[10px] font-black uppercase tracking-widest rounded-none hover:bg-[#16a34a] transition-colors">
                      Redeem
                    </button>
                  ) : (
                    <div className="w-full px-4 py-2 bg-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-none text-center">
                      Locked
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonorRewards;
