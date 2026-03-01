import { useDashboardStore } from "../store/dashboard-store";

export const useDashboard = () => {
  const { data } = useDashboardStore();
  const { stats } = data;

  return {
    stats,
  };
};
