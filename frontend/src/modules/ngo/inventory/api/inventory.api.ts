import axiosInstance from "../../../../global/utils/axios-instance";

export const ngoInventoryService = {
  /**
   * Fetches the current NGO's inventory.
   */
  getInventory: async () => {
    try {
      const response = await axiosInstance.get("inventory/");
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory:", error);
      throw error;
    }
  },

  /**
   * Adds a new item to the NGO's inventory.
   */
  addItem: async (itemData: any) => {
    try {
      const response = await axiosInstance.post("inventory/", itemData);
      return response.data;
    } catch (error) {
      console.error("Error adding inventory item:", error);
      throw error;
    }
  },

  /**
   * Updates an existing inventory item.
   */
  updateItem: async (itemId: number, itemData: any) => {
    try {
      const response = await axiosInstance.patch(`inventory/${itemId}/`, itemData);
      return response.data;
    } catch (error) {
      console.error(`Error updating inventory item ${itemId}:`, error);
      throw error;
    }
  },

  /**
   * Deletes an inventory item.
   */
  deleteItem: async (itemId: number) => {
    try {
      const response = await axiosInstance.delete(`inventory/${itemId}/`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting inventory item ${itemId}:`, error);
      throw error;
    }
  }
};
