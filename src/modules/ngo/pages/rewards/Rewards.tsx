import {
  Award,
  Star,
  Trophy,
  Building2,
  Users,
  Sprout,
  TrendingUp,
  CheckCircle,
  Lock,
  ChevronRight,
  IndianRupee,
  ShieldCheck,
  Globe,
  HandHeart,
  Zap,
} from "lucide-react";

const NGORewards = () => {
  const userStats = {
    totalPoints: 45000,
    currentTier: "Legend",
    nextTier: "Titan",
    pointsToNextTier: 5000,
    beneficiariesServed: 12500,
    donationsAccepted: 842,
    treesPlanted: 150,
  };

  const tiers = [
    { name: "Beginner", points: "0-1,000", color: "text-gray-400" },
    { name: "Partner", points: "1,001-5,000", color: "text-emerald-600" },
    { name: "Elite", points: "5,001-15,000", color: "text-blue-600" },
    { name: "Master", points: "15,001-35,000", color: "text-purple-600" },
    { name: "Legend", points: "35,001-75,000", color: "text-amber-600" },
    { name: "Titan", points: "75,001+", color: "text-red-600" },
  ];

  const badges = [
    {
      id: 1,
      name: "New Partner",
      description: "First donation accepted",
      icon: <Building2 size={24} />,
      unlocked: true,
      date: "Sep 5, 2024",
      color: "bg-emerald-500",
    },
    {
      id: 2,
      name: "Impact Maker",
      description: "1,000 beneficiaries served",
      icon: <Users size={24} />,
      unlocked: true,
      date: "Sep 20, 2024",
      color: "bg-blue-500",
    },
    {
      id: 3,
      name: "Reliable NGO",
      description: "99% acceptance rate",
      icon: <ShieldCheck size={24} />,
      unlocked: true,
      date: "Oct 15, 2024",
      color: "bg-indigo-500",
    },
    {
      id: 4,
      name: "Community Hero",
      description: "Top NGO of the month",
      icon: <Trophy size={24} />,
      unlocked: true,
      date: "Nov 1, 2024",
      color: "bg-amber-500",
    },
    {
      id: 5,
      name: "Eco Guardian",
      description: "100+ trees planted",
      icon: <Sprout size={24} />,
      unlocked: true,
      date: "Jan 2, 2025",
      color: "bg-green-600",
    },
  ];

  const rewards = {
    grants: [
      {
        id: 1,
        name: "Operations Fund",
        amount: "₹5,000",
        points: 1000,
        available: true,
      },
      {
        id: 2,
        name: "Growth Fund",
        amount: "₹15,000",
        points: 2500,
        available: true,
      },
      {
        id: 3,
        name: "Impact Fund",
        amount: "₹30,000",
        points: 5000,
        available: true,
      },
      {
        id: 4,
        name: "Expansion Fund",
        amount: "₹75,000",
        points: 10000,
        available: true,
      },
    ],
    mega: [
      {
        id: 5,
        name: "Mega Grant",
        amount: "₹1,50,000",
        points: 20000,
        available: true,
        icon: <IndianRupee size={20} />,
      },
      {
        id: 6,
        name: "Super Grant",
        amount: "₹3,00,000",
        points: 35000,
        available: true,
        icon: <IndianRupee size={20} />,
      },
      {
        id: 7,
        name: "National NGO Award",
        desc: "Cash + Recognition",
        points: 50000,
        available: false,
        icon: <Globe size={20} />,
      },
    ],
    social: [
      {
        id: 8,
        name: "Beneficiary Support",
        desc: "Fund for 100 families",
        points: 5000,
        available: true,
        icon: <HandHeart size={20} />,
      },
      {
        id: 9,
        name: "Health Camp Fund",
        desc: "Organize medical checkup",
        points: 15000,
        available: true,
        icon: <Zap size={20} />,
      },
      {
        id: 10,
        name: "Zero Waste Tech",
        desc: "Smart Inventory System",
        points: 25000,
        available: false,
        icon: <Building2 size={20} />,
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
    <div className="p-8 bg-gray-50/50 min-h-screen space-y-10">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="text-start">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-3 uppercase">
            NGO Grants & Rewards
          </h1>
          <p className="text-gray-600 font-medium text-lg">
            Maximizing your impact through generous funds and recognition 🏢
          </p>
        </div>
        <div className="bg-white border border-gray-100 p-6 flex items-center gap-6 rounded-sm">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 flex items-center justify-center rounded-sm">
            <TrendingUp className="text-emerald-500" size={32} />
          </div>
          <div className="text-start">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
              Impact Points earned
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-gray-900">
                {userStats.totalPoints.toLocaleString()}
              </span>
              <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">
                Points
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6-Tier Progression */}
      <section className="bg-white border border-gray-100 p-8 rounded-sm">
        <div className="flex items-center gap-3 mb-10">
          <Award className="text-emerald-500" size={24} />
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">
            Operational Tiers
          </h2>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0 hidden lg:block" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
            {tiers.map((tier, idx) => {
              const isCurrent = tier.name === userStats.currentTier;
              const isPast = idx < getCurrentTierIndex();

              return (
                <div key={tier.name} className="flex flex-col items-center">
                  <div
                    className={`w-14 h-14 flex items-center justify-center border-2 mb-4 transition-all duration-500 ${
                      isCurrent
                        ? "bg-emerald-600 border-white scale-125 ring-4 ring-emerald-50"
                        : isPast
                        ? "bg-white border-emerald-600"
                        : "bg-white border-gray-100"
                    } rounded-sm`}
                  >
                    {isPast ? (
                      <CheckCircle className="text-emerald-600" size={24} />
                    ) : isCurrent ? (
                      <Star
                        className="text-white"
                        size={24}
                        fill="currentColor"
                      />
                    ) : (
                      <Lock className="text-gray-200" size={20} />
                    )}
                  </div>
                  <p
                    className={`text-[10px] font-black uppercase tracking-widest mb-1 ${
                      isCurrent ? "text-emerald-600" : "text-gray-400"
                    }`}
                  >
                    {tier.name}
                  </p>
                  <p className="text-[9px] font-bold text-gray-300">
                    {tier.points} PTS
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 bg-emerald-50/50 rounded-sm border border-emerald-100 border-dashed">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="p-3 bg-white rounded-sm border border-emerald-100">
              <Zap className="text-emerald-500" size={20} />
            </div>
            <div className="text-start">
              <p className="text-sm font-black text-gray-900 uppercase tracking-tight">
                Current Status: {userStats.currentTier}
              </p>
              <p className="text-xs text-gray-500 font-medium italic">
                Only {userStats.pointsToNextTier.toLocaleString()} points away
                from unlocking Carbon Titan grants!
              </p>
            </div>
          </div>
          <button className="px-8 py-3 bg-emerald-600 text-white text-xs font-black uppercase tracking-widest rounded-sm hover:bg-emerald-700 transition-all flex items-center gap-2">
            View Grant Eligibility <ChevronRight size={16} />
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Grant Distribution Center */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-sm">
              <IndianRupee className="text-emerald-600" size={20} />
            </div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">
              Available Grants
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.grants.map((g) => (
              <div
                key={g.id}
                className="bg-white border border-gray-100 p-6 flex items-center justify-between group hover:border-emerald-200 transition-all rounded-sm"
              >
                <div className="text-start">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl font-black text-gray-900">
                      {g.amount}
                    </span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase bg-emerald-50 px-2 py-0.5 rounded-sm">
                      Grant
                    </span>
                  </div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    {g.name}
                  </p>
                </div>
                <button className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-black text-gray-900 uppercase">
                    {g.points} PTS
                  </span>
                  <div className="px-5 py-2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-sm group-hover:bg-emerald-700 transition-all">
                    Apply
                  </div>
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Mega Grants */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="text-blue-500" size={18} />
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">
                  Mega Grants
                </h4>
              </div>
              {rewards.mega.map((m) => (
                <div
                  key={m.id}
                  className={`p-4 border rounded-sm flex items-center gap-4 ${
                    m.available
                      ? "bg-white border-gray-100"
                      : "bg-gray-50 border-gray-100 opacity-60"
                  }`}
                >
                  <div
                    className={`p-2 rounded-sm ${
                      m.available
                        ? "bg-blue-50 text-blue-500"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {m.icon}
                  </div>
                  <div className="flex-1 text-start">
                    <p className="text-xs font-black text-gray-900">
                      {m.amount || m.name}
                    </p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase">
                      {m.name === m.amount ? "Award" : m.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-900">
                      {m.points.toLocaleString()}
                    </p>
                    <p className="text-[8px] font-black text-gray-400 uppercase">
                      PTS
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Support */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <HandHeart className="text-purple-500" size={18} />
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">
                  Impact Programs
                </h4>
              </div>
              {rewards.social.map((s) => (
                <div
                  key={s.id}
                  className={`p-4 border rounded-sm flex items-center gap-4 ${
                    s.available
                      ? "bg-white border-gray-100"
                      : "bg-gray-50 border-gray-100 opacity-60"
                  }`}
                >
                  <div
                    className={`p-2 rounded-sm ${
                      s.available
                        ? "bg-purple-50 text-purple-500"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {s.icon}
                  </div>
                  <div className="flex-1 text-start">
                    <p className="text-xs font-black text-gray-900">{s.name}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase">
                      {s.desc}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-900">
                      {s.points.toLocaleString()}
                    </p>
                    <p className="text-[8px] font-black text-gray-400 uppercase">
                      PTS
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Legacy */}
        <div className="space-y-8">
          <section className="bg-emerald-900 text-white p-8 rounded-sm relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-10">
              <Sprout size={160} />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <Sprout className="text-emerald-400" size={24} />
                <h3 className="text-xl font-black uppercase tracking-tighter">
                  Impact Forest
                </h3>
              </div>

              <div className="flex items-center gap-6 py-4 border-y border-white/10">
                <div className="text-start">
                  <p className="text-[64px] font-black leading-none">
                    {userStats.treesPlanted}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                    Total Trees Planted
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                {treeTiers.map((t) => (
                  <button
                    key={t.name}
                    className="w-full flex items-center justify-between p-3 border border-white/20 hover:bg-white/10 transition-all rounded-sm"
                  >
                    <div className="text-start">
                      <p className="text-xs font-black">{t.name}</p>
                      <p className="text-[9px] font-medium text-emerald-400">
                        {t.trees} Tree • {t.impact}
                      </p>
                    </div>
                    <span className="text-[10px] font-black bg-emerald-500 px-3 py-1 rounded-sm uppercase">
                      {t.points} PTS
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white border border-gray-100 p-8 rounded-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Award className="text-emerald-500" size={20} />
                <h3 className="text-sm font-black uppercase tracking-tighter">
                  National Badges
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {badges.map((b) => (
                <div key={b.id} className="group relative">
                  <div
                    className={`w-12 h-12 ${b.color} flex items-center justify-center text-white rounded-sm transform group-hover:scale-110 transition-all`}
                  >
                    {b.icon}
                  </div>
                </div>
              ))}
              <div className="w-12 h-12 bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-gray-300 rounded-sm">
                +10
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="bg-emerald-800 p-10 rounded-sm text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-start max-w-lg">
          <h3 className="text-4xl font-black tracking-tighter uppercase mb-4">
            Quarterly Top NGOs
          </h3>
          <p className="text-emerald-50 font-medium leading-relaxed">
            The top 3 NGOs based on operational excellence will receive a{" "}
            <span className="font-bold underline decoration-emerald-300 underline-offset-4">
              ₹2,00,000 special grant
            </span>{" "}
            and a feature in the national newsletter.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-4xl font-black mb-2 tracking-[0.2em]">
            Q1 2025
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200 mb-6">
            Current Challenge
          </p>
          <button className="px-10 py-4 bg-white text-emerald-800 text-xs font-black uppercase tracking-widest rounded-sm hover:bg-emerald-50 transition-all active:scale-95">
            Submit Impact Report
          </button>
        </div>
      </section>
    </div>
  );
};

export default NGORewards;
