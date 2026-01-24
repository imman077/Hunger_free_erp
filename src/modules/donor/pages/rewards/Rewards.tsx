import React from "react";
import {
  Star,
  Sparkles,
  CheckCircle,
  Lock,
  ChevronRight,
  Plane,
  Gamepad2,
  Smartphone,
  Check as CheckIcon,
  Building2,
  QrCode,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalContent, ModalBody } from "@heroui/react";
import ResuableDrawer from "../../../../global/components/resuable-components/drawer";
import ResuableDatePicker from "../../../../global/components/resuable-components/datepicker";
import ResuableInput from "../../../../global/components/resuable-components/input";
import ResuableTextarea from "../../../../global/components/resuable-components/textarea";

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
            <div className="w-24 h-24 bg-green-50 rounded-sm flex items-center justify-center text-5xl border border-green-200">
              {prize.icon}
            </div>
          </div>

          <h2 className="text-[10px] font-black text-slate-400 tracking-[0.5em] uppercase mb-4">
            Draw Result
          </h2>

          <div className="mb-10">
            <h3
              className={`text-4xl font-black mb-3 tracking-tighter uppercase ${prize.label === "GRAND JACKPOT" ? "text-[#22c55e]" : "text-slate-800"}`}
            >
              {prize.label}
            </h3>
            <p className="text-slate-500 font-medium px-4 leading-relaxed italic">
              "{reaction}"
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-5 bg-green-500 text-white font-black uppercase tracking-[0.2em] rounded-sm hover:bg-green-600 transition-all active:scale-95"
          >
            Collect
          </button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

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
      {/* Premium Outer Frame */}
      <div className="absolute inset-[-12px] md:inset-[-16px] rounded-full border-[12px] md:border-[20px] border-[#0f172a] shadow-[0_45px_90px_-20px_rgba(0,0,0,0.5)] z-10 pointer-events-none"></div>
      <div className="absolute inset-[-12px] md:inset-[-16px] rounded-full border-[2px] border-white/10 z-11 pointer-events-none"></div>

      {/* Spinning Wheel Body */}
      <div
        className="relative w-full h-full rounded-full overflow-hidden transition-transform cubic-bezier(0.15, 0, 0.05, 1)"
        style={{
          transform: `rotate(${rotation}deg)`,
          transitionDuration: isSpinning ? "5s" : "0s",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Defined gradients for depth */}
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

            const isJackpot = prize.label === "GRAND JACKPOT";

            return (
              <g key={prize.id}>
                <path
                  d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                  fill={prize.color}
                  stroke="rgba(0,0,0,0.05)"
                  strokeWidth="0.1"
                />

                {/* Content Group - Rotated to segment center */}
                <g
                  transform={`rotate(${startAngle + segmentAngle / 2}, 50, 50)`}
                >
                  {/* Prize Label at the Outer Rim (Tangential) */}
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

                  {/* "WIN" Label directly under Prize Label */}
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

                  {/* Icon / Treasure Box positioned in the middle of the segment */}
                  <g transform="translate(50, 26)">
                    {isJackpot ? (
                      /* Centered Premium Treasure Box Icon */
                      <g transform="translate(-5, -5)">
                        <path
                          d="M1 3.5C0.44 3.5 0 3.94 0 4.5V7.5C0 8.05 0.44 8.5 1 8.5H9C9.56 8.5 10 8.05 10 7.5V4.5C10 3.94 9.56 3.5 9 3.5H1Z"
                          fill="#ffffff"
                        />
                        <path
                          d="M0 5.2H10V6.2H0V5.2Z"
                          fill="#ffffff"
                          opacity="0.2"
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
                        <path
                          d="M1 1.5C0.44 1.5 0 1.94 0 2.5V4H10V2.5C10 1.94 9.56 1.5 9 1.5H1Z"
                          fill="#ffffff"
                          opacity="0.9"
                        />
                      </g>
                    ) : (
                      <text
                        fontSize="8.5"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {prize.icon}
                      </text>
                    )}
                  </g>
                </g>
              </g>
            );
          })}

          {/* Subtle Overlay for the whole wheel */}
          <circle
            cx="50"
            cy="50"
            r="50"
            fill="url(#wheelGradient)"
            pointerEvents="none"
          />
        </svg>
      </div>

      {/* Modern Pointer (Top Center) */}
      <div className="absolute top-[-26px] md:top-[-34px] left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-2xl">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M30 54L52 12H8L30 54Z" fill="#1e293b" />
          <path d="M30 54L52 12H30V54Z" fill="white" fillOpacity="0.08" />
          <path
            d="M30 48L46 16H14L30 48Z"
            stroke="white"
            strokeOpacity="0.15"
            strokeWidth="0.5"
          />
          {/* Glowing tip */}
          <circle
            cx="30"
            cy="12"
            r="3"
            fill="#22c55e"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Center SPIN Hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <button
          onClick={onSpin}
          disabled={isSpinning}
          className="relative w-20 h-20 md:w-36 md:h-36 rounded-full bg-[#22c55e] border-[6px] md:border-[10px] border-white shadow-[0_35px_70px_rgba(34,197,94,0.3),inset_0_2px_10px_rgba(255,255,255,0.2)] flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-100 disabled:cursor-not-allowed group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none rounded-full"></div>
          <div className="flex flex-col items-center relative z-10">
            <span className="text-white font-black text-sm md:text-2xl tracking-[0.2em] leading-none group-hover:scale-110 transition-transform">
              SPIN
            </span>
          </div>
          {!isSpinning && (
            <div className="absolute inset-[-4px] border-2 border-white/40 rounded-full animate-ping opacity-20"></div>
          )}
        </button>
      </div>
    </div>
  );
};

