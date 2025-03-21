import { create } from "zustand";
import api from "../api/api";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AuthState {
  status: "idle" | "loading" | "succeeded" | "failed";
  isLoading: boolean;
  error: string | null;
  jwtToken: string | null;
  username: string | null;
  isAuthenticated: boolean;
  isRegistered: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, password: string, email: string) => Promise<void>;
  resetState: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    status: "idle",
    isLoading: false,
    error: null,
    jwtToken: localStorage.getItem("jwt") || null,
    username: localStorage.getItem("username") || null,
    isAuthenticated: localStorage.getItem("isAuthenticated") || false,
    isRegistered: false,
    login: async (username, password) => {

      set({ isLoading: true, error: null, status :"idle" });

        api
        .post("/auth/signin", { username, password })
        .then(response => {
          if(response.status === 200) {
            set({
              username: response.data.username,
              jwtToken: response.data.jwtToken,
              isLoading: false,
              error: null,
              isAuthenticated: true,
              status: "succeeded"
            });
          }
        })
        .catch(error => {
          if (error.response) {            
            set({
              error: error.response.data.message,
              isLoading: false,
              isAuthenticated: false,
              status: "failed"
            });
          } else {
            set({
              error: "Login failed. Please try again.",
              isLoading: false,
              isAuthenticated: false,
              status: "failed"
            });
          }
        })

    
    },
    logout: () => set({ username: null, jwtToken: null, error: null, isLoading: false, isAuthenticated: false, status: "idle" }),
    register: async (username, password, email) => {
      
      set({ isLoading: true, error: null, status:"idle" });

       api
        .post("/auth/signup", { username, password, email })
        .then(response => {
          if (response.status === 200) {
            set({
              isLoading: false,
              error: null,
              isRegistered: true,
              status: 'succeeded'
            });
          }
        })
        .catch(error => {
          if (error.response) { 
            set({
              isLoading: false,
              error: error.response.data.message,
              isRegistered: false,
              status: "failed"
            });
          } else {
            set({
              isLoading: false,
              error: error.message,
              isRegistered: false,
              status: "failed"
            });
          }
        })
    },
    resetState : () => set({
      status: "idle",
      isLoading: false,
      error: null,
    }),
  }))
);

export default useAuthStore;
