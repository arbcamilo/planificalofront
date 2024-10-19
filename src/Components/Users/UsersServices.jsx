import axios from "../../axiosConfig";

export const fetchUsers = async () => {
  try {
    const response = await axios.get("/admin/Users/GetAll");
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error fetching users:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const createUser = async (newUser) => {
  try {
    const response = await axios.post("/admin/Users", newUser);
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error creating user:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

export const updateUser = async (id, updatedUser) => {
  try {
    const response = await axios.put(`/admin/Users/${id}`, updatedUser);
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error updating user:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`/admin/Users/${id}`);
    if (response.data.success) {
      return true;
    } else {
      console.error("Error deleting user:", response.data.message);
      return false;
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};
