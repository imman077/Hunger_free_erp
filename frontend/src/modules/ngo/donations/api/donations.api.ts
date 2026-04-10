import axiosInstance from "../../../../global/utils/axios-instance";

export const ngoDonationsService = {
  /**
   * Fetches all available donations for NGOs to claim.
   */
  getMarketplaceDonations: async () => {
    try {
      const response = await axiosInstance.get("donations/", {
        params: {
          marketplace: "true", 
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching marketplace donations:", error);
      throw error;
    }
  },

  /**
   * Fetches donations already claimed by the current NGO.
   */
  getMyRequests: async () => {
    try {
      const response = await axiosInstance.get("donations/my_requests/");
      return response.data;
    } catch (error) {
      console.error("Error fetching my requests:", error);
      throw error;
    }
  },

  /**
   * NGO accepts/claims a donation.
   */
  acceptDonation: async (donationId: number) => {
    try {
      const response = await axiosInstance.post(`donations/${donationId}/accept/`);
      return response.data;
    } catch (error) {
      console.error(`Error accepting donation ${donationId}:`, error);
      throw error;
    }
  },
  
  /**
   * NGO supports/fulfills another NGO's need.
   */
  supportNeed: async (needId: number, data?: { quantity: number; phone: string }) => {
    try {
      const response = await axiosInstance.post(`needs/${needId}/support/`, data);
      return response.data;
    } catch (error) {
      console.error(`Error supporting need ${needId}:`, error);
      throw error;
    }
  }
};
