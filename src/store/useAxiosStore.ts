import { create, SetState } from "zustand";
import { Person } from "../types";
import axios from "axios";

interface AxiosStore {
  data: Person[] | null;
  getData: () => Promise<void>;
  addPerson: (person: Person) => Promise<void>;
  updatePerson: (person: Person) => Promise<void>;
  deletePerson: (person: Person) => Promise<void>;
}

const url = "https://ant-design-api.vercel.app/";

const useAxiosStore = create<AxiosStore>((set: SetState<AxiosStore>) => ({
  data: null,
  getData: async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.get<Person[]>(`${url}person`, { headers });
      set({ data: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  addPerson: async (person: Person) => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(`${url}add-persons`, person, {
        headers,
      });
      set({ data: response.data });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  },
  updatePerson: async (person: Person) => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(`${url}update-persons`, person, {
        headers,
      });
      set({ data: response.data });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  },
  deletePerson: async (person: Person) => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(`${url}delete-persons`, person, {
        headers,
      });
      set({ data: response.data });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  },
}));

export default useAxiosStore;
