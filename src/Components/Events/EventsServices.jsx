import axios from "../../axiosConfig";

export const fetchEvents = async () => {
  try {
    const response = await axios.get("/admin/Events");
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
