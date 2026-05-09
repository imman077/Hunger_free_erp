import { useDonorStore } from "../../store/donor-store";
import { donationService } from "../api/donations.api";

export const useDonorDonations = () => {
  const { data, isLoading, error, refreshData } = useDonorStore();

  const handleVerifyPickup = async (donationId: number | string, otp: string) => {
    try {
      await donationService.verifyPickup(donationId, otp);
      await refreshData(); // Refresh the list after verification
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  return {
    donationHistory: data.donationHistory,
    isLoading,
    error,
    verifyPickup: handleVerifyPickup,
    refreshData
  };
};
