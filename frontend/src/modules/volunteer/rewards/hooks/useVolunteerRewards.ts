import { useVolunteerStore } from "../../store/volunteer-store";

export const useVolunteerRewards = () => {
  const { stats, prizes, rewards, badges, isLoading, error } =
    useVolunteerStore();

  return {
    currentPoints: stats.impactPoints,
    prizes,
    rewards,
    badges,
    isLoading,
    error,
  };
};
