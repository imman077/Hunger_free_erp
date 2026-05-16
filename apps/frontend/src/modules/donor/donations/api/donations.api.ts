import axiosInstance from "../../../../global/utils/axios-instance";

/**
 * Service to handle donation-related API calls.
 */
export const donationService = {
  /**
   * Creates a new donation with multipart data (for image uploads).
   * @param donationFormData FormData containing all fields including 'image'.
   */
  createDonation: async (donationFormData: FormData) => {
    try {
      const response = await axiosInstance.post("donations/", donationFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating donation:", error);
      throw error;
    }
  },

  /**
   * Fetches the current user's donations.
   */
  getMyDonations: async () => {
    try {
      const response = await axiosInstance.get("donations/");
      return response.data;
    } catch (error) {
      console.error("Error fetching donations:", error);
      throw error;
    }
  },

  /**
   * Fetches a specific donation by ID.
   * @param donationId The primary key of the donation.
   */
  getDonationById: async (donationId: number | string) => {
    try {
      const response = await axiosInstance.get(`donations/${donationId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching donation ${donationId}:`, error);
      throw error;
    }
  },
  /**
   * Verifies the pickup OTP for a donation.
   * @param donationId The primary key of the donation.
   * @param otp The 4-digit verification code.
   */
  verifyPickup: async (donationId: number | string, otp: string) => {
    try {
      const response = await axiosInstance.post(`donations/${donationId}/pickup/`, { otp });
      return response.data;
    } catch (error) {
      console.error(`Error verifying pickup for ${donationId}:`, error);
      throw error;
    }
  },
};
