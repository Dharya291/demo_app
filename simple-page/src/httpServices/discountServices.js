import axios from "axios";

const API_URL = "http://localhost:3000/api/discount";

export const getAllDiscounts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching discounts:", error);
    throw error;
  }
};

export const getDiscountById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching particular discount:", error);
    throw error;
  }
};
export const editDiscount = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error updating discount:", error);
    throw error;
  }
};
export const deleteDiscount = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting discount:", error);
    throw error;
  }
};

export const createDiscount = async (discountObject) => {
  try {
    const response = await axios.post(
      `${API_URL}/createDiscount`,
      discountObject
    );
    return response;
  } catch (error) {
    console.error("Error deleting discount:", error);
    throw error;
  }
};
