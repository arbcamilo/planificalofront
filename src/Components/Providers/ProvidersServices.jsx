import axios from "../../axiosConfig";

export const fetchProviders = async () => {
  try {
    const response = await axios.get("/admin/Providers");
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error fetching providers:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching providers:", error);
    return [];
  }
};

export const createProvider = async (newProvider) => {
  try {
    const response = await axios.post("/admin/Providers", newProvider);
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error creating provider:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error creating provider:", error);
    return null;
  }
};

export const updateProvider = async (id, updatedProvider) => {
  try {
    const response = await axios.put(`/admin/Providers/${id}`, updatedProvider);
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error updating provider:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error updating provider:", error);
    return null;
  }
};

export const deleteProvider = async (id) => {
  try {
    const response = await axios.delete(`/admin/Providers/${id}`);
    if (response.data.success) {
      return true;
    } else {
      console.error("Error deleting provider:", response.data.message);
      return false;
    }
  } catch (error) {
    console.error("Error deleting provider:", error);
    return false;
  }
};
