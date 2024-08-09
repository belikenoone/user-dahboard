import { create } from "zustand";
import axios from "axios";

// Interfaces (as previously defined)
interface Coordinates {
  lat: number;
  lng: number;
}

interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

interface Hair {
  color: string;
  type: string;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: string;
}

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
  loading: false,
  pageNumber: "1",
  setPageNumber: (pageNumber) => set({ pageNumber }),
  fetchData: async (pageNumber) => {
    set({ loading: true });
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
