import {
  Award,
  Star,
  Trophy,
  Heart,
  Package,
  Sparkles,
  CheckCircle,
  Lock,
  TrendingUp,
  Leaf,
  ChevronRight,
  IndianRupee,
  Plane,
  Gamepad2,
  Smartphone,
  Zap,
} from "lucide-react";

const DonorRewards = () => {
  const userStats = {
    totalPoints: 24500,
    currentTier: "Diamond",
    nextTier: "Legend",
    pointsToNextTier: 5500,
    totalDonations: 342,
    treesPlanted: 45,
  };

  const tiers = [
    { name: "Beginner", points: "0-500", color: "text-gray-400" },
    { name: "Bronze", points: "501-1,500", color: "text-amber-700" },
    { name: "Silver", points: "1,501-3,500", color: "text-slate-400" },
    { name: "Gold", points: "3,501-7,500", color: "text-yellow-600" },
    { name: "Platinum", points: "7,501-15,000", color: "text-teal-600" },
    { name: "Diamond", points: "15,001-30,000", color: "text-emerald-700" },
    { name: "Legend", points: "30,001+", color: "text-[#15803d]" },
  ];

  const badges = [
    {
      id: 1,
      name: "First Step",
      description: "Made your first donation",
      icon: <Heart size={24} />,
      unlocked: true,
      date: "Oct 12, 2024",
      color: "bg-emerald-500",
    },
    {
      id: 2,
      name: "Kind Soul",
      description: "5 donations milestone",
      icon: <Heart size={24} fill="currentColor" />,
      unlocked: true,
      date: "Oct 25, 2024",
      color: "bg-red-500",
    },
    {
      id: 3,
      name: "Food Hero",
      description: "25kg+ food donated",
      icon: <Package size={24} />,
      unlocked: true,
      date: "Nov 5, 2024",
      color: "bg-emerald-600",
    },
    {
      id: 4,
      name: "Weekly Warrior",
      description: "4 consecutive weeks",
      icon: <Zap size={24} />,
      unlocked: true,
      date: "Dec 1, 2024",
      color: "bg-amber-500",
    },
    {
      id: 5,
      name: "Community King",
      description: "100+ donations record",
      icon: <Trophy size={24} />,
      unlocked: true,
      date: "Jan 3, 2025",
      color: "bg-purple-500",
    },
  ];

  const rewards = {
    cash: [
      {
        id: 1,
        name: "Quick Cash",
        amount: "₹1,000",
        points: 600,
        available: true,
      },
      {
        id: 2,
        name: "Cash Bonus",
        amount: "₹2,500",
        points: 1200,
        available: true,
      },
      {
        id: 3,
        name: "Big Win",
        amount: "₹5,000",
        points: 2500,
        available: true,
      },
      {
        id: 4,
        name: "Mega Prize",
        amount: "₹10,000",
        points: 5000,
        available: true,
      },
    ],
    tours: [
      {
        id: 5,
        name: "Goa Beach Trip",
        desc: "3D/2N, Flights + Hotel",
        points: 8000,
        available: true,
        icon: <Plane size={20} />,
      },
      {
        id: 6,
        name: "Rajasthan Heritage",
        desc: "4D/3N Luxury Stay",
        points: 18000,
        available: true,
        icon: <Plane size={20} />,
      },
      {
        id: 7,
        name: "International - Thailand",
        desc: "6D/5N Full Package",
        points: 35000,
        available: false,
        icon: <Plane size={20} />,
      },
    ],
    youth: [
      {
        id: 8,
        name: "Gaming Console",
        desc: "PS5 or Xbox Series X",
        points: 18000,
        available: true,
        icon: <Gamepad2 size={20} />,
      },
      {
        id: 9,
        name: "iPhone 15 Pro Max",
        desc: "Latest Apple Flagship",
        points: 35000,
        available: false,
        icon: <Smartphone size={20} />,
      },
      {
        id: 10,
        name: "MacBook Pro",
        desc: "M3 Chip Edition",
        points: 45000,
        available: false,
        icon: <Smartphone size={20} />,
      },
    ],
  };

  const treeTiers = [
    { name: "Sapling Starter", trees: 1, points: 100, impact: "20kg CO₂/year" },
    { name: "Green Warrior", trees: 5, points: 500, impact: "100kg CO₂/year" },
    {
      name: "Forest Builder",
      trees: 10,
      points: 1000,
      impact: "200kg CO₂/year",
    },
  ];

  const getCurrentTierIndex = () =>
    tiers.findIndex((t) => t.name === userStats.currentTier);

  return (
    <div
      className="p-8 min-h-screen space-y-10"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="text-start">
          <h1
            className="text-5xl font-black tracking-tighter mb-3 uppercase"
            style={{ color: "var(--text-primary)" }}
          >
            Donor Rewards
          </h1>
          <p
            className="font-medium text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Your generosity deserves the best. Win cash, travel, and change
            lives 🌟
          </p>
        </div>
        <div
          className="border p-6 flex items-center gap-6 rounded-sm"
          style={{
            backgroundColor: "var(--bg-primary)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 flex items-center justify-center rounded-sm">
            <Star className="text-[#22c55e]" size={32} fill="currentColor" />
          </div>
          <div className="text-start">
            <p
              className="text-[10px] font-black uppercase tracking-[0.2em] mb-1"
              style={{ color: "var(--text-muted)" }}
            >
              Impact Points
            </p>
            <div className="flex items-baseline gap-2">
              <span
                className="text-4xl font-black"
                style={{ color: "var(--text-primary)" }}
              >
                {userStats.totalPoints.toLocaleString()}
              </span>
              <span className="text-xs font-black text-[#22c55e] uppercase tracking-widest">
                PTS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Tier Progression */}
      <section
        className="border p-8 rounded-sm"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="flex items-center gap-3 mb-10">
          <TrendingUp className="text-[#22c55e]" size={24} />
          <h2
            className="text-xl font-black uppercase tracking-tighter"
            style={{ color: "var(--text-primary)" }}
          >
            Loyalty Tiers
          </h2>
        </div>

        <div className="relative">
          <div
            className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 z-0 hidden lg:block"
            style={{ backgroundColor: "var(--border-color)" }}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 relative z-10">
            {tiers.map((tier, idx) => {
              const isCurrent = tier.name === userStats.currentTier;
              const isPast = idx < getCurrentTierIndex();

              return (
                <div key={tier.name} className="flex flex-col items-center">
                  <div
                    className={`w-14 h-14 flex items-center justify-center border-2 mb-4 transition-all duration-500 ${
                      isCurrent
                        ? "bg-[#22c55e] border-white scale-125 ring-4 ring-emerald-50"
                        : isPast
                        ? "border-[#22c55e]"
                        : "border-gray-100"
                    } rounded-sm`}
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      borderColor: isCurrent
                        ? "white"
                        : isPast
                        ? "#22c55e"
                        : "var(--border-color)",
                    }}
                  >
                    {isPast ? (
                      <CheckCircle className="text-[#22c55e]" size={24} />
                    ) : isCurrent ? (
                      <Star
                        className="text-white"
                        size={24}
                        fill="currentColor"
                      />
                    ) : (
                      <Lock size={20} style={{ color: "var(--text-muted)" }} />
                    )}
                  </div>
                  <p
                    className={`text-[10px] font-black uppercase tracking-widest mb-1 ${
                      isCurrent ? "text-[#22c55e]" : ""
                    }`}
                    style={{
                      color: isCurrent ? "#22c55e" : "var(--text-muted)",
                    }}
                  >
                    {tier.name}
                  </p>
                  <p
                    className="text-[9px] font-bold"
                    style={{ color: "var(--text-muted)", opacity: 0.6 }}
                  >
                    {tier.points}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 bg-emerald-50/50 rounded-sm border border-emerald-100 border-dashed">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="p-3 bg-white rounded-sm border border-emerald-100">
              <Sparkles className="text-[#22c55e]" size={20} />
            </div>
            <div className="text-start">
              <p
                className="text-sm font-black uppercase tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Current Status: {userStats.currentTier}
              </p>
              <p
                className="text-xs font-medium italic"
                style={{ color: "var(--text-secondary)" }}
              >
                Only {userStats.pointsToNextTier.toLocaleString()} points left
                to reach the ultimate{" "}
                <span className="text-[#15803d] font-bold">Legend</span> status!
              </p>
            </div>
          </div>
          <button className="px-8 py-3 bg-[#22c55e] text-white text-xs font-black uppercase tracking-widest rounded-sm hover:bg-emerald-600 transition-all flex items-center gap-2">
            View Benefits <ChevronRight size={16} />
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rewards Center */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-sm">
              <IndianRupee className="text-[#22c55e]" size={20} />
            </div>
            <h3
              className="text-xl font-black tracking-tight uppercase"
              style={{ color: "var(--text-primary)" }}
            >
              Mega Cash Rewards
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.cash.map((c) => (
              <div
                key={c.id}
                className="border p-6 flex items-center justify-between group hover:border-emerald-200 transition-all rounded-sm"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="text-start">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-3xl font-black"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {c.amount}
                    </span>
                    <span className="text-[10px] font-black text-[#22c55e] uppercase bg-emerald-50 px-2 py-0.5 rounded-sm">
                      Winner
                    </span>
                  </div>
                  <p
                    className="text-xs font-black uppercase tracking-widest"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {c.name}
                  </p>
                </div>
                <button className="flex flex-col items-center gap-1">
                  <span
                    className="text-[10px] font-black uppercase"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {c.points} PTS
                  </span>
                  <div className="px-5 py-2 bg-[#22c55e] text-white text-[10px] font-black uppercase tracking-widest rounded-sm group-hover:bg-emerald-600 transition-all">
                    Claim
                  </div>
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Plane className="text-teal-500" size={18} />
                <h4
                  className="text-xs font-black uppercase tracking-widest"
                  style={{ color: "var(--text-primary)" }}
                >
                  Global Travel
                </h4>
              </div>
              {rewards.tours.map((t) => (
                <div
                  key={t.id}
                  className={`p-4 border rounded-sm flex items-center gap-4 ${
                    !t.available && "opacity-60"
                  }`}
                  style={{
                    backgroundColor: t.available
                      ? "var(--bg-primary)"
                      : "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div
                    className={`p-2 rounded-sm ${
                      t.available
                        ? "bg-teal-50 text-teal-600"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {t.icon}
                  </div>
                  <div className="flex-1 text-start">
                    <p
                      className="text-xs font-black"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-[9px] font-bold uppercase"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {t.desc}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-[10px] font-black"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t.points.toLocaleString()}
                    </p>
                    <p
                      className="text-[8px] font-black uppercase"
                      style={{ color: "var(--text-muted)" }}
                    >
                      PTS
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="text-emerald-600" size={18} />
                <h4
                  className="text-xs font-black uppercase tracking-widest"
                  style={{ color: "var(--text-primary)" }}
                >
                  Luxury Tech
                </h4>
              </div>
              {rewards.youth.map((y) => (
                <div
                  key={y.id}
                  className={`p-4 border rounded-sm flex items-center gap-4 ${
                    !y.available && "opacity-60"
                  }`}
                  style={{
                    backgroundColor: y.available
                      ? "var(--bg-primary)"
                      : "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div
                    className={`p-2 rounded-sm ${
                      y.available
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {y.icon}
                  </div>
                  <div className="flex-1 text-start">
                    <p
                      className="text-xs font-black"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {y.name}
                    </p>
                    <p
                      className="text-[9px] font-bold uppercase"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {y.desc}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-[10px] font-black"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {y.points.toLocaleString()}
                    </p>
                    <p
                      className="text-[8px] font-black uppercase"
                      style={{ color: "var(--text-muted)" }}
                    >
                      PTS
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Tracker */}
        <div className="space-y-8">
          <section
            className="p-8 rounded-sm relative overflow-hidden"
            style={{ backgroundColor: "#064e3b", color: "white" }}
          >
            <div className="absolute -top-10 -right-10 opacity-10">
              <Leaf size={160} />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <Leaf className="text-emerald-400" size={24} />
                <h3 className="text-xl font-black uppercase tracking-tighter">
                  Your Legacy
                </h3>
              </div>

              <div className="flex items-center gap-6 py-4 border-y border-white/10">
                <div className="text-start">
                  <p className="text-[64px] font-black leading-none">
                    {userStats.treesPlanted}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                    Trees in your name
                  </p>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-emerald-400">
                    <span>Total CO₂ Offset</span>
                    <span>900kg/yr</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400"
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-center mb-4 text-emerald-100">
                  Grow Your Forest
                </p>
                {treeTiers.map((t) => (
                  <button
                    key={t.name}
                    className="w-full flex items-center justify-between p-3 border border-white/20 hover:bg-white/10 transition-all rounded-sm text-white"
                  >
                    <div className="text-start">
                      <p className="text-xs font-black">{t.name}</p>
                      <p className="text-[9px] font-medium text-emerald-400">
                        {t.trees} Tree • {t.impact}
                      </p>
                    </div>
                    <span className="text-[10px] font-black bg-[#22c55e] px-3 py-1 rounded-sm uppercase">
                      {t.points} PTS
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section
            className="border p-8 rounded-sm"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Award className="text-[#22c55e]" size={20} />
                <h3
                  className="text-sm font-black uppercase tracking-tighter"
                  style={{ color: "var(--text-primary)" }}
                >
                  Impact Badges
                </h3>
              </div>
              <button className="text-[10px] font-black uppercase text-[#22c55e] hover:underline">
                View All
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {badges.map((b) => (
                <div key={b.id} className="group relative">
                  <div
                    className={`w-12 h-12 ${b.color} flex items-center justify-center text-white rounded-sm shadow-sm transform group-hover:scale-110 transition-all`}
                  >
                    {b.icon}
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white p-2 rounded-sm text-[8px] font-black uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50">
                    {b.name}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                  </div>
                </div>
              ))}
              <div className="w-12 h-12 bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-gray-300 rounded-sm">
                +15
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="bg-gradient-to-r from-emerald-700 to-teal-800 p-10 rounded-sm text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-start max-w-lg">
          <h3 className="text-4xl font-black tracking-tighter uppercase mb-4">
            Monthly Mega Draw
          </h3>
          <p className="text-emerald-50 font-medium leading-relaxed">
            All donors who plant at least one tree this month are entered to win
            a{" "}
            <span className="font-bold underline decoration-emerald-300 underline-offset-4">
              ₹50,000 Luxury Gift Voucher
            </span>
            !
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-4xl font-black mb-2 tabular-nums">12:15:30</div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200 mb-6">
            Days:Hrs:Mins
          </p>
          <button className="px-10 py-4 bg-white text-emerald-700 text-xs font-black uppercase tracking-widest rounded-sm hover:bg-emerald-50 transition-all active:scale-95 shadow-lg shadow-emerald-900/20">
            Join Draw Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default DonorRewards;
