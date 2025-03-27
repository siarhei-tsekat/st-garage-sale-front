import { ApiResponse } from ".";
import api from "../api/api";
import useAuthStore from "../store/authStore";

interface CreateProductData {
  productName: string;
  description: string;
  price: string;
  quantity: string;
  images: File[];
}

interface ProductCreatedResponse {
  productId: string;
}

export const createProduct = async (data: CreateProductData): Promise<ApiResponse<ProductCreatedResponse>> => {
  const user = useAuthStore.getState().user;

  const formData = new FormData();
  formData.append("productName", data.productName);
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append("quantity", data.quantity);
  formData.append("specialPrice", "0");

  Array.from(data.images).forEach((file) => {
    formData.append("images", file);
  });

  const response = await api.post<ApiResponse<ProductCreatedResponse>>("/me/product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${user?.jwtToken}`,
    },
  });
  return response.data;
};

interface Product {
  productId: number;
  productName: string;
  images: string[];
  description: string;
  quantity: number;
  price: number;
  discount: number;
  specialPrice: number;
}
interface UserProducts {
  products: Product[];
}

export const getAllUserProducts = async (): Promise<ApiResponse<UserProducts>> => {
  const user = useAuthStore.getState().user;

  const response = await api.get<ApiResponse<UserProducts>>("/me/products", {
    headers: {
      Authorization: `Bearer ${user?.jwtToken}`,
    },
  });

  return response.data;
};

export const deleteProduct = async (productId: number): Promise<void> => {
  const user = useAuthStore.getState().user;
  await api.delete(`/me/product/${productId}`, {
    headers: {
      Authorization: `Bearer ${user?.jwtToken}`,
    },
  });
};
