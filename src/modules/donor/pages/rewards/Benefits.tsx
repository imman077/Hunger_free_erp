import {
  Star,
  Trophy,
  Shield,
  Zap,
  Gift,
  Crown,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Benefits = () => {
  const navigate = useNavigate();

  const tiers = [
    {
      name: "Beginner",
      points: "0 - 500",
      bonus: 0,
      color: "from-slate-400 to-slate-500",
      icon: <Sparkles className="text-slate-400" size={32} />,
      perks: [
        "Welcome Pack (Digital Assets)",
        "Community Forum Access",
        "Basic Daily Impact Tracking",
        "Standard Support Email",
      ],
    },
    {
      name: "Bronze",
      points: "501 - 1,500",
      bonus: 5,
      color: "from-amber-600 to-amber-700",
      icon: <Shield className="text-amber-600" size={32} />,
      perks: [
        "Bronze Verified Profile Badge",
        "5% Bonus Impact Points",
        "Monthly Lucky Draw Entry",
        "Community Member Status",
      ],
    },
    {
      name: "Silver",
      points: "1,501 - 3,500",
      bonus: 10,
      color: "from-slate-300 to-slate-400",
      icon: <Zap className="text-slate-400" size={32} />,
      perks: [
        "Silver Verified Profile Badge",
        "10% Bonus Impact Points",
        "Priority Food Pickup Services",
        "Detailed Monthly Impact Reports",
      ],
    },
    {
      name: "Gold",
      points: "3,501 - 7,500",
      bonus: 15,
      color: "from-yellow-400 to-yellow-500",
      icon: <Star className="text-yellow-500" size={32} />,
      perks: [
        "Gold Verified Profile Badge",
        "15% Bonus Impact Points",
        "VIP NGO Event Invitations",
        "Direct Support Chat Access",
      ],
    },
    {
      name: "Platinum",
      points: "7,501 - 15,000",
      bonus: 20,
      color: "from-cyan-400 to-cyan-500",
      icon: <Gift className="text-cyan-500" size={32} />,
      perks: [
        "Platinum Verified Profile Badge",
        "20% Bonus Impact Points",
        "Exclusive Hunger-Free ERP Gear",
        "Dedicated Impact Manager",
      ],
    },
    {
      name: "Diamond",
      points: "15,001 - 30,000",
      bonus: 25,
      color: "from-blue-500 to-indigo-600",
      icon: <Crown className="text-indigo-600" size={32} />,
      perks: [
        "Diamond Verified Profile Badge",
        "25% Bonus Impact Points",
        "Featured Donor on Home Wall",
        "Custom Impact Milestone Gifts",
      ],
    },
    {
      name: "Legend",
      points: "30,001+",
      bonus: 40,
      color: "from-emerald-500 to-green-600",
      icon: <Trophy className="text-emerald-500" size={32} />,
      perks: [
        "Legend Verified Profile Badge",
        "40% Bonus Impact Points",
        "10 Trees Planted Monthly in your Name",
        "Lifetime Achievement Trophy",
        "Global All-Access Pass",
      ],
    },
  ];

  const [previewTier, setPreviewTier] = useState<string>("Legend");

  return (
    <div className="p-6 md:p-10 min-h-screen space-y-10 max-w-[1600px] mx-auto bg-[#f8fafc]">
      {/* Header */}
      <div className="space-y-6">
        <div className="space-y-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors group -ml-1"
          >
            <ChevronLeft
              size={16}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Back to Rewards
            </span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-4">
            <div className="space-y-1 text-left">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-slate-900">
                Tier Benefits
              </h1>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-green-500">
                Unlock exclusive rewards as you grow
              </p>
            </div>

            <div className="px-8 py-6 bg-white border border-slate-200 rounded-sm flex items-center gap-6">
              <div className="text-start">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Next Milestone
                </p>
                <h4 className="text-xl font-black text-slate-800 uppercase">
                  Legend Status
                </h4>
              </div>
              <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-sm flex items-center justify-center">
                <Trophy className="text-green-500" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Points System Info Section */}
      <div className="bg-white border border-slate-200 rounded-sm p-8 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="space-y-3 max-w-md w-full text-left">
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            {previewTier} Rewards
          </h2>
          <p className="text-sm font-medium text-slate-500 leading-relaxed">
            {previewTier === "Beginner"
              ? "Start your journey by making your first impact. Every contribution counts toward your ranking."
              : `Enjoy a permanent ${tiers.find((t) => t.name === previewTier)?.bonus}% boost to all your impact activities as a ${previewTier} member.`}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {[
            { label: "First Donation", base: 300 },
            { label: "Per KG Food", base: 25 },
            { label: "Milestone Bonus", base: 600 },
          ].map((item, idx) => {
            const bonusPercent =
              tiers.find((t) => t.name === previewTier)?.bonus || 0;
            const multipliedPoints = Math.floor(
              item.base * (1 + bonusPercent / 100),
            );

            return (
              <div
                key={idx}
                className="flex-1 bg-slate-50 border border-slate-100 rounded-sm p-5 min-w-[180px] group"
              >
                <div className="flex justify-between items-start mb-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {item.label}
                  </p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-2xl font-black tabular-nums ${previewTier !== "Beginner" ? "text-emerald-600" : "text-slate-900"}`}
                  >
                    {multipliedPoints}
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase">
                    PTS
                  </span>
                </div>
                {bonusPercent > 0 && (
                  <p className="text-[9px] font-black text-emerald-600/70 uppercase tracking-tighter mt-1">
                    +{bonusPercent}% {previewTier} Bonus
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {tiers.map((tier, idx) => (
          <div
            key={tier.name}
            onClick={() => setPreviewTier(tier.name)}
            className="cursor-pointer border border-slate-200 hover:border-slate-300 rounded-sm p-8 bg-white transition-colors duration-200 relative overflow-hidden group"
          >
            {/* Background Decorative Element */}
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tier.color} opacity-[0.03] rounded-bl-[100px] transition-transform duration-500 group-hover:scale-110`}
            />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm">
                  {tier.icon}
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">
                    Requirement
                  </p>
                  <p className="text-sm font-black text-slate-800 tracking-tight">
                    {tier.points} PTS
                  </p>
                </div>
              </div>

              <div className="space-y-1 mt-6">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                  {tier.name}
                </h3>
                <div
                  className={`h-1 w-12 bg-gradient-to-r ${tier.color} rounded-full`}
                />
              </div>

              <div className="pt-6 mt-auto border-t border-slate-50">
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br ${tier.color}`}
                  >
                    +{tier.bonus}%
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Earning Power
                  </span>
                </div>
                <p className="text-[11px] font-bold text-slate-500 mt-2 leading-tight">
                  Unlock permanent status with exclusive digital credentials.
                </p>
              </div>
            </div>

            {/* Tier Rank Indicator */}
            <div className="absolute bottom-6 right-8 text-[40px] font-black opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity">
              0{idx + 1}
            </div>
          </div>
        ))}

        <div className="bg-slate-900 border border-slate-800 rounded-sm p-8 relative overflow-hidden flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-500">
            <Crown size={32} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              Immortal
            </h3>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">
              Top 0.1% Contributors
            </p>
          </div>
          <p className="text-xs font-bold text-slate-400 max-w-[200px]">
            Exclusive benefits reserved for the most impactful heroes.
          </p>
          <div className="px-4 py-2 border border-slate-700 rounded-sm">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
