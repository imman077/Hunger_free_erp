import { Award, Gift, Star, Trophy, Zap, Target, Medal } from "lucide-react";

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
      icon: <Target size={32} />,
      unlocked: true,
      unlockedDate: "Nov 10, 2024",
      color: "emerald",
    },
    {
      id: 2,
      name: "Speed Demon",
      description: "Complete 10 deliveries on time",
      icon: <Zap size={32} />,
      unlocked: true,
      unlockedDate: "Dec 5, 2024",
      color: "yellow",
    },
    {
      id: 3,
      name: "Reliability Star",
      description: "Maintain 95% on-time rate",
      icon: <Star size={32} />,
      unlocked: true,
      unlockedDate: "Dec 18, 2024",
      color: "blue",
    },
    {
      id: 4,
      name: "Century Club",
      description: "Complete 100 deliveries",
      icon: <Trophy size={32} />,
      unlocked: false,
      progress: 32,
      total: 100,
      color: "purple",
    },
    {
      id: 5,
      name: "Eco Warrior",
      description: "Save 100kg of CO2 with e-vehicle",
      icon: <Medal size={32} />,
      unlocked: false,
      progress: 45,
      total: 100,
      color: "green",
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

  const levelPerks = [
    { level: 1, perk: "Basic volunteer access" },
    { level: 2, perk: "Priority task selection" },
    { level: 3, perk: "Flexible scheduling" },
    { level: 4, perk: "Exclusive rewards access" },
    { level: 5, perk: "Mentor new volunteers" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-black text-start">
          My Rewards
        </h1>
        <p className="text-gray-600 mt-2 text-start">
          Track your progress and claim your achievements
        </p>
      </div>

      {/* Level Progress */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
                <Trophy className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold">
                  Level {userStats.currentLevel}
                </h2>
                <p className="text-blue-100 text-sm">{userStats.levelName}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end mb-1">
              <Star className="text-yellow-300" size={20} />
              <span className="text-2xl font-bold">
                {userStats.totalPoints.toLocaleString()}
              </span>
            </div>
            <p className="text-blue-100 text-xs">Total Points</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-blue-100">
              Progress to Level {userStats.nextLevel}
            </span>
            <span className="font-bold">
              {userStats.deliveriesToNextLevel} deliveries needed
            </span>
          </div>
          <div className="w-full bg-blue-400/30 h-3 rounded-full overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{
                width: `${((userStats.totalDeliveries % 40) / 40) * 100}%`,
              }}
            />
          </div>
          <p className="text-xs text-blue-100 text-right">
            {userStats.totalDeliveries} total deliveries
          </p>
        </div>
      </div>

      {/* Level Perks */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Level Perks</h3>
        <div className="space-y-2">
          {levelPerks.map((item) => (
            <div
              key={item.level}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                item.level <= userStats.currentLevel
                  ? "bg-emerald-50 border border-emerald-200"
                  : "bg-gray-50 border border-gray-200 opacity-60"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  item.level <= userStats.currentLevel
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                {item.level}
              </div>
              <span
                className={`text-sm font-medium ${
                  item.level <= userStats.currentLevel
                    ? "text-gray-900"
                    : "text-gray-500"
                }`}
              >
                {item.perk}
              </span>
              {item.level <= userStats.currentLevel && (
                <span className="ml-auto text-emerald-500 text-xs font-bold uppercase">
                  Unlocked
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Badges & Achievements */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Award className="text-blue-500" size={24} />
          <h3 className="text-lg font-bold text-gray-900">
            Badges & Achievements
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                      className="bg-blue-500 h-full rounded-full"
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
          <Gift className="text-blue-500" size={24} />
          <h3 className="text-lg font-bold text-gray-900">Redeem Rewards</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`p-4 rounded-xl border transition-all ${
                reward.available
                  ? "border-gray-200 bg-white hover:border-blue-200 hover:shadow-sm"
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
                      <button className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition-colors">
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

export default VolunteerRewards;
