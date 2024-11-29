import axios from "../../axiosConfig";

export const fetchServices = async () => {
  try {
    const response = await axios.get("/admin/ServiceProviders");
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error fetching services:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

export const getServices = async () => {
  try {
    const response = await axios.get("/admin/Services");
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error fetching services:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

export const createService = async (newService) => {
  try {
    const response = await axios.post("/admin/ServiceProviders", newService);
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error creating service:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error creating service:", error);
    return null;
  }
};

export const updateService = async (id, updatedService) => {
  try {
    const response = await axios.put(
      `/admin/ServiceProviders/${id}`,
      updatedService
    );
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error updating service:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error updating service:", error);
    return null;
  }
};

export const deleteService = async (id) => {
  try {
    const response = await axios.delete(`/admin/ServiceProviders/${id}`);
    if (response.data.success) {
      return true;
    } else {
      console.error("Error deleting service:", response.data.message);
      return false;
    }
  } catch (error) {
    console.error("Error deleting service:", error);
    return false;
  }
};

export const getServiceProvider = async (documentNumber) => {
  try {
    const response = await axios.get(
      `/admin/ServiceProviders/ByDocumentNumber/${documentNumber}`
    );
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error fetching service provider:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching service provider:", error);
    return null;
  }
};
