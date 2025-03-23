import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { loginUser, registerUser } from "./authService";
import { ApiResponse } from ".";

export const useRegisterUser = (onSuccessCallback: () => void) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success("User created. Redirecting to login page");
      setTimeout(() => navigate("/login"), 1000);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error: AxiosError<ApiResponse<String>>) => {
      console.log(error);
      toast.error(error?.response?.data?.error?.message || "Registration failed");
    },
  });
};

export const useLoginUser = (onSuccessCallback: () => void) => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser({ username: data.payload.username, jwtToken: data.payload.jwtToken });
      toast.success("Login successfull.");
      setTimeout(() => navigate("/me/products"), 1000);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error: AxiosError<ApiResponse<String>>) => {
      console.log(error);
      toast.error(error?.response?.data?.error?.message || "Login failed");
    },
  });
};
