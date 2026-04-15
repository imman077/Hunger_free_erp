import axiosInstance from "../../../../global/utils/axios-instance";

export const ngoRewardsService = {
  /**
   * Fetches all rewards available for NGOs.
   */
  getRewards: async () => {
    try {
      const response = await axiosInstance.get("rewards/");
      return response.data;
    } catch (error) {
      console.error("Error fetching NGO rewards:", error);
      throw error;
    }
  },

  /**
   * Fetches reward tiers for NGOs.
   */
  getTiers: async () => {
    try {
      const response = await axiosInstance.get("reward-tiers/", {
        params: { role: "NGO" }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching NGO tiers:", error);
      throw error;
    }
  },

  /**
   * Fetches lucky spin prizes for NGOs.
   */
  getLuckySpinPrizes: async () => {
    try {
      const response = await axiosInstance.get("lucky-spin-prizes/", {
        params: { role: "NGO" }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching NGO lucky spin prizes:", error);
      throw error;
    }
  },

  /**
   * Fetches current NGO profile data including points.
   */
  getNGOProfile: async () => {
    try {
      const response = await axiosInstance.get("ngo-profiles/me/");
      return response.data;
    } catch (error) {
      console.error("Error fetching NGO profile:", error);
      throw error;
    }
  },

  /**
   * Claims a reward.
   */
  claimReward: async (rewardId: number, claimDetails: any) => {
    try {
      const response = await axiosInstance.post("reward-claims/", {
        reward: rewardId,
        claim_details: claimDetails
      });
      return response.data;
    } catch (error) {
      console.error("Error claiming reward:", error);
      throw error;
    }
  }
};
