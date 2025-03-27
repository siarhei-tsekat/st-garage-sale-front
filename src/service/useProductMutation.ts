import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { ApiResponse } from ".";
import { createProduct, getAllUserProducts } from "./productservice";

export const useCreateProduct = (onSuccessCallback: () => void) => {
  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      // setUser({ username: data.payload.username, jwtToken: data.payload.jwtToken });
      toast.success("Product created.");
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

export const useAllUseProducts = () => {
    return useQuery({
      queryKey: ["useProducts"],
      queryFn: async () => {
       
          return (await getAllUserProducts()).payload.products;
        
      },
      enabled: false
    });
};
  
