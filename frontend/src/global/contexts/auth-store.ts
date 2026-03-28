import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserProfile {
  role: "ADMIN" | "DONOR" | "NGO" | "VOLUNTEER";
  phone: string | null;
  address: string | null;
}

interface User {
  id: number | string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile: UserProfile;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  // Actions
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      login: (user, accessToken, refreshToken) => {
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
        localStorage.removeItem("auth-storage"); // Clear persistence
      },

      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: "auth-storage", // Key in localStorage
    }
  )
);
