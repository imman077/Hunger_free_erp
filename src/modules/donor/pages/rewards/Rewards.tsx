import {
  Award,
  Gift,
  Star,
  Heart,
  Package,
  Sparkles,
  Trophy,
} from "lucide-react";

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
      icon: "📜",
    },
    {
      id: 2,
      name: "Exclusive Donor Badge",
      points: 1000,
      description: "Special badge for your profile",
      available: true,
      icon: "🏅",
    },
    {
      id: 3,
      name: "VIP Event Access",
      points: 1500,
      description: "Invitation to exclusive donor events",
      available: false,
      icon: "🎫",
    },
    {
      id: 4,
      name: "Personalized Impact Report",
      points: 2000,
      description: "Detailed report of your contributions",
      available: false,
      icon: "📊",
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
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-yellow-300" size={24} />
              <h2 className="text-2xl font-bold">
                {userStats.totalPoints.toLocaleString()} Points
              </h2>
            </div>
            <p className="text-emerald-100 text-sm">{userStats.currentTier}</p>
          </div>
          <div className="text-right">
            <p className="text-emerald-100 text-xs uppercase tracking-wider">
              Next Tier
            </p>
            <p className="font-bold">{userStats.nextTier}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-emerald-100">
              Progress to {userStats.nextTier}
            </span>
            <span className="font-bold">
              {userStats.pointsToNextTier} points needed
            </span>
          </div>
          <div className="w-full bg-emerald-400/30 h-3 rounded-full overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{
                width: `${
                  (userStats.totalPoints /
                    (userStats.totalPoints + userStats.pointsToNextTier)) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Badges & Achievements */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Award className="text-emerald-500" size={24} />
          <h3 className="text-lg font-bold text-gray-900">
            Badges & Achievements
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                badge.unlocked
                  ? `border-${badge.color}-200 bg-${badge.color}-50`
                  : "border-gray-200 bg-gray-50 grayscale opacity-60"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 mx-auto ${
                  badge.unlocked
                    ? `bg-${badge.color}-500 text-white`
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                {badge.icon}
              </div>
              <h4 className="font-bold text-gray-900 text-center text-sm">
                {badge.name}
              </h4>
              <p className="text-xs text-gray-500 text-center mt-1">
                {badge.description}
              </p>

              {badge.unlocked ? (
                <p className="text-[10px] text-center mt-2 text-gray-400">
                  Unlocked: {badge.unlockedDate}
                </p>
              ) : (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{
                        width: `${(badge.progress! / badge.total!) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-[10px] text-center mt-1 text-gray-500">
                    {badge.progress}/{badge.total}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Redeem Rewards */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="text-emerald-500" size={24} />
          <h3 className="text-lg font-bold text-gray-900">Redeem Rewards</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`p-4 rounded-xl border transition-all ${
                reward.available
                  ? "border-gray-200 bg-white hover:border-emerald-200 hover:shadow-sm"
                  : "border-gray-100 bg-gray-50 opacity-60"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{reward.icon}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{reward.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {reward.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500" size={14} />
                      <span className="text-sm font-bold text-gray-900">
                        {reward.points} points
                      </span>
                    </div>
                    {reward.available ? (
                      <button className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600 transition-colors">
                        Redeem
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 font-bold">
                        Locked
                      </span>
                    )}
                  </div>
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
