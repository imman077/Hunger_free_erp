import { useEffect, useState } from "react";
import { useDonorStore } from "../../store/donor-store";
import { ngoNeedsService } from "../api/needs.api";

export const useDonorDashboard = () => {
  const { data, isLoading, error } = useDonorStore();
  const [urgentNeedsCount, setUrgentNeedsCount] = useState(0);

  useEffect(() => {
    const fetchUrgentCount = async () => {
      try {
        const needs = await ngoNeedsService.getNeeds();
        const highPriorityCount = needs.filter((n: any) => n.urgency === "High").length;
        setUrgentNeedsCount(highPriorityCount);
      } catch (err) {
        console.error("Failed to fetch urgent needs count", err);
      }
    };

    const loadData = async () => {
      await useDonorStore.getState().refreshData();
    };

    loadData();
    fetchUrgentCount();
  }, []);

  return {
    currentPoints: data.currentPoints,
    stats: data.stats,
    recentActivities: data.recentActivities,
    profile: data.profile,
    urgentNeedsCount,
    isLoading,
    error,
  };
};
