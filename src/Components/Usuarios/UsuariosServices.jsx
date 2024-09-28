import axios from "../../axiosConfig";

export const fetchUsuarios = async () => {
  try {
    const response = await axios.get("/admin/Usuarios");
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error fetching usuarios:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching usuarios:", error);
    return [];
  }
};

export const createUsuario = async (newUsuario) => {
  try {
    const response = await axios.post("/admin/Usuarios", newUsuario);
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error creating usuario:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error creating usuario:", error);
    return null;
  }
};

export const updateUsuario = async (id, updatedUsuario) => {
  try {
    const response = await axios.put(`/admin/Usuarios/${id}`, updatedUsuario);
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error updating usuario:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error updating usuario:", error);
    return null;
  }
};

export const deleteUsuario = async (id) => {
  try {
    const response = await axios.delete(`/admin/Usuarios/${id}`);
    if (response.data.success) {
      return true;
    } else {
      console.error("Error deleting usuario:", response.data.message);
      return false;
    }
  } catch (error) {
    console.error("Error deleting usuario:", error);
    return false;
  }
};
