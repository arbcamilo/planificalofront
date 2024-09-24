// src/Components/Proveedores/proveedoresService.js
import axios from "../../axiosConfig";

export const fetchProveedores = async () => {
  try {
    const response = await axios.get("/admin/Proveedores");
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error fetching proveedores:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching proveedores:", error);
    return [];
  }
};

export const createProveedor = async (newProveedor) => {
  try {
    const response = await axios.post("/admin/Proveedores", newProveedor);
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error creating proveedor:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error creating proveedor:", error);
    return null;
  }
};

export const updateProveedor = async (id, updatedProveedor) => {
  try {
    const response = await axios.put(
      `/admin/Proveedores/${id}`,
      updatedProveedor
    );
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error updating proveedor:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error updating proveedor:", error);
    return null;
  }
};

export const deleteProveedor = async (id) => {
  try {
    const response = await axios.delete(`/admin/Proveedores/${id}`);
    if (response.data.success) {
      return true;
    } else {
      console.error("Error deleting proveedor:", response.data.message);
      return false;
    }
  } catch (error) {
    console.error("Error deleting proveedor:", error);
    return false;
  }
};
