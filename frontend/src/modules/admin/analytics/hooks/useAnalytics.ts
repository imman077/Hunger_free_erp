import { useAnalyticsStore } from "../store/analytics-store";

export const useAnalytics = () => {
  const { impactMetrics, donationTrends, categoryData } = useAnalyticsStore();

  return {
    impactMetrics,
    donationTrends,
    categoryData,
    // Add additional derived metrics or helper functions if needed
    totalDonations:
      impactMetrics.find((m) => m.label === "Total Donations")?.val || "0",
    totalNGOs:
      impactMetrics.find((m) => m.label === "Partner NGOs")?.val || "0",
    totalVolunteers:
      impactMetrics.find((m) => m.label === "Active Volunteers")?.val || "0",
  };
};
