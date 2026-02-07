import React, { useState, useMemo } from "react";
import {
  Star,
  CheckCircle,
  Lock,
  ChevronRight,
  Plane,
  Gamepad2,
  Smartphone,
  Zap,
  Building2,
  QrCode,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalContent, ModalBody } from "@heroui/react";
import ResuableButton from "../../../../global/components/resuable-components/button";
import ResuableDrawer from "../../../../global/components/resuable-components/drawer";
import ResuableDatePicker from "../../../../global/components/resuable-components/datepicker";
import ResuableInput from "../../../../global/components/resuable-components/input";
import ResuableTextarea from "../../../../global/components/resuable-components/textarea";

// --- TYPES ---
export interface Prize {
  id: number;
  label: string;
  icon: string | React.ReactNode;
  color: string;
}

interface PrizeModalProps {
  isOpen: boolean;
  prize: Prize;
  reaction: string;
  onClose: () => void;
}

// --- PRIZE MODAL ---
const PrizeModal: React.FC<PrizeModalProps> = ({
  isOpen,
  prize,
  reaction,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
      backdrop="blur"
      hideCloseButton
      size="sm"
      classNames={{
        backdrop: "bg-slate-900/40 backdrop-blur-xl",
        base: "bg-white rounded-sm border border-slate-200",
        body: "p-0",
        wrapper: "z-[100]",
      }}
    >
      <ModalContent>
        <ModalBody className="p-10 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 bg-emerald-50 rounded-sm flex items-center justify-center text-5xl border border-emerald-200">
              {prize.icon}
            </div>
          </div>

          <h2 className="text-[10px] font-black text-slate-400 tracking-[0.5em] uppercase mb-4">
            Draw Result
          </h2>

          <div className="mb-10">
            <h3
              className={`text-4xl font-black mb-3 tracking-tighter uppercase ${prize.label === "GRAND PRIZE" ? "text-[#22c55e]" : "text-slate-800"}`}
            >
              {prize.label}
            </h3>
            <p className="text-slate-500 font-medium px-4 leading-relaxed italic">
              "{reaction}"
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-5 bg-[#22c55e] text-white font-black uppercase tracking-[0.2em] rounded-sm hover:bg-[#1da850] transition-all active:scale-95"
          >
            Collect
          </button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

// --- WHEEL COMPONENT ---
interface WheelProps {
  prizes: Prize[];
  rotation: number;
  isSpinning: boolean;
  onSpin: () => void;
}

const Wheel: React.FC<WheelProps> = ({
  prizes,
  rotation,
  isSpinning,
  onSpin,
}) => {
  const numPrizes = prizes.length;
  const segmentAngle = 360 / numPrizes;

  return (
    <div className="relative w-[280px] h-[280px] md:w-[440px] md:h-[440px] mx-auto select-none font-sans">
      <div className="absolute inset-[-12px] md:inset-[-16px] rounded-full border-[12px] md:border-[20px] border-[#0f172a] shadow-[0_45px_90px_-20px_rgba(0,0,0,0.5)] z-10 pointer-events-none"></div>
      <div className="absolute inset-[-12px] md:inset-[-16px] rounded-full border-[2px] border-white/10 z-11 pointer-events-none"></div>

      <div
        className="relative w-full h-full rounded-full overflow-hidden transition-transform cubic-bezier(0.15, 0, 0.05, 1)"
        style={{
          transform: `rotate(${rotation}deg)`,
          transitionDuration: isSpinning ? "5s" : "0s",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <radialGradient id="wheelGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
            </radialGradient>
          </defs>

          {prizes.map((prize, i) => {
            const startAngle = i * segmentAngle;
            const endAngle = (i + 1) * segmentAngle;

            const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
            const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
            const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
            const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);

            const isJackpot = prize.label === "GRAND PRIZE";

            return (
              <g key={prize.id}>
                <path
                  d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                  fill={prize.color}
                  stroke="rgba(0,0,0,0.05)"
                  strokeWidth="0.1"
                />

                <g
                  transform={`rotate(${startAngle + segmentAngle / 2}, 50, 50)`}
                >
                  <text
                    x="50"
                    y="11"
                    fill={isJackpot ? "#ffffff" : "#0f172a"}
                    className="font-black"
                    style={{
                      fontSize: isJackpot ? "3.2px" : "4.8px",
                      fontFamily: "var(--font-primary)",
                      letterSpacing: "-0.01em",
                    }}
                    textAnchor="middle"
                  >
                    {prize.label}
                  </text>

                  <text
                    x="50"
                    y="15"
                    fill={isJackpot ? "#ffffff" : "#22c55e"}
                    className="font-black"
                    style={{
                      fontSize: "2.5px",
                      fontFamily: "var(--font-primary)",
                      letterSpacing: "0.1em",
                    }}
                    opacity={isJackpot ? 0.8 : 1}
                    textAnchor="middle"
                  >
                    WIN
                  </text>

                  <g transform="translate(50, 26)">
                    {isJackpot ? (
                      <g transform="translate(-5, -5)">
                        <path
                          d="M1 3.5C0.44 3.5 0 3.94 0 4.5V7.5C0 8.05 0.44 8.5 1 8.5H9C9.56 8.5 10 8.05 10 7.5V4.5C10 3.94 9.56 3.5 9 3.5H1Z"
                          fill="#ffffff"
                        />
                        <rect
                          x="4.2"
                          y="4.5"
                          width="1.6"
                          height="2"
                          rx="0.3"
                          fill="#22c55e"
                          stroke="#ffffff"
                          strokeWidth="0.1"
                        />
                      </g>
                    ) : (
                      <text
                        fontSize="8.5"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{
                          fontFamily: "Segoe UI Emoji, Apple Color Emoji",
                        }}
                      >
                        {prize.icon}
                      </text>
                    )}
                  </g>
                </g>
              </g>
            );
          })}

          <circle
            cx="50"
            cy="50"
            r="50"
            fill="url(#wheelGradient)"
            pointerEvents="none"
          />
        </svg>
      </div>

      <div className="absolute top-[-26px] md:top-[-34px] left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-2xl">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M30 54L52 12H8L30 54Z" fill="#1e293b" />
          <circle
            cx="30"
            cy="12"
            r="3"
            fill="#22c55e"
            className="animate-pulse"
          />
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <button
          onClick={onSpin}
          disabled={isSpinning}
          className="relative w-20 h-20 md:w-36 md:h-36 rounded-full bg-[#22c55e] border-[6px] md:border-[10px] border-white shadow-[0_35px_70px_rgba(34,197,94,0.3),inset_0_2px_10px_rgba(255,255,255,0.2)] flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-100 disabled:cursor-not-allowed group"
        >
          <div className="flex flex-col items-center relative z-10">
            <span className="text-white font-black text-sm md:text-2xl tracking-[0.2em] leading-none group-hover:scale-110 transition-transform text-center">
              SPIN
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

// --- MAIN VOLUNTEER REWARDS ---
const VolunteerRewards = () => {
  const navigate = useNavigate();
  const userStats = {
    totalPoints: 12500,
    currentTier: "Platinum",
    nextTier: "Diamond",
    pointsToNextTier: 2500,
    totalDeliveries: 156,
    treesPlanted: 12,
  };

  // --- Spin Logic ---
  const [isSpinModalOpen, setIsSpinModalOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [isPrizeModalOpen, setIsPrizeModalOpen] = useState(false);

  const prizes: Prize[] = [
    { id: 1, label: "₹1,000", icon: "💰", color: "#f8fafc" },
    { id: 2, label: "₹5,000", icon: "⚡", color: "#f0fdf4" },
    { id: 3, label: "₹2,500", icon: "💎", color: "#ffffff" },
    { id: 4, label: "GRAND PRIZE", icon: "🏆", color: "#0f172a" },
    { id: 5, label: "₹500", icon: "🎁", color: "#f8fafc" },
    { id: 6, label: "₹10,000", icon: "🔥", color: "#f0fdf4" },
    { id: 7, label: "₹1,500", icon: "✨", color: "#ffffff" },
    { id: 8, label: "₹25,000", icon: "🌟", color: "#f0fdf4" },
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWonPrize(null);

    const targetIndex = Math.floor(Math.random() * prizes.length);
    const laps = 8 + Math.floor(Math.random() * 5);
    const segmentAngle = 360 / prizes.length;

    const targetMidpoint = targetIndex * segmentAngle + segmentAngle / 2;
    const rotationRemaining = 360 - (rotation % 360);
    const stopAt = rotation + rotationRemaining + laps * 360 - targetMidpoint;

    setRotation(stopAt);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(prizes[targetIndex]);
      setIsPrizeModalOpen(true);
    }, 5000);
  };

  const prizeReaction = useMemo(() => {
    if (!wonPrize) return "";
    if (wonPrize.label === "GRAND PRIZE")
      return "Wow! You just won the Grand Prize!";
    return `Great! You won ${wonPrize.label}!`;
  }, [wonPrize]);

  // --- Claim Logic ---
  const [isClaimDrawerOpen, setIsClaimDrawerOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [isSubmittingClaim, setIsSubmittingClaim] = useState(false);
  const [showClaimSuccess, setShowClaimSuccess] = useState(false);
  const [pendingClaims, setPendingClaims] = useState<number[]>([]);
  const [selectedPayout, setSelectedPayout] = useState<"bank" | "upi">("bank");
  const [claimDate, setClaimDate] = useState<string | null>(null);
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    mobile: "",
    email: "",
    cityState: "",
    address: "",
  });

  const primaryBank = {
    bankName: "HDFC BANK",
    accountNumber: "**** 1234",
    isPrimary: true,
  };

  const primaryUpi = {
    vpa: "volunteer@okaxis",
    isPrimary: true,
  };

  const handleClaim = (reward: any) => {
    if (pendingClaims.includes(reward.id)) return;
    setSelectedReward(reward);
    // Reset forms
    setClaimDate(null);
    setDeliveryInfo({
      fullName: "",
      mobile: "",
      email: "",
      cityState: "",
      address: "",
    });
    setIsClaimDrawerOpen(true);
  };

  const confirmClaim = () => {
    setIsSubmittingClaim(true);
    setTimeout(() => {
      setIsSubmittingClaim(false);
      setShowClaimSuccess(true);
      setPendingClaims([...pendingClaims, selectedReward.id]);

      setTimeout(() => {
        setIsClaimDrawerOpen(false);
        setShowClaimSuccess(false);
        setSelectedReward(null);
        setClaimDate(null);
        setDeliveryInfo({
          fullName: "",
          mobile: "",
          email: "",
          cityState: "",
          address: "",
        });
      }, 3000);
    }, 2000);
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

  const isFormValid = useMemo(() => {
    if (!selectedReward) return false;
    // Cash rewards only need reward selection
    if (selectedReward.amount) return true;

    // Travel rewards (Tours category)
    const isTravelReward = rewards.tours.some(
      (t) => t.id === selectedReward.id,
    );
    // Gift rewards (Youth/Gifts & Shop category)
    const isGiftReward = rewards.youth.some((y) => y.id === selectedReward.id);

    if (isTravelReward) {
      return (
        !!claimDate &&
        !!deliveryInfo.fullName &&
        !!deliveryInfo.mobile &&
        !!deliveryInfo.email
      );
    }

    if (isGiftReward) {
      return (
        !!deliveryInfo.fullName &&
        !!deliveryInfo.mobile &&
        !!deliveryInfo.email &&
        !!deliveryInfo.cityState &&
        !!deliveryInfo.address
      );
    }

    return true;
  }, [selectedReward, claimDate, deliveryInfo, rewards.tours, rewards.youth]);

  const getCurrentTierIndex = () =>
    tiers.findIndex((t) => t.name === userStats.currentTier);

  return (
    <div
      className="p-6 md:p-10 min-h-screen space-y-10 max-w-[1600px] mx-auto"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Spin Modal */}
      <Modal
        isOpen={isSpinModalOpen}
        onOpenChange={setIsSpinModalOpen}
        placement="center"
        backdrop="blur"
        size="full"
        classNames={{
          backdrop: "bg-slate-950/40 backdrop-blur-2xl",
          base: "bg-transparent shadow-none",
          wrapper: "z-[100]",
          body: "p-0",
          closeButton:
            "z-[110] bg-white/10 hover:bg-white/20 text-white rounded-sm m-4 right-4 left-auto",
        }}
      >
        <ModalContent>
          <ModalBody>
            <div className="flex flex-col items-center justify-center min-h-[500px] md:min-h-[600px] py-10">
              <div className="mb-10 text-center z-20">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  Lucky Spin
                </h2>
                <p className="text-[11px] font-black text-white/70 uppercase tracking-[0.4em] drop-shadow-md">
                  Win prizes for your work
                </p>
              </div>
              <Wheel
                prizes={prizes}
                rotation={rotation}
                isSpinning={isSpinning}
                onSpin={handleSpin}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Prize Reveal Overlay */}
      {wonPrize && (
        <PrizeModal
          isOpen={isPrizeModalOpen}
          prize={wonPrize}
          reaction={prizeReaction}
          onClose={() => setIsPrizeModalOpen(false)}
        />
      )}

      {/* Page Heading & Right-side Cards */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-1.5 text-left">
          <h1
            className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none"
            style={{ color: "var(--text-primary)" }}
          >
            My Rewards
          </h1>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#22c55e]">
            Spend your points here
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Impact Points Card */}
          <div className="flex items-center gap-3.5 bg-white border border-slate-200 p-4 rounded-sm text-left">
            <div className="w-11 h-11 bg-emerald-50 border border-emerald-200 flex items-center justify-center rounded-sm">
              <Star className="text-[#22c55e]" size={22} fill="currentColor" />
            </div>
            <div className="text-start">
              <p className="text-[9px] font-black uppercase tracking-widest mb-1 text-slate-400">
                Reward Points
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-slate-800 tabular-nums leading-none">
                  {userStats.totalPoints.toLocaleString()}
                </span>
                <span className="text-[9px] font-black text-[#22c55e] uppercase">
                  PTS
                </span>
              </div>
            </div>
          </div>

          {/* Payout Vault Card */}
          <div
            className="flex items-center gap-3.5 bg-white border border-slate-200 p-4 rounded-sm text-left hover:border-[#22c55e]/30 transition-all cursor-pointer group"
            onClick={() => navigate("vault")}
          >
            <div className="w-11 h-11 bg-emerald-50 border border-emerald-200 flex items-center justify-center rounded-sm">
              <Building2
                className="text-[#22c55e] group-hover:scale-110 transition-transform"
                size={22}
              />
            </div>
            <div className="text-start">
              <p className="text-[9px] font-black uppercase tracking-widest mb-1 text-slate-400">
                Payout Vault
              </p>
              <div className="flex items-center gap-1">
                <span className="text-xs font-black text-slate-800 uppercase leading-none">
                  Manage Bank
                </span>
                <ChevronRight size={14} className="text-[#22c55e]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tier Progression & Draw Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <section
          className="lg:col-span-3 border border-slate-200 p-8 md:p-10 rounded-sm bg-white"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div className="space-y-1 mb-8 text-left">
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">
              Your Progress
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Unlock new levels to get more
            </p>
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
                      className={`w-12 h-12 flex items-center justify-center border transition-all duration-500 rounded-sm ${
                        isCurrent
                          ? "bg-[#22c55e] border-white ring-4 ring-emerald-50"
                          : isPast
                            ? "border-[#22c55e] bg-emerald-50/30"
                            : "border-slate-200 bg-white"
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
                        <Lock className="text-slate-300" size={16} />
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

          <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-emerald-50/30 rounded-sm border border-emerald-200 border-dashed mt-8">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="p-3 bg-white rounded-sm border border-emerald-100">
                <Zap className="text-[#22c55e]" size={20} />
              </div>
              <div className="text-start">
                <p className="text-xs font-black uppercase tracking-tight text-slate-800">
                  Status: {userStats.currentTier}
                </p>
                <p className="text-[11px] font-semibold text-slate-500 italic leading-none mt-1.5">
                  Only {userStats.pointsToNextTier.toLocaleString()} points away
                  from {userStats.nextTier} perks!
                </p>
              </div>
            </div>
            <ResuableButton
              variant="primary"
              className="px-8 py-3 !rounded-sm text-[11px] font-black uppercase tracking-widest flex items-center gap-2.5"
              onClick={() => navigate("benefits")}
            >
              View Benefits <ChevronRight size={16} />
            </ResuableButton>
          </div>
        </section>

        {/* Vertical Draw Card */}
        <div className="lg:col-span-1 bg-white p-8 md:p-10 rounded-sm flex flex-col items-center justify-between relative overflow-hidden border border-slate-200 text-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16" />

          <div className="relative z-10 w-full space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#22c55e]">
              Weekly Win
            </p>
            <h3 className="text-2xl font-black tracking-tight uppercase leading-none text-slate-900">
              Prize Draw
            </h3>
          </div>

          <div className="relative z-10 py-8 border-y border-slate-50 w-full">
            <p className="text-4xl font-black tabular-nums tracking-tighter text-slate-900">
              ₹50,000
            </p>
            <p className="text-[10px] font-black uppercase text-slate-400 mt-2 tracking-[0.3em]">
              Pool Prize
            </p>
          </div>

          <button
            onClick={() => setIsSpinModalOpen(true)}
            className="relative z-10 w-full py-4 bg-[#22c55e] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-[#1da850] transition-all active:scale-95 shadow-lg shadow-emerald-500/10"
          >
            Enter Now
          </button>
        </div>
      </div>

      {/* Rewards Center */}
      <div className="grid grid-cols-1 gap-12 pt-4">
        <section className="space-y-12 text-left">
          <div className="space-y-2">
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-slate-900">
              Rewards Shop
            </h3>
            <p className="text-[11px] font-black text-[#22c55e] uppercase tracking-[0.5em]">
              Use your points for items below
            </p>
          </div>

          {/* Cash Prizes */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 leading-none">
                Cash Payouts
              </h4>
              <p className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest">
                Money for your account
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rewards.cash.map((c) => (
                <div
                  key={c.id}
                  className="border border-slate-200 p-6 flex items-center justify-between group hover:border-[#22c55e]/30 transition-all rounded-sm bg-white shadow-sm"
                >
                  <div className="text-start">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl font-black text-slate-800 tabular-nums leading-none">
                        {c.amount}
                      </span>
                      <span className="text-[9px] font-black text-[#22c55e] uppercase bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                        Cash
                      </span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {c.name}
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-slate-800 mb-1 uppercase tabular-nums">
                      {c.points.toLocaleString()} PTS
                    </span>
                    {pendingClaims.includes(c.id) ? (
                      <div className="px-4 py-2 bg-emerald-50 text-[#22c55e] text-[8px] font-black uppercase tracking-wider rounded-sm border border-emerald-100 cursor-default flex items-center gap-1.5 translate-y-[-2px]">
                        <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-pulse" />
                        In Vault
                      </div>
                    ) : (
                      <button
                        onClick={() => handleClaim(c)}
                        className="px-6 py-2 bg-[#22c55e] text-white text-[10px] font-black uppercase tracking-widest rounded-sm group-hover:bg-[#1da850] transition-all"
                      >
                        REDEEM
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Rewards */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 leading-none">
                Travel Rewards
              </h4>
              <p className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest">
                Trips and getaways
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rewards.tours.map((t) => (
                <div
                  key={t.id}
                  className={`border border-slate-200 p-6 flex items-center justify-between group hover:border-[#22c55e]/30 transition-all rounded-sm ${
                    !t.available
                      ? "opacity-60 grayscale bg-slate-50/50"
                      : "bg-white shadow-sm"
                  }`}
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <div className="text-start">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xl font-black text-slate-800 uppercase tracking-tight leading-none">
                        {t.name}
                      </span>
                      <span className="text-[9px] font-black text-[#22c55e] uppercase bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                        Trip
                      </span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {t.desc}
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-slate-800 mb-1 uppercase tabular-nums">
                      {t.points.toLocaleString()} PTS
                    </span>
                    {t.available && (
                      <button
                        onClick={() => handleClaim(t)}
                        className="px-6 py-2 bg-[#22c55e] text-white text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-[#1da850] transition-all"
                      >
                        REDEEM
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gifts & Shop */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 leading-none">
                Gifts & Shop
              </h4>
              <p className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest">
                Tech and items
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rewards.youth.map((y) => (
                <div
                  key={y.id}
                  className={`border border-slate-200 p-6 flex items-center justify-between group hover:border-[#22c55e]/30 transition-all rounded-sm ${
                    !y.available
                      ? "opacity-60 grayscale bg-slate-50/50"
                      : "bg-white shadow-sm"
                  }`}
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <div className="text-start">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xl font-black text-slate-800 uppercase tracking-tight leading-none">
                        {y.name}
                      </span>
                      <span className="text-[9px] font-black text-[#22c55e] uppercase bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                        Item
                      </span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {y.desc}
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-slate-800 mb-1 uppercase tabular-nums">
                      {y.points.toLocaleString()} PTS
                    </span>
                    {y.available && (
                      <button
                        onClick={() => handleClaim(y)}
                        className="px-6 py-2 bg-[#22c55e] text-white text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-[#1da850] transition-all"
                      >
                        REDEEM
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Claim Drawer */}
      <ResuableDrawer
        isOpen={isClaimDrawerOpen}
        onClose={() => setIsClaimDrawerOpen(false)}
        title="Confirm Redeem"
      >
        <div className="flex flex-col h-full">
          <div className="p-8 space-y-8 flex-1 overflow-y-auto">
            {selectedReward && (
              <div className="p-6 bg-emerald-50 rounded-sm border border-emerald-100 text-center">
                <p className="text-[10px] font-black text-[#22c55e] uppercase tracking-[0.3em] mb-2">
                  Confirming Payout
                </p>
                <p className="text-4xl font-black text-slate-800 uppercase tracking-tighter mb-1">
                  {selectedReward.amount || selectedReward.name}
                </p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {selectedReward.name}
                </p>
              </div>
            )}

            {selectedReward && selectedReward.amount && (
              <div className="space-y-4">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-800">
                  Payment Details
                </h4>

                <div
                  className={`p-4 border rounded-sm cursor-pointer transition-all ${selectedPayout === "bank" ? "border-[#22c55e] bg-emerald-50/30" : "border-slate-200 hover:border-[#22c55e]/30"}`}
                  onClick={() => setSelectedPayout("bank")}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-sm border ${selectedPayout === "bank" ? "bg-[#22c55e] text-white border-[#22c55e]" : "bg-slate-50 text-slate-400 border-slate-100"}`}
                    >
                      <Building2 size={20} />
                    </div>
                    <div className="text-start">
                      <p className="text-xs font-black text-slate-800 uppercase leading-none">
                        {primaryBank.bankName}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1">
                        {primaryBank.accountNumber}
                      </p>
                    </div>
                    {selectedPayout === "bank" && (
                      <CheckCircle
                        size={18}
                        className="text-[#22c55e] ml-auto"
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`p-4 border rounded-sm cursor-pointer transition-all ${selectedPayout === "upi" ? "border-[#22c55e] bg-emerald-50/30" : "border-slate-200 hover:border-[#22c55e]/30"}`}
                  onClick={() => setSelectedPayout("upi")}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-sm border ${selectedPayout === "upi" ? "bg-[#22c55e] text-white border-[#22c55e]" : "bg-slate-50 text-slate-400 border-slate-100"}`}
                    >
                      <QrCode size={20} />
                    </div>
                    <div className="text-start">
                      <p className="text-xs font-black text-slate-800 uppercase leading-none">
                        UPI Payment
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1">
                        {primaryUpi.vpa}
                      </p>
                    </div>
                    {selectedPayout === "upi" && (
                      <CheckCircle
                        size={18}
                        className="text-[#22c55e] ml-auto"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {selectedReward &&
              rewards.tours.some((t) => t.id === selectedReward.id) && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-800">
                      Preferred Date
                    </h4>
                    <ResuableDatePicker
                      label="Select Travel Date"
                      value={claimDate}
                      onChange={(date) => setClaimDate(date)}
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-800">
                      Contact Information
                    </h4>
                    <div className="space-y-3">
                      <ResuableInput
                        label="Full Name"
                        placeholder="As per Passport/Aadhar"
                        value={deliveryInfo.fullName}
                        onChange={(val) =>
                          setDeliveryInfo({ ...deliveryInfo, fullName: val })
                        }
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <ResuableInput
                          label="Mobile"
                          placeholder="Contact No."
                          value={deliveryInfo.mobile}
                          onChange={(val) =>
                            setDeliveryInfo({ ...deliveryInfo, mobile: val })
                          }
                        />
                        <ResuableInput
                          label="Email"
                          placeholder="For Tickets"
                          type="email"
                          value={deliveryInfo.email}
                          onChange={(val) =>
                            setDeliveryInfo({ ...deliveryInfo, email: val })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {selectedReward &&
              rewards.youth.some((y) => y.id === selectedReward.id) && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-800">
                      Delivery Details
                    </h4>
                    <div className="space-y-3">
                      <ResuableInput
                        label="Recipient Name"
                        placeholder="Full Name"
                        value={deliveryInfo.fullName}
                        onChange={(val) =>
                          setDeliveryInfo({ ...deliveryInfo, fullName: val })
                        }
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <ResuableInput
                          label="Contact Mobile"
                          placeholder="Phone Number"
                          value={deliveryInfo.mobile}
                          onChange={(val) =>
                            setDeliveryInfo({ ...deliveryInfo, mobile: val })
                          }
                        />
                        <ResuableInput
                          label="Email ID"
                          placeholder="For Updates"
                          value={deliveryInfo.email}
                          onChange={(val) =>
                            setDeliveryInfo({ ...deliveryInfo, email: val })
                          }
                        />
                      </div>
                      <ResuableInput
                        label="City & State"
                        placeholder="e.g. Mumbai, Maharashtra"
                        value={deliveryInfo.cityState}
                        onChange={(val) =>
                          setDeliveryInfo({ ...deliveryInfo, cityState: val })
                        }
                      />
                      <ResuableTextarea
                        label="Detailed Address"
                        placeholder="House No, Street, Landmark, Pincode"
                        value={deliveryInfo.address}
                        onChange={(val) =>
                          setDeliveryInfo({ ...deliveryInfo, address: val })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

            <div className="p-4 bg-slate-50 rounded-sm border border-slate-100 flex items-start gap-4">
              <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
              <p className="text-[10px] font-medium text-slate-500 leading-relaxed italic">
                {selectedReward &&
                rewards.tours.some((t) => t.id === selectedReward.id)
                  ? "Our travel desk will contact you within 48 hours of redemption to confirm flight availability and hotel booking details."
                  : selectedReward &&
                      rewards.youth.some((y) => y.id === selectedReward.id)
                    ? "Physical goods are shipped within 3-5 business days. You will receive a tracking link on your registered email and mobile."
                    : "Redemptions are processed within 24-48 hours. You will receive a notification once the amount is credited to your selected vault."}
              </p>
            </div>
          </div>

          <div className="p-8 border-t bg-slate-50/50">
            {showClaimSuccess ? (
              <div className="w-full py-4 bg-[#22c55e] text-white text-[11px] font-black uppercase tracking-widest rounded-sm flex items-center justify-center gap-3">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Done!
              </div>
            ) : (
              <ResuableButton
                variant="primary"
                className="w-full py-4 !rounded-sm text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-[#22c55e]/20"
                onClick={confirmClaim}
                disabled={isSubmittingClaim || !isFormValid}
              >
                {isSubmittingClaim ? "Checking..." : "Redeem Now"}
              </ResuableButton>
            )}
          </div>
        </div>
      </ResuableDrawer>
    </div>
  );
};

export default VolunteerRewards;
