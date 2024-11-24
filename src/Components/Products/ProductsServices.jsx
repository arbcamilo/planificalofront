import axios from "../../axiosConfig";

export const fetchProducts = async () => {
  try {
    const response = await axios.get("/admin/ProductProviders");
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

export const createProduct = async (newProduct) => {
  try {
    const response = await axios.post("/admin/ProductProviders", newProduct);
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error creating product:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await axios.put(`/admin/ProductProviders/${id}`, updatedProduct);
    if (response.data.success) {
      return response.data.entity;
    } else {
      console.error("Error updating product:", response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/admin/ProductProviders/${id}`);
    if (response.data.success) {
      return true;
    } else {
      console.error("Error deleting product:", response.data.message);
      return false;
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
};
