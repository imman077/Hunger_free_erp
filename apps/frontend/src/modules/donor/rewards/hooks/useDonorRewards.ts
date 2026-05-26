import { useState, useEffect } from "react";
import { useDonorStore } from "../../store/donor-store";
import { donorRewardsService } from "../api/rewards/rewards.api";

export const useDonorRewards = () => {
  const { data, isLoading, error, setDonorData, setLoading, setError } = useDonorStore();

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<any>(null);

  useEffect(() => {
    const fetchDonorData = async () => {
      setLoading(true);
      try {
        const [rewardsRes, _tiersRes, prizesRes, profileRes] = await Promise.all([
          donorRewardsService.getRewards(),
          donorRewardsService.getTiers(),
          donorRewardsService.getLuckySpinPrizes(),
          donorRewardsService.getDonorProfile(),
        ]);

        const donorRewards = rewardsRes.filter((r: any) => r.role === "DONOR");

        setDonorData({
          ...data,
          currentPoints: profileRes.donation_points || 0,
          rewards: donorRewards.map((r: any) => ({
            id: r.id,
            category: r.category,
            name: r.name,
            amount: r.amount,
            points: r.points_required,
            available: r.available,
            desc: r.description
          })),
          prizes: prizesRes.map((p: any) => ({
            id: p.id,
            label: p.label,
            icon: p.icon || "🎁",
            color: p.prize_type === "GRANT" ? "#22c55e" : "var(--bg-secondary)"
          })),
          // We can also sync tiers if needed
        });
      } catch (err) {
        console.error("Failed to fetch donor rewards:", err);
        setError("Could not load rewards data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonorData();
  }, []);

  const handleSpin = (prizes: any[]) => {
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
    }, 5000);
  };

  return {
    currentPoints: data.currentPoints,
    prizes: data.prizes,
    rewards: data.rewards,
    isSpinning,
    rotation,
    wonPrize,
    setWonPrize,
    handleSpin,
    isLoading,
    error,
  };
};
