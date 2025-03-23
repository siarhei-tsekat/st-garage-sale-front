import { ApiResponse } from ".";
import api from "../api/api";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const registerUser = async (formData: RegisterData): Promise<ApiResponse<String>> => {
  const response = await api.post<ApiResponse<String>>("/auth/signup", formData);
  return response.data;
};

interface LoginData {
  username: string;
  password: string;
}

interface LoginResponse {
  username: string;
  jwtToken: string;
}

export const loginUser = async (formData: LoginData): Promise<ApiResponse<LoginResponse>> => {
  const response = await api.post<ApiResponse<LoginResponse>>("/auth/signin", formData);
  return response.data;
};

