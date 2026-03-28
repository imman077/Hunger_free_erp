import { useDonorStore } from "../../store/donor-store";

export const useDonorDonations = () => {
  const { data, isLoading, error } = useDonorStore();

  return {
    donationHistory: data.donationHistory,
    isLoading,
    error,
    // Add filtering/sorting logic here if needed
  };
};
