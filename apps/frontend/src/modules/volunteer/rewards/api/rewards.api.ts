import axiosInstance from "../../../../global/utils/axios-instance";

export const volunteerRewardsService = {
  getRewards: async () => {
    try {
      const response = await axiosInstance.get("rewards/");
      return response.data;
    } catch (error) {
      console.error("Error fetching volunteer rewards:", error);
      throw error;
    }
  },

  getTiers: async () => {
    try {
      const response = await axiosInstance.get("reward-tiers/", {
        params: { role: "VOLUNTEER" }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching volunteer tiers:", error);
      throw error;
    }
  },

  getLuckySpinPrizes: async () => {
    try {
      const response = await axiosInstance.get("lucky-spin-prizes/", {
        params: { role: "VOLUNTEER" }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching volunteer lucky spin prizes:", error);
      throw error;
    }
  },

  getVolunteerProfile: async () => {
    try {
      const response = await axiosInstance.get("volunteer-profiles/me/");
      return response.data;
    } catch (error) {
      console.error("Error fetching volunteer profile:", error);
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
