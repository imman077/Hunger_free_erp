import { useNgoStore } from "../../store/ngo-store";

export const useNgoDonations = () => {
  const { data, isLoading, error } = useNgoStore();

  return {
    notifications: data.notifications.filter((n) => n.type === "donation"),
    isLoading,
    error,
  };
};
