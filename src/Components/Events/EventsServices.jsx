import axios from "../../axiosConfig";

export const fetchEvents = async () => {
  try {
    const response = await axios.get("/admin/Events/GetAll");
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error fetching events:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const fetchEventsId = async (id) => {
  try {
    const response = await axios.get(`/admin/Events/${id}`);
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error fetching events:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const createEvent = async (newEvent) => {
  try {
    const response = await axios.post("/admin/Events", newEvent);
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error creating event:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error creating event:", error);
    return null;
  }
};

export const updateEvent = async (id, updatedEvent) => {
  try {
    const response = await axios.put(`/admin/Events/${id}`, updatedEvent);
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error updating event:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error updating event:", error);
    return null;
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(`/admin/Events/${id}`);
    if (response.data.success) {
      return true;
    } else {
      console.error("Error deleting event:", response.data.message);
      return false;
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    return false;
  }
};

export const getProductsProvider = async () => {
  try {
    const response = await axios.get("/admin/ProductProviders");
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error fetching product providers:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching product providers:", error);
    return [];
  }
};

export const getServicesProvider = async () => {
  try {
    const response = await axios.get("/admin/ServiceProviders");
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error fetching service providers:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching service providers:", error);
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


export const getProducts = async () => {
  try {
    const response = await axios.get("/admin/Products");
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error fetching products:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProviders = async () => {
  try {
    const response = await axios.get("/admin/Users/GetAll");
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

export const getEventById = async (id) => {
  try {
    const response = await axios.get(`/admin/Events/GetById/${id}`);
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error fetching event by id:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching event by id:", error);
    return null;
  }
};