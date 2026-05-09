import axiosInstance from "../../../../global/utils/axios-instance";

export const donorRewardsService = {
  getRewards: async () => {
    try {
      const response = await axiosInstance.get("rewards/");
      return response.data;
    } catch (error) {
      console.error("Error fetching donor rewards:", error);
      throw error;
    }
  },

  getTiers: async () => {
    try {
      const response = await axiosInstance.get("reward-tiers/", {
        params: { role: "DONOR" }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching donor tiers:", error);
      throw error;
    }
  },

  getLuckySpinPrizes: async () => {
    try {
      const response = await axiosInstance.get("lucky-spin-prizes/", {
        params: { role: "DONOR" }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching donor lucky spin prizes:", error);
      throw error;
    }
  },

  getDonorProfile: async () => {
    try {
      const response = await axiosInstance.get("donor-profiles/me/");
      return response.data;
    } catch (error) {
      console.error("Error fetching donor profile:", error);
      throw error;
    }
  },

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
