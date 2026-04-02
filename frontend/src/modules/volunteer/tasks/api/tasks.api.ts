import axiosInstance from "../../../../global/utils/axios-instance";

export const volunteerTasksService = {
  /**
   * Fetches donations that are accepted by an NGO but need a volunteer for pickup.
   */
  getNearbyPickups: async () => {
    try {
      const response = await axiosInstance.get("donations/", {
        params: {
          status: "ASSIGNED", // Accepted by NGO, awaiting volunteer
          assigned_volunteer: "null", // Placeholder for "none assigned"
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching nearby pickups:", error);
      throw error;
    }
  },

  /**
   * Volunteer accepts a pickup task.
   */
  acceptPickup: async (donationId: number) => {
    try {
      const response = await axiosInstance.post(`donations/${donationId}/volunteer_accept/`);
      return response.data;
    } catch (error) {
      console.error(`Error accepting pickup ${donationId}:`, error);
      throw error;
    }
  },

  /**
   * Fetches tasks currently assigned to the volunteer.
   */
  getMyTasks: async () => {
    try {
      const response = await axiosInstance.get("donations/my_tasks/");
      return response.data;
    } catch (error) {
      console.error("Error fetching my tasks:", error);
      throw error;
    }
  },

  /**
   * Marks a donation as picked up.
   */
  markAsPickedUp: async (donationId: number) => {
      try {
          const response = await axiosInstance.post(`donations/${donationId}/pickup/`);
          return response.data;
      } catch (error) {
          console.error(`Error marking as picked up ${donationId}:`, error);
          throw error;
      }
  }
};
