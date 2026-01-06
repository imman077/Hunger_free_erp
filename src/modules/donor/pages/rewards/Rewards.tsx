import React from "react";
import {
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
  Loader2,
  Gift,
} from "lucide-react";
import { useState } from "react";
import { Modal, ModalContent, ModalBody } from "@heroui/react";

const DonorRewards = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showDrawModal, setShowDrawModal] = useState(false);
  const [wonReward, setWonReward] = useState<string | null>(null);

  const handleSpin = () => {
    setIsSpinning(true);
    setWonReward(null);

    // Simulate spin duration
    setTimeout(() => {
      setIsSpinning(false);
      setWonReward("₹5,000 Cash Credit");
    }, 3000);
  };

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
      className="p-8 md:p-10 min-h-screen space-y-8"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Spin Modal - HeroUI Refactored */}
      <Modal
        isOpen={showDrawModal}
        onOpenChange={setShowDrawModal}
        size="md"
        backdrop="blur"
        hideCloseButton={isSpinning}
        radius="none"
        classNames={{
          backdrop: "bg-slate-900/90 backdrop-blur-md",
          base: "border-none shadow-2xl overflow-hidden",
          body: "p-0",
        }}
      >
        <ModalContent className="bg-white border-none">
          {(onClose) => (
            <ModalBody className="p-10 text-center relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-50 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">
                    Grand Spin
                  </h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Test your luck today!
                  </p>
                </div>

                {/* The Wheel/Spin Area */}
                <div className="relative flex items-center justify-center py-10 px-4">
                  <div
                    className={`w-48 h-48 rounded-full border-8 border-slate-50 flex items-center justify-center relative shadow-inner
                      ${isSpinning ? "animate-spin" : ""}
                    `}
                  >
                    {/* Inner segments decoration */}
                    <div className="absolute inset-0 rounded-full border-[20px] border-emerald-50/50 border-t-blue-50/50 border-r-emerald-50/50 border-b-blue-50/50" />
                    <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center relative z-10 border border-slate-100">
                      {isSpinning ? (
                        <Loader2
                          size={32}
                          className="text-[#22c55e] animate-spin"
                        />
                      ) : (
                        <Gift size={32} className="text-[#22c55e]" />
                      )}
                    </div>
                  </div>
                  {/* Pointer */}
                  <div
                    className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-6 bg-[#22c55e] shadow-md z-20"
                    style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)" }}
                  />
                </div>

                {wonReward ? (
                  <div className="space-y-6 animate-in fade-in zoom-in duration-500">
                    <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-md">
                      <p className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest mb-2">
                        You Won!
                      </p>
                      <h4 className="text-2xl font-black text-slate-800 tracking-tight">
                        {wonReward}
                      </h4>
                    </div>
                    <button
                      onClick={() => setShowDrawModal(false)}
                      className="w-full py-4 bg-[#22c55e] text-white text-[11px] font-black uppercase tracking-widest rounded-md hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                    >
                      Collect Reward
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSpin}
                    disabled={isSpinning}
                    className="w-full py-5 bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-md hover:bg-black disabled:opacity-50 transition-all shadow-xl active:scale-95"
                  >
                    {isSpinning ? "Spinning..." : "Start Spin"}
                  </button>
                )}
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
      {/* Page Heading & Right-side Cards */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div className="text-start">
          <h1
            className="text-4xl md:text-5xl font-black tracking-tighter mb-2 uppercase"
            style={{ color: "var(--text-primary)" }}
          >
            Donor Rewards
          </h1>
          <p
            className="text-[11px] font-black uppercase tracking-[0.25em] flex items-center gap-2.5"
            style={{ color: "var(--text-muted)" }}
          >
            <Sparkles size={16} className="text-[#22c55e]" />
            Redeem points for exclusive benefits
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          {/* Impact Points Card */}
          <div className="flex items-center gap-4 bg-white border border-slate-100 p-4 rounded-md shadow-sm min-w-48">
            <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 flex items-center justify-center rounded-md">
              <Star className="text-[#22c55e]" size={24} fill="currentColor" />
            </div>
            <div className="text-start">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 text-slate-400">
                Impact Points
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-800 tabular-nums leading-none">
                  {userStats.totalPoints.toLocaleString()}
                </span>
                <span className="text-[10px] font-black text-[#22c55e] uppercase">
                  PTS
                </span>
              </div>
            </div>
          </div>

          {/* Compact Monthly Draw Card */}
          <div className="bg-white p-5 rounded-md flex items-center gap-8 relative overflow-hidden shadow-sm border border-slate-100">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full blur-2xl -mr-12 -mt-12" />
            <div className="relative z-10 shrink-0">
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#22c55e] mb-1.5">
                Grand Draw
              </p>
              <h3 className="text-lg font-black tracking-tight uppercase leading-none text-slate-800">
                Monthly
              </h3>
            </div>

            <div className="h-8 w-px bg-slate-100 shrink-0" />

            <div className="relative z-10 flex items-center gap-6">
              <div className="text-center shrink-0">
                <p className="text-sm font-black tabular-nums leading-none tracking-tight text-slate-800">
                  12:15:30
                </p>
                <p className="text-[7px] font-black uppercase text-slate-400 mt-1 tracking-widest">
                  H:M:S
                </p>
              </div>
              <button
                onClick={() => setShowDrawModal(true)}
                className="px-5 py-2.5 bg-[#22c55e] text-white text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-emerald-600 transition-all active:scale-95 shadow-md shadow-emerald-500/20"
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Tier Progression */}
      <section
        className="border p-8 rounded-md bg-white shadow-sm"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="flex items-center gap-3 mb-8 text-start">
          <TrendingUp className="text-[#22c55e]" size={22} />
          <h2 className="text-lg font-black uppercase tracking-tighter text-slate-800">
            Loyalty Tiers
          </h2>
        </div>

        <div className="relative mb-6">
          <div
            className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 z-0 hidden lg:block"
            style={{ backgroundColor: "var(--border-color)" }}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 relative z-10">
            {tiers.map((tier, idx) => {
              const isCurrent = tier.name === userStats.currentTier;
              const isPast = idx < getCurrentTierIndex();
              return (
                <div key={tier.name} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 flex items-center justify-center border transition-all duration-500 rounded-md ${
                      isCurrent
                        ? "bg-[#22c55e] border-white ring-4 ring-emerald-50 shadow-lg shadow-emerald-500/20"
                        : isPast
                        ? "border-[#22c55e] bg-emerald-50/30 shadow-sm"
                        : "border-gray-100 bg-white"
                    }`}
                  >
                    {isPast ? (
                      <CheckCircle className="text-[#22c55e]" size={20} />
                    ) : isCurrent ? (
                      <Star
                        className="text-white"
                        size={20}
                        fill="currentColor"
                      />
                    ) : (
                      <Lock size={16} className="text-slate-300" />
                    )}
                  </div>
                  <p
                    className={`text-[10px] font-black uppercase tracking-widest mt-3 ${
                      isCurrent ? "text-[#22c55e]" : "text-slate-400"
                    }`}
                  >
                    {tier.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-emerald-50/30 rounded-md border border-emerald-100 border-dashed mt-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="p-3 bg-white rounded-md border border-emerald-100 shadow-sm">
              <Sparkles className="text-[#22c55e]" size={20} />
            </div>
            <div className="text-start">
              <p className="text-xs font-black uppercase tracking-tight text-slate-800">
                Status: {userStats.currentTier}
              </p>
              <p className="text-[11px] font-semibold text-slate-500 italic leading-none mt-1.5">
                {userStats.pointsToNextTier.toLocaleString()} points left to{" "}
                <span className="text-[#15803d] font-black">Legend</span>
              </p>
            </div>
          </div>
          <button className="px-8 py-3 bg-[#22c55e] text-white text-[11px] font-black uppercase tracking-widest rounded-md hover:bg-emerald-600 transition-all flex items-center gap-2.5 shadow-md shadow-emerald-500/20 active:scale-95">
            View Benefits <ChevronRight size={16} />
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rewards Center */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 text-start">
            <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-md shadow-sm">
              <IndianRupee className="text-[#22c55e]" size={20} />
            </div>
            <h3 className="text-lg font-black tracking-tight uppercase text-slate-800">
              Mega Cash Rewards
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.cash.map((c) => (
              <div
                key={c.id}
                className="border p-6 flex items-center justify-between group hover:border-[#22c55e]/30 transition-all rounded-md bg-white shadow-sm hover:shadow-md"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div className="text-start">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-3xl font-black text-slate-800 tabular-nums">
                      {c.amount}
                    </span>
                    <span className="text-[10px] font-black text-[#22c55e] uppercase bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                      Winner
                    </span>
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                    {c.name}
                  </p>
                </div>
                <button className="flex flex-col items-center">
                  <span className="text-[11px] font-black text-slate-800 mb-1.5 uppercase">
                    {c.points} PTS
                  </span>
                  <div className="px-6 py-2 bg-[#22c55e] text-white text-[10px] font-black uppercase tracking-widest rounded-md group-hover:bg-emerald-600 transition-all shadow-sm">
                    Claim
                  </div>
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Plane className="text-[#22c55e]" size={20} />
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-800">
                  Global Travel
                </h4>
              </div>
              {rewards.tours.map((t) => (
                <div
                  key={t.id}
                  className={`p-4 border rounded-md flex items-center gap-4 ${
                    !t.available && "opacity-50"
                  }`}
                  style={{
                    backgroundColor: t.available
                      ? "white"
                      : "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div
                    className={`p-2 rounded-md ${
                      t.available
                        ? "bg-emerald-50 text-[#22c55e] shadow-sm"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {React.cloneElement(
                      t.icon as React.ReactElement<{ size?: number }>,
                      {
                        size: 24,
                      }
                    )}
                  </div>
                  <div className="flex-1 text-start min-w-0">
                    <p className="text-[11px] font-black text-slate-800 truncate">
                      {t.name}
                    </p>
                    <p className="text-[8px] font-bold uppercase text-slate-400 truncate">
                      {t.desc}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black text-slate-800 leading-none">
                      {t.points.toLocaleString()}
                    </p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                      PTS
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Smartphone className="text-[#22c55e]" size={20} />
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-800">
                  Luxury Tech
                </h4>
              </div>
              {rewards.youth.map((y) => (
                <div
                  key={y.id}
                  className={`p-4 border rounded-md flex items-center gap-4 ${
                    !y.available && "opacity-50"
                  }`}
                  style={{
                    backgroundColor: y.available
                      ? "white"
                      : "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div
                    className={`p-2 rounded-md ${
                      y.available
                        ? "bg-emerald-50 text-[#22c55e] shadow-sm"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {React.cloneElement(
                      y.icon as React.ReactElement<{ size?: number }>,
                      {
                        size: 24,
                      }
                    )}
                  </div>
                  <div className="flex-1 text-start min-w-0">
                    <p className="text-[11px] font-black text-slate-800 truncate">
                      {y.name}
                    </p>
                    <p className="text-[8px] font-bold uppercase text-slate-400 truncate">
                      {y.desc}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black text-slate-800 leading-none">
                      {y.points.toLocaleString()}
                    </p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                      PTS
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Tracker */}
        <div className="space-y-6">
          <section
            className="p-8 rounded-md bg-white border shadow-sm"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-md flex items-center justify-center border border-emerald-100">
                  <Leaf className="text-[#22c55e]" size={20} />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">
                  Your Legacy
                </h3>
              </div>

              <div className="flex items-center gap-6 py-6 border-y border-slate-50">
                <div className="text-start">
                  <p className="text-5xl font-black leading-none tabular-nums text-slate-900">
                    {userStats.treesPlanted}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#22c55e] mt-2.5">
                    Trees Planted
                  </p>
                </div>
                <div className="flex-1 space-y-2.5">
                  <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 tracking-widest">
                    <span>CO₂ Offset</span>
                    <span className="text-[#22c55e]">900kg/yr</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#22c55e] w-[80%] shadow-[0_0_8px_rgba(34,197,94,0.3)]" />
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                {treeTiers.map((t) => (
                  <button
                    key={t.name}
                    className="w-full flex items-center justify-between p-4 border border-slate-50 hover:bg-slate-50/80 transition-all rounded-md text-left group"
                  >
                    <div>
                      <p className="text-[11px] font-black text-slate-800 group-hover:text-[#22c55e] transition-colors uppercase tracking-tight">
                        {t.name}
                      </p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                        {t.trees} Tree • {t.impact}
                      </p>
                    </div>
                    <span className="text-[9px] font-black bg-emerald-50 text-[#22c55e] px-3 py-1.5 rounded-md border border-emerald-100 group-hover:bg-[#22c55e] group-hover:text-white transition-all shadow-sm">
                      {t.points} PTS
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section
            className="border p-8 rounded-md bg-white shadow-sm"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800">
                Recent Badges
              </h3>
              <button className="text-[10px] font-black uppercase text-[#22c55e] hover:underline tracking-widest">
                Gallery
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {badges.slice(0, 4).map((b) => (
                <div key={b.id} className="group relative">
                  <div
                    className={`w-14 h-14 ${b.color} flex items-center justify-center text-white rounded-md transition-all group-hover:scale-105 shadow-md hover:shadow-lg`}
                  >
                    {React.cloneElement(
                      b.icon as React.ReactElement<{ size?: number }>,
                      {
                        size: 24,
                      }
                    )}
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

export default DonorRewards;
