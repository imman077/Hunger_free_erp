import axiosInstance from "../../../../global/utils/axios-instance";

export const ngoNeedsService = {
  /**
   * Fetches all active NGO needs.
   */
  getNeeds: async () => {
    try {
      const response = await axiosInstance.get("needs/", {
        params: {
          status: "Open", // Only show open requests
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching NGO needs:", error);
      throw error;
    }
  },

  /**
   * Fetches a specific NGO need by ID.
   */
  getNeedById: async (needId: string | number) => {
    try {
      const response = await axiosInstance.get(`needs/${needId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching NGO need ${needId}:`, error);
      throw error;
    }
  }
};
