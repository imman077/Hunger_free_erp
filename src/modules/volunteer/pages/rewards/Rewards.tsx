import {
  Award,
  Star,
  Trophy,
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
  Calendar,
} from "lucide-react";
import ResuableButton from "../../../../global/components/resuable-components/button";

const VolunteerRewards = () => {
  const userStats = {
    totalPoints: 12500,
    currentTier: "Platinum",
    nextTier: "Diamond",
    pointsToNextTier: 2500,
    totalDeliveries: 156,
    treesPlanted: 12,
  };

  const tiers = [
    { name: "Beginner", points: "0-500", color: "text-gray-400" },
    { name: "Bronze", points: "501-1,500", color: "text-amber-700" },
    { name: "Silver", points: "1,501-3,500", color: "text-slate-400" },
    { name: "Gold", points: "3,501-7,500", color: "text-yellow-600" },
    { name: "Platinum", points: "7,501-15,000", color: "text-teal-600" },
    { name: "Diamond", points: "15,001-30,000", color: "text-[#22c55e]" },
    { name: "Legend", points: "30,001+", color: "text-[#22c55e]" },
  ];

  const badges = [
    {
      id: 1,
      name: "Rookie Rider",
      description: "First delivery completed",
      icon: <CheckCircle size={24} />,
      unlocked: true,
      date: "Nov 10, 2024",
      color: "bg-[#22c55e]",
    },
    {
      id: 2,
      name: "Speed Demon",
      description: "25 deliveries on time",
      icon: <Zap size={24} />,
      unlocked: true,
      date: "Dec 5, 2024",
      color: "bg-amber-500",
    },
    {
      id: 3,
      name: "Distance King",
      description: "100km+ covered",
      icon: <TrendingUp size={24} />,
      unlocked: true,
      date: "Dec 18, 2024",
      color: "bg-[#22c55e]",
    },
    {
      id: 4,
      name: "Perfect Score",
      description: "5.0 rating (50+ deliveries)",
      icon: <Star size={24} />,
      unlocked: true,
      date: "Jan 2, 2025",
      color: "bg-yellow-500",
    },
    {
      id: 5,
      name: "Master Courier",
      description: "100 deliveries completed",
      icon: <Trophy size={24} />,
      unlocked: true,
      date: "Jan 4, 2025",
      color: "bg-[#22c55e]",
    },
  ];

  const rewards = {
    cash: [
      {
        id: 1,
        name: "Fuel Money",
        amount: "₹1,000",
        points: 500,
        available: true,
      },
      {
        id: 2,
        name: "Cash Bonus",
        amount: "₹2,500",
        points: 1000,
        available: true,
      },
      {
        id: 3,
        name: "Performance Bonus",
        amount: "₹5,000",
        points: 2000,
        available: true,
      },
      {
        id: 4,
        name: "Elite Bonus",
        amount: "₹10,000",
        points: 4500,
        available: true,
      },
    ],
    tours: [
      {
        id: 5,
        name: "Weekend Getaway",
        desc: "Nearby hill station (2D/1N)",
        points: 3000,
        available: true,
        icon: <Plane size={20} />,
      },
      {
        id: 6,
        name: "Goa Beach Trip",
        desc: "3D/2N, Flights + Hotel",
        points: 8000,
        available: true,
        icon: <Plane size={20} />,
      },
      {
        id: 7,
        name: "International - Dubai",
        desc: "5D/4N Package",
        points: 28000,
        available: false,
        icon: <Plane size={20} />,
      },
    ],
    youth: [
      {
        id: 8,
        name: "IPL Match Tickets",
        desc: "2 Premium Tickets",
        points: 3500,
        available: true,
        icon: <Star size={20} />,
      },
      {
        id: 9,
        name: "Gaming Console",
        desc: "PS5 or Xbox Series X",
        points: 18000,
        available: false,
        icon: <Gamepad2 size={20} />,
      },
      {
        id: 10,
        name: "iPhone 15 Pro Max",
        desc: "Latest Model",
        points: 35000,
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
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      {/* Header Section */}
      <div
        className="bg-white border-b sticky top-0 z-20"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left">
              <h1
                className="text-4xl font-black tracking-tighter uppercase mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Ultra Rewards
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-sm border border-emerald-100">
                  <Zap className="w-4 h-4 text-[#22c55e]" />
                  <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest">
                    Earn & Redeem
                  </span>
                </div>
                <p
                  className="text-xs font-bold flex items-center gap-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Calendar className="w-4 h-4 text-[#22c55e]" />
                  Missions Dashboard
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Point Balance Header Card */}
              <div
                className="bg-white border p-6 rounded-sm flex items-center gap-5 shadow-sm min-w-[240px]"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 flex items-center justify-center rounded-sm shrink-0">
                  <Star
                    className="text-[#22c55e]"
                    size={28}
                    fill="currentColor"
                  />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                    Point Balance
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-800">
                      {userStats.totalPoints.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest">
                      PTS
                    </span>
                  </div>
                </div>
              </div>

              {/* Forest Header Card */}
              <div
                className="bg-white border p-6 rounded-sm flex items-center gap-5 shadow-sm min-w-[280px] relative overflow-hidden group"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div className="absolute -top-4 -right-4 opacity-10 text-[#22c55e] group-hover:scale-110 transition-transform duration-500">
                  <Leaf size={64} />
                </div>
                <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 flex items-center justify-center rounded-sm shrink-0">
                  <Leaf className="text-[#22c55e]" size={28} />
                </div>
                <div className="text-left flex-1 relative z-10">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Your Forest
                    </p>
                    <span className="text-[10px] font-black text-[#22c55e]">
                      {userStats.treesPlanted} Trees
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-800">
                      240kg
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      CO₂ / YR
                    </span>
                  </div>
                  <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#22c55e]"
                      style={{ width: "65%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-10 pb-16 space-y-10">
        {/* 7-Tier Progression */}
        <section
          className="border p-8 rounded-sm bg-white shadow-sm"
          style={{
            borderColor: "var(--border-color)",
          }}
        >
          <div className="flex items-center gap-3 mb-10">
            <TrendingUp className="text-[#22c55e]" size={24} />
            <h2
              className="text-xl font-black uppercase tracking-tighter"
              style={{ color: "var(--text-primary)" }}
            >
              Tier Progression
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
                        backgroundColor: isCurrent
                          ? "#10b981"
                          : "var(--bg-primary)",
                        borderColor: isCurrent
                          ? "white"
                          : isPast
                          ? "#10b981"
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
                        <Lock
                          size={20}
                          style={{ color: "var(--text-muted)" }}
                        />
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
                      {tier.points} PTS
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 rounded-sm border border-dashed"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div
                className="p-3 border rounded-sm bg-white"
                style={{
                  borderColor: "var(--border-color)",
                }}
              >
                <Zap className="text-[#22c55e]" size={20} />
              </div>
              <div className="text-start">
                <p
                  className="text-sm font-black uppercase tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  Next Tier: {userStats.nextTier}
                </p>
                <p
                  className="text-xs font-medium italic"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {userStats.pointsToNextTier.toLocaleString()} points away from
                  25% bonus earnings!
                </p>
              </div>
            </div>
            <ResuableButton
              variant="primary"
              className="px-10 py-3.5 !rounded-sm text-xs font-black uppercase tracking-widest shadow-lg shadow-[#22c55e]/20"
            >
              Boost Points <ChevronRight size={16} />
            </ResuableButton>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cash Rewards */}
          <section className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-sm">
                <IndianRupee className="text-[#22c55e]" size={20} />
              </div>
              <h3
                className="text-xl font-black tracking-tight uppercase"
                style={{ color: "var(--text-primary)" }}
              >
                Mega Cash Prizes
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rewards.cash.map((c) => (
                <div
                  key={c.id}
                  className="border p-6 flex items-center justify-between group hover:border-[#22c55e]/30 transition-all rounded-sm bg-white shadow-sm"
                  style={{
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div className="text-start">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-3xl font-black text-slate-800">
                        {c.amount}
                      </span>
                      <span className="text-[10px] font-black text-[#22c55e] uppercase bg-emerald-50 px-2 py-0.5 rounded-sm">
                        Cash
                      </span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      {c.name}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-slate-400">
                      {c.points} PTS
                    </span>
                    <ResuableButton
                      variant="primary"
                      className="px-6 py-2 !rounded-sm text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#22c55e]/10"
                    >
                      Redeem
                    </ResuableButton>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Plane className="text-teal-500" size={18} />
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">
                    Premium Tours
                  </h4>
                </div>
                {rewards.tours.map((t) => (
                  <div
                    key={t.id}
                    className={`p-4 border rounded-sm flex items-center gap-4 transition-all hover:bg-white hover:border-[#22c55e]/30 shadow-sm ${
                      t.available ? "bg-white" : "bg-slate-50 opacity-60"
                    }`}
                    style={{
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <div
                      className={`p-2 rounded-sm border ${
                        t.available
                          ? "bg-emerald-50 text-[#22c55e] border-emerald-100"
                          : "bg-slate-100 text-slate-400 border-slate-200"
                      }`}
                    >
                      {t.icon}
                    </div>
                    <div className="flex-1 text-start">
                      <p className="text-xs font-black text-slate-800">
                        {t.name}
                      </p>
                      <p className="text-[9px] font-bold uppercase text-slate-400">
                        {t.desc}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-800">
                        {t.points.toLocaleString()}
                      </p>
                      <p className="text-[8px] font-black uppercase text-slate-400">
                        PTS
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="text-orange-500" size={18} />
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-800">
                    Youth Exclusives
                  </h4>
                </div>
                {rewards.youth.map((y) => (
                  <div
                    key={y.id}
                    className={`p-4 border rounded-sm flex items-center gap-4 transition-all hover:bg-white hover:border-orange-200 shadow-sm ${
                      y.available ? "bg-white" : "bg-slate-50 opacity-60"
                    }`}
                    style={{
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <div
                      className={`p-2 rounded-sm border ${
                        y.available
                          ? "bg-orange-50 text-orange-500 border-orange-100"
                          : "bg-slate-100 text-slate-400 border-slate-200"
                      }`}
                    >
                      {y.icon}
                    </div>
                    <div className="flex-1 text-start">
                      <p className="text-xs font-black text-slate-800">
                        {y.name}
                      </p>
                      <p className="text-[9px] font-bold uppercase text-slate-400">
                        {y.desc}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-800">
                        {y.points.toLocaleString()}
                      </p>
                      <p className="text-[8px] font-black uppercase text-slate-400">
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
              className="border p-8 rounded-sm h-full bg-white shadow-sm"
              style={{
                borderColor: "var(--border-color)",
              }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Leaf className="text-[#22c55e]" size={24} />
                <h3 className="text-xl font-black uppercase tracking-tighter text-slate-800">
                  Plant More Trees
                </h3>
              </div>

              <div className="space-y-4">
                {treeTiers.map((t) => (
                  <button
                    key={t.name}
                    className="w-full flex items-center justify-between p-4 border transition-all rounded-sm group hover:border-[#22c55e]/30 bg-slate-50/50"
                    style={{
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <div className="text-start">
                      <p className="text-sm font-black text-slate-800">
                        {t.name}
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-wider mt-1 text-slate-400">
                        {t.trees} Tree • {t.impact}
                      </p>
                    </div>
                    <span className="text-[11px] font-black bg-[#22c55e] text-white px-4 py-1.5 rounded-sm uppercase tracking-widest group-hover:bg-[#1eb054] transition-all">
                      {t.points} PTS
                    </span>
                  </button>
                ))}
              </div>

              <div
                className="mt-8 p-6 rounded-sm border border-dashed text-center bg-emerald-50/30"
                style={{
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="flex flex-col items-center">
                  <Leaf className="text-[#22c55e] mb-2" size={32} />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Your contribution to a
                  </p>
                  <p className="text-xl font-black text-[#22c55e] uppercase tracking-tighter">
                    Sustainable Future
                  </p>
                  <p className="text-[9px] font-bold text-slate-500 mt-2 max-w-[200px] leading-relaxed">
                    By reaching 50 trees, you'll offset the carbon footprint of
                    your entire delivery route for a year.
                  </p>
                </div>
              </div>
            </section>

            <section
              className="border p-8 rounded-sm bg-white shadow-sm"
              style={{
                borderColor: "var(--border-color)",
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Award className="text-[#22c55e]" size={20} />
                  <h3 className="text-sm font-black uppercase tracking-tighter text-slate-800">
                    Elite Badges
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
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white p-2 rounded-sm text-[8px] font-black uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50">
                      {b.name}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                    </div>
                  </div>
                ))}
                <div
                  className="w-12 h-12 border border-dashed flex items-center justify-center rounded-sm bg-slate-50 text-slate-400"
                  style={{
                    borderColor: "var(--border-color)",
                  }}
                >
                  +15
                </div>
              </div>
            </section>
          </div>
        </div>

        <section className="bg-gradient-to-r from-[#22c55e] to-[#10b981] p-8 rounded-sm text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-[#22c55e]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
          <div className="text-start max-w-lg relative z-10">
            <h3 className="text-3xl font-black tracking-tighter uppercase mb-2 leading-none">
              Weekly Legend Hunt
            </h3>
            <p className="text-white/90 text-sm font-medium leading-relaxed">
              Top 3 volunteers this week win{" "}
              <span className="font-black underline decoration-white/30">
                ₹15,000
              </span>{" "}
              extra!
            </p>
          </div>
          <div className="flex flex-row items-center bg-white/10 p-4 rounded-sm border border-white/20 gap-6 relative z-10">
            <div className="text-center border-r border-white/20 pr-6">
              <div className="text-2xl font-black tabular-nums tracking-tighter">
                48:12:05
              </div>
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/70">
                Remaining
              </p>
            </div>
            <ResuableButton
              variant="secondary"
              className="px-8 py-3 !bg-white !text-[#22c55e] text-[10px] font-black uppercase tracking-widest !rounded-sm hover:!bg-emerald-50 transition-all shadow-lg"
            >
              Enter Now
            </ResuableButton>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VolunteerRewards;
