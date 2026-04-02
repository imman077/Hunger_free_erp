import axiosInstance from "../../../../global/utils/axios-instance";

export const ngoNeedsService = {
  /**
   * Posts a new NGO need.
   */
  postNeed: async (needData: any) => {
    try {
      const response = await axiosInstance.post("needs/", needData);
      return response.data;
    } catch (error) {
      console.error("Error posting NGO need:", error);
      throw error;
    }
  },

  /**
   * Fetches all needs posted by the current NGO.
   */
  getMyNeeds: async () => {
    try {
      const response = await axiosInstance.get("needs/");
      return response.data;
    } catch (error) {
      console.error("Error fetching NGO needs:", error);
      throw error;
    }
  }
};
