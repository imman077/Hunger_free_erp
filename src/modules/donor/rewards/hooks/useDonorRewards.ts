import { useState } from "react";
import { useDonorStore } from "../../store/donor-store";

export const useDonorRewards = () => {
  const { data, isLoading, error } = useDonorStore();

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<any>(null);

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