const DonorRewards = () => {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [showDrawModal, setShowDrawModal] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);

  const prizes: Prize[] = [
    { id: 1, label: "₹1,000", icon: "💰", color: "#ffffff" },
    { id: 2, label: "₹500", icon: "💎", color: "#f0fdf4" },
    { id: 3, label: "₹5,000", icon: "🏆", color: "#ffffff" },
    { id: 4, label: "₹2,500", icon: "🎁", color: "#f0fdf4" },
    { id: 5, label: "₹1,000", icon: "💰", color: "#ffffff" },
    { id: 6, label: "GRAND JACKPOT", icon: "✨", color: "#22c55e" },
    { id: 7, label: "₹500", icon: "💎", color: "#ffffff" },
    { id: 8, label: "₹2,000", icon: "🎁", color: "#f0fdf4" },
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWonPrize(null);

    const targetIndex = Math.floor(Math.random() * prizes.length);
    const laps = 8 + Math.floor(Math.random() * 5);
    const segmentAngle = 360 / prizes.length;

    // We want the wheel to spin clockwise, and the pointer is at the top (angle 0).
    // To land targetIndex under the pointer, we need to rotate the wheel
    // to a point where: (TotalRotation + SegmentMidpoint) % 360 == 0
    const targetMidpoint = targetIndex * segmentAngle + segmentAngle / 2;
    const rotationRemaining = 360 - (rotation % 360);
    const stopAt = rotation + rotationRemaining + laps * 360 - targetMidpoint;

    setRotation(stopAt);

    // Complete spin
    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(prizes[targetIndex]);
    }, 5000);
  };

  // --- Claim Logic ---
  const [isClaimDrawerOpen, setIsClaimDrawerOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [isSubmittingClaim, setIsSubmittingClaim] = useState(false);
  const [showClaimSuccess, setShowClaimSuccess] = useState(false);
  const [pendingClaims, setPendingClaims] = useState<number[]>([]);

  // Mock Primary Payment Methods
  const primaryBank = {
    bankName: "HDFC BANK",
    accountNumber: "**** 4590",
    isPrimary: true,
  };

  const primaryUpi = {
    vpa: "johndoe@okaxis",
    isPrimary: true,
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
    { name: "Bronze", points: "501-1,500", color: "text-green-900" },
    { name: "Silver", points: "1,501-3,500", color: "text-slate-400" },
    { name: "Gold", points: "3,501-7,500", color: "text-green-500" },
    { name: "Platinum", points: "7,501-15,000", color: "text-green-600" },
    { name: "Diamond", points: "15,001-30,000", color: "text-green-700" },
    { name: "Legend", points: "30,001+", color: "text-[#15803d]" },
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

  const [selectedPayout, setSelectedPayout] = useState<"bank" | "upi">("bank");
  const [claimDate, setClaimDate] = useState<string | null>(null);

  // Delivery Form State
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    mobile: "",
    email: "",
    cityState: "",
    address: "",
  });

  const isFormValid = useMemo(() => {
    if (!selectedReward) return false;
    // Cash rewards only need reward selection
    if (selectedReward.amount) return true;

    // Tech rewards (Youth category) don't need a date, only delivery info
    const isTechReward = rewards.youth.some((y) => y.id === selectedReward.id);
    const isTravelReward = rewards.tours.some(
      (t) => t.id === selectedReward.id,
    );

    const dateValid = isTechReward ? true : !!claimDate;
    const contactValid =
      !!deliveryInfo.fullName && !!deliveryInfo.mobile && !!deliveryInfo.email;
    const addressValid = isTravelReward
      ? true
      : !!deliveryInfo.cityState && !!deliveryInfo.address;

    return dateValid && contactValid && addressValid;
  }, [selectedReward, claimDate, deliveryInfo, rewards.youth, rewards.tours]);

  const handleClaim = (reward: any) => {
    if (pendingClaims.includes(reward.id)) return;
    setSelectedReward(reward);
    setIsClaimDrawerOpen(true);
  };

  const confirmClaim = () => {
    setIsSubmittingClaim(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmittingClaim(false);
      setShowClaimSuccess(true);
      setPendingClaims([...pendingClaims, selectedReward.id]);

      // Close drawer after showing animation
      setTimeout(() => {
        setIsClaimDrawerOpen(false);
        setShowClaimSuccess(false);
        setSelectedReward(null);
      }, 3000);
    }, 2000);
  };

  const getCurrentTierIndex = () =>
    tiers.findIndex((t) => t.name === userStats.currentTier);

  return (
    <div
      className="p-6 md:p-10 min-h-screen space-y-10 max-w-[1600px] mx-auto"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Spin Modal */}
      <Modal
        isOpen={showDrawModal}
        onOpenChange={setShowDrawModal}
        size="2xl"
        backdrop="blur"
        placement="center"
        hideCloseButton={isSpinning}
        radius="none"
        classNames={{
          backdrop: "bg-slate-900/40 backdrop-blur-md",
          base: "bg-transparent shadow-none border-none",
          wrapper: "z-[55]",
          body: "p-0",
        }}
      >
        <ModalContent className="bg-transparent shadow-none border-none">
          <ModalBody className="p-0 overflow-visible">
            <div className="flex flex-col items-center justify-center min-h-[500px] md:min-h-[600px] py-10">
              <div className="mb-10 text-center z-20">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  Lucky Spin
                </h2>
                <p className="text-[11px] font-black text-white/70 uppercase tracking-[0.4em] drop-shadow-md">
                  Exclusive Contributor Rewards
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
      <PrizeModal
        isOpen={!!wonPrize && !isSpinning}
        prize={wonPrize || prizes[0]}
        reaction={
          wonPrize?.label === "GRAND JACKPOT"
            ? "INSANE LUCK! You've hit the ultimate reward!"
            : "Amazing! Your contribution brings great rewards."
        }
        onClose={() => {
          setWonPrize(null);
          setShowDrawModal(false);
        }}
      />

      {/* Page Heading & Right-side Cards */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-1.5 text-left">
          <h1
            className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none"
            style={{ color: "var(--text-primary)" }}
          >
            Donor Rewards
          </h1>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-green-500">
            Redeem points for exclusive benefits
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Impact Points Card */}
          <div className="flex items-center gap-3.5 bg-white border border-slate-200 p-4 rounded-sm text-left">
            <div className="w-11 h-11 bg-green-50 border border-green-200 flex items-center justify-center rounded-sm">
              <Star className="text-green-500" size={22} fill="currentColor" />
            </div>
            <div className="text-start">
              <p className="text-[9px] font-black uppercase tracking-widest mb-1 text-slate-400">
                Impact Points
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-slate-800 tabular-nums leading-none">
                  {userStats.totalPoints.toLocaleString()}
                </span>
                <span className="text-[9px] font-black text-green-500 uppercase">
                  PTS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Tier Progression & Monthly Draw Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <section
          className="lg:col-span-3 border border-slate-200 p-8 md:p-10 rounded-sm bg-white"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div className="space-y-1 mb-8 text-left">
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">
              Loyalty Tiers
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Track your progress through the ecosystem
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
                          ? "bg-green-500 border-white ring-4 ring-green-50"
                          : isPast
                            ? "border-green-500 bg-green-50/30"
                            : "border-slate-200 bg-white"
                      }`}
                    >
                      {isPast ? (
                        <CheckCircle className="text-green-500" size={20} />
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
                        isCurrent ? "text-green-500" : "text-slate-400"
                      }`}
                    >
                      {tier.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-green-50/30 rounded-sm border border-green-200 border-dashed mt-8">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="p-3 bg-white rounded-sm border border-green-200">
                <Sparkles className="text-green-500" size={20} />
              </div>
              <div className="text-start">
                <p className="text-xs font-black uppercase tracking-tight text-slate-800">
                  Status: {userStats.currentTier}
                </p>
                <p className="text-[11px] font-semibold text-slate-500 italic leading-none mt-1.5">
                  {userStats.pointsToNextTier.toLocaleString()} points left to{" "}
                  <span className="text-green-700 font-black">Legend</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("benefits")}
              className="px-8 py-3 bg-green-500 text-white text-[11px] font-black uppercase tracking-widest rounded-sm hover:bg-green-600 transition-all flex items-center gap-2.5 active:scale-95"
            >
              View Benefits <ChevronRight size={16} />
            </button>
          </div>
        </section>

        {/* Vertical Monthly Draw Card */}
        <div className="lg:col-span-1 bg-white p-8 md:p-10 rounded-sm flex flex-col items-center justify-between relative overflow-hidden border border-slate-200 text-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -mr-16 -mt-16" />

          <div className="relative z-10 w-full space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-green-500">
              Grand Draw
            </p>
            <h3 className="text-2xl font-black tracking-tight uppercase leading-none text-slate-900">
              Monthly
            </h3>
          </div>

          <div className="relative z-10 py-8 border-y border-slate-50 w-full">
            <p className="text-4xl font-black tabular-nums tracking-tighter text-slate-900">
              12:15:30
            </p>
            <p className="text-[10px] font-black uppercase text-slate-400 mt-2 tracking-[0.3em]">
              Time Remaining
            </p>
          </div>

          <button
            onClick={() => setShowDrawModal(true)}
            className="relative z-10 w-full py-4 bg-green-500 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-green-600 transition-all active:scale-95 shadow-lg shadow-green-500/10"
          >
            Enter Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {/* Rewards Center */}
        <section className="space-y-12">
          <div className="space-y-2 text-left">
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-slate-900">
              Rewards Marketplace
            </h3>
            <p className="text-[11px] font-black text-green-500 uppercase tracking-[0.5em]">
              Redeem your hard-earned impact points
            </p>
          </div>

          {/* Mega Cash Section */}
          <div className="space-y-6">
            <div className="space-y-1 text-left">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 leading-none">
                Mega Cash Rewards
              </h4>
              <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">
                Direct cash prizes for top contributors
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rewards.cash.map((c) => (
                <div
                  key={c.id}
                  className="border border-slate-200 p-6 flex items-center justify-between group hover:border-green-500/30 transition-all rounded-sm bg-white"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <div className="text-start">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl font-black text-slate-800 tabular-nums leading-none">
                        {c.amount}
                      </span>
                      <span className="text-[9px] font-black text-green-600 uppercase bg-green-50 px-2 py-0.5 rounded-sm border border-green-200">
                        Winner
                      </span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {c.name}
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-slate-800 mb-1 uppercase">
                      {c.points} PTS
                    </span>
                    {pendingClaims.includes(c.id) ? (
                      <div className="px-4 py-2 bg-slate-100 text-slate-500 text-[8px] font-black uppercase tracking-wider rounded-sm border border-slate-200 cursor-default flex items-center gap-1.5 translate-y-[-2px]">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                        Pending Review
                      </div>
                    ) : (
                      <button
                        onClick={() => handleClaim(c)}
                        className="px-6 py-2 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-sm group-hover:bg-green-600 transition-all"
                      >
                        Claim
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Global Travel Section */}
          <div className="space-y-6">
            <div className="space-y-1 text-left">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 leading-none">
                Global Travel
              </h4>
              <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest">
                International Expeditions & Retreats
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rewards.tours.map((t) => (
                <div
                  key={t.id}
                  className={`p-6 border border-slate-200 rounded-sm flex items-center justify-between group hover:border-green-500/30 transition-all ${
                    !t.available
                      ? "opacity-60 grayscale bg-slate-50/50"
                      : "bg-white"
                  }`}
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <div className="text-start">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xl font-black text-slate-800 uppercase tracking-tight leading-none">
                        {t.name}
                      </span>
                      {t.available && (
                        <span className="text-[8px] font-black text-green-600 uppercase bg-green-50 px-2 py-0.5 rounded-sm border border-green-200">
                          Exclusive
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {t.desc}
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-slate-800 mb-1 uppercase tabular-nums">
                      {t.points.toLocaleString()} PTS
                    </span>
                    {t.available ? (
                      pendingClaims.includes(t.id) ? (
                        <div className="px-4 py-2 bg-slate-100 text-slate-500 text-[8px] font-black uppercase tracking-wider rounded-sm border border-slate-200 cursor-default flex items-center gap-1.5 translate-y-[-2px]">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                          Pending
                        </div>
                      ) : (
                        <button
                          onClick={() => handleClaim(t)}
                          className="px-6 py-2 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-green-600 transition-all active:scale-95"
                        >
                          Claim
                        </button>
                      )
                    ) : (
                      <div className="px-6 py-2 bg-slate-100 text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-sm border border-slate-200">
                        Locked
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Luxury Tech Section */}
          <div className="space-y-6">
            <div className="space-y-1 text-left">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 leading-none">
                Luxury Tech
              </h4>
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                Premium Hardware & Smart Devices
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rewards.youth.map((y) => (
                <div
                  key={y.id}
                  className={`p-6 border border-slate-200 rounded-sm flex items-center justify-between group hover:border-green-500/30 transition-all ${
                    !y.available
                      ? "opacity-60 grayscale bg-slate-50/50"
                      : "bg-white"
                  }`}
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <div className="text-start">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xl font-black text-slate-800 uppercase tracking-tight leading-none">
                        {y.name}
                      </span>
                      {y.available && (
                        <span className="text-[8px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-sm border border-blue-200">
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {y.desc}
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-slate-800 mb-1 uppercase tabular-nums">
                      {y.points.toLocaleString()} PTS
                    </span>
                    {y.available ? (
                      pendingClaims.includes(y.id) ? (
                        <div className="px-4 py-2 bg-slate-100 text-slate-500 text-[8px] font-black uppercase tracking-wider rounded-sm border border-slate-200 cursor-default flex items-center gap-1.5 translate-y-[-2px]">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                          Pending
                        </div>
                      ) : (
                        <button
                          onClick={() => handleClaim(y)}
                          className="px-6 py-2 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-green-600 transition-all active:scale-95"
                        >
                          Claim
                        </button>
                      )
                    ) : (
                      <div className="px-6 py-2 bg-slate-100 text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-sm border border-slate-200">
                        Locked
                      </div>
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
        onClose={() =>
          !isSubmittingClaim && !showClaimSuccess && setIsClaimDrawerOpen(false)
        }
        title="Confirm Redemption"
        subtitle="Final verification before processing"
        size="md"
      >
        <div className="flex flex-col h-full -mt-4">
          {showClaimSuccess ? (
            <div className="flex-1 flex flex-col items-center justify-center py-10 text-center">
              <div className="w-20 h-20 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                <CheckIcon className="text-green-500" size={40} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-800 mb-2">
                Request Sent!
              </h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest max-w-[200px] leading-relaxed">
                Waiting for admin response...
              </p>

              <div className="mt-8 flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" />
              </div>
            </div>
          ) : (
            <div className="flex-1 space-y-4">
              {/* Reward Summary Card */}
              <div className="bg-[#fbfcff] p-6 rounded-sm border border-slate-200 border-dashed relative overflow-hidden">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                  Reward Details
                </p>
                <div className="flex items-end justify-between">
                  <div className="text-start">
                    <div className="flex items-baseline gap-1">
                      <h4 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                        {selectedReward?.amount ||
                          selectedReward?.name ||
                          "REWARD"}
                      </h4>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2">
                      {selectedReward?.amount
                        ? selectedReward?.name
                        : selectedReward?.desc || "Item Reward"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-900 tabular-nums leading-none">
                      {selectedReward?.points.toLocaleString()}
                    </p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                      PTS
                    </p>
                  </div>
                </div>
              </div>

              {/* Destination/Schedule Selection */}
              {selectedReward?.amount ? (
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                    Payout Destinations
                  </p>

                  {/* Bank UI */}
                  <div
                    onClick={() => setSelectedPayout("bank")}
                    className={`flex items-center gap-4 p-4 border rounded-sm transition-all cursor-pointer ${
                      selectedPayout === "bank"
                        ? "bg-white border-green-500 shadow-sm"
                        : "bg-slate-50/50 border-slate-200 grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 border flex items-center justify-center rounded-lg shrink-0 transition-all ${
                        selectedPayout === "bank"
                          ? "bg-sky-50 border-sky-100"
                          : "bg-slate-100 border-slate-200"
                      }`}
                    >
                      <Building2
                        className={
                          selectedPayout === "bank"
                            ? "text-sky-400"
                            : "text-slate-400"
                        }
                        size={20}
                      />
                    </div>
                    <div className="flex-1 text-start">
                      <div className="flex items-center gap-2">
                        <p className="text-[11px] font-black text-slate-900 uppercase">
                          {primaryBank.bankName}
                        </p>
                        <span className="text-[8px] font-black bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">
                          PRIMARY
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {primaryBank.accountNumber}
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedPayout === "bank"
                          ? "border-green-500"
                          : "border-slate-300"
                      }`}
                    >
                      {selectedPayout === "bank" && (
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                      )}
                    </div>
                  </div>

                  {/* VPA UI */}
                  <div
                    onClick={() => setSelectedPayout("upi")}
                    className={`flex items-center gap-4 p-4 border rounded-sm transition-all cursor-pointer ${
                      selectedPayout === "upi"
                        ? "bg-white border-green-500 shadow-sm"
                        : "bg-slate-50/50 border-slate-200 grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 border flex items-center justify-center rounded-lg shrink-0 transition-all ${
                        selectedPayout === "upi"
                          ? "bg-green-50 border-green-100"
                          : "bg-slate-100 border-slate-200"
                      }`}
                    >
                      <QrCode
                        className={
                          selectedPayout === "upi"
                            ? "text-green-500"
                            : "text-slate-400"
                        }
                        size={20}
                      />
                    </div>
                    <div className="flex-1 text-start">
                      <div className="flex items-center gap-2">
                        <p className="text-[11px] font-black text-slate-900 uppercase">
                          UPI Identity
                        </p>
                        <span className="text-[8px] font-black bg-green-50 text-green-500 px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">
                          SECURE
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {primaryUpi.vpa}
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedPayout === "upi"
                          ? "border-green-500"
                          : "border-slate-300"
                      }`}
                    >
                      {selectedPayout === "upi" && (
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {!rewards.youth.some((y) => y.id === selectedReward?.id) && (
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                        Scheduling & Availability
                      </p>
                      <div className="w-full">
                        <ResuableDatePicker
                          label="Preferred Date"
                          value={claimDate}
                          onChange={setClaimDate}
                          align="left"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                      {rewards.tours.some((t) => t.id === selectedReward?.id)
                        ? "Contact Information"
                        : "Delivery Details"}
                    </p>
                    <div className="space-y-3">
                      <ResuableInput
                        label="Full Name"
                        value={deliveryInfo.fullName}
                        onChange={(v) =>
                          setDeliveryInfo({ ...deliveryInfo, fullName: v })
                        }
                        placeholder="Your Legal Name"
                        required
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <ResuableInput
                          label="Mobile Number"
                          value={deliveryInfo.mobile}
                          onChange={(v) =>
                            setDeliveryInfo({ ...deliveryInfo, mobile: v })
                          }
                          placeholder="+91"
                          required
                        />
                        <ResuableInput
                          label="Email Address"
                          value={deliveryInfo.email}
                          onChange={(v) =>
                            setDeliveryInfo({ ...deliveryInfo, email: v })
                          }
                          placeholder="email@example.com"
                          required
                        />
                      </div>
                      {!rewards.tours.some(
                        (t) => t.id === selectedReward?.id,
                      ) && (
                        <>
                          <ResuableInput
                            label="City & State"
                            value={deliveryInfo.cityState}
                            onChange={(v) =>
                              setDeliveryInfo({ ...deliveryInfo, cityState: v })
                            }
                            placeholder="e.g. Chennai, Tamil Nadu"
                            required
                          />
                          <ResuableTextarea
                            label="Detailed Address"
                            value={deliveryInfo.address}
                            onChange={(v) =>
                              setDeliveryInfo({ ...deliveryInfo, address: v })
                            }
                            placeholder="House No, Street, Landmark etc."
                            required
                            rows={3}
                          />
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed text-start">
                      Our team will reach out within 24 hours to finalize your{" "}
                      <span className="text-slate-900 font-black">
                        {selectedReward?.name}
                      </span>{" "}
                      order.
                    </p>
                  </div>
                </div>
              )}

              {/* Verification Steps */}
              <div className="space-y-2">
                <div className="flex items-start gap-4 p-3 border border-slate-100 rounded-sm bg-blue-50/10">
                  <div className="w-8 h-8 rounded-sm bg-blue-50 flex items-center justify-center shrink-0">
                    <Star className="text-blue-500" size={16} />
                  </div>
                  <div className="text-start">
                    <p className="text-[10px] font-black text-slate-800 uppercase">
                      Instant Point Deduction
                    </p>
                    <p className="text-[9px] text-slate-500 font-medium">
                      Points will be locked until the request is approved.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 border border-slate-100 rounded-sm bg-amber-50/10">
                  <div className="w-8 h-8 rounded-sm bg-amber-50 flex items-center justify-center shrink-0">
                    <Lock className="text-amber-500" size={16} />
                  </div>
                  <div className="text-start">
                    <p className="text-[10px] font-black text-slate-800 uppercase">
                      Verification Step
                    </p>
                    <p className="text-[9px] text-slate-500 font-medium">
                      Admins will verify eligibility within 24-48 hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  onClick={confirmClaim}
                  disabled={isSubmittingClaim || !isFormValid}
                  className="w-full py-4 bg-[#22c55e] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-sm hover:opacity-90 transition-all active:scale-95 disabled:grayscale disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl shadow-green-500/10"
                >
                  {isSubmittingClaim ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm & Claim"
                  )}
                </button>
                <p className="text-[9px] text-center text-slate-400 font-black uppercase tracking-widest mt-3">
                  By confirming, you agree to our reward terms.
                </p>
              </div>
            </div>
          )}
        </div>
      </ResuableDrawer>
    </div>
  );
};

export default DonorRewards;
