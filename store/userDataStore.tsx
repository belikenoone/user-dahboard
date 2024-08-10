import { create } from "zustand";
import axios from "axios";
import { User } from "@/types/types";

// Zustand store definition
interface UserStore {
  usersData: User[];
  loading: boolean;
  pageNumber: string;
  setPageNumber: (pageNumber: string) => void;
  fetchData: (pageNumber: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  usersData: [],
  loading: true,
  pageNumber: "1",
  setPageNumber: (pageNumber) => set({ pageNumber }),
  fetchData: async (pageNumber) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/users?limit=20&skip=${pageNumber}`
      );
      const data = response.data.users as User[];
      set({ usersData: data });
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
