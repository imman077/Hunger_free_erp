import { useNgoStore } from "../../store/ngo-store";

export const useNgoRewards = () => {
  const { data, isLoading, error } = useNgoStore();

  return {
    prizes: data.prizes,
    rewards: data.rewards,
    currentPoints: data.currentPoints,
    isLoading,
    error,
  };
};
