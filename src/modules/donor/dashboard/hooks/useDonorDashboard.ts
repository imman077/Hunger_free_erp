import { useDonorStore } from "../../store/donor-store";

export const useDonorDashboard = () => {
  const { data, isLoading, error } = useDonorStore();

  return {
    currentPoints: data.currentPoints,
    stats: data.stats,
    recentActivities: data.recentActivities,
    isLoading,
    error,
  };
};
