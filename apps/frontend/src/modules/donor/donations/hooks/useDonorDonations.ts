import { useMutation } from "@apollo/client";
import { useDonorStore } from "../../store/donor-store";
import { VERIFY_PICKUP } from "../api/donations.graphql";

export const useDonorDonations = () => {
  const { data, donationStats, isLoading, error, refreshData } = useDonorStore();
  const [verifyPickupMutation] = useMutation(VERIFY_PICKUP);

  const handleVerifyPickup = async (donationId: string, otp: string) => {
    try {
      await verifyPickupMutation({
        variables: { id: donationId, otp },
      });
      await refreshData(); // Refresh the list after verification
      return { success: true };
    } catch (error) {
      console.error("Verification Error:", error);
      return { success: false, error };
    }
  };

  return {
    donationHistory: data.donationHistory,
    donationStats,
    isLoading,
    error,
    verifyPickup: handleVerifyPickup,
    refreshData
  };
};
