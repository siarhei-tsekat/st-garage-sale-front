import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface User {
  username: string;
  jwtToken: string;
}
interface AuthState {
  user: User | null;
  setUser: (userData: User) => void;
}

const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    setUser: (userData) => set({ user: userData }),
  }))
);

export default useAuthStore;
