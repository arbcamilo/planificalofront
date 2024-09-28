import axios from "../../axiosConfig";

export const fetchGuests = async () => {
  try {
    const response = await axios.get("/admin/Guests");
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error fetching guests:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching guests:", error);
    return [];
  }
};

export const createGuest = async (newGuest) => {
  try {
    const response = await axios.post("/admin/Guests", newGuest);
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error creating guest:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error creating guest:", error);
    return null;
  }
};

export const updateGuest = async (id, updatedGuest) => {
  try {
    const response = await axios.put(`/admin/Guests/${id}`, updatedGuest);
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error updating guest:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error updating guest:", error);
    return null;
  }
};

export const deleteGuest = async (id) => {
  try {
    const response = await axios.delete(`/admin/Guests/${id}`);
    if (response.data.success) {
      return true;
    } else {
      console.error("Error deleting guest:", response.data.message);
      return false;
    }
  } catch (error) {
    console.error("Error deleting guest:", error);
    return false;
  }
};
