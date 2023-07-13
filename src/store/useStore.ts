import { create } from "zustand";
import { Person } from "../types";
import axios from "axios";

interface State {
  persons: Person[];
  getData: () => Promise<void>;
  addPerson: (person: Person) => Promise<void>;
  updatePerson: (person: Person) => Promise<void>;
  deletePerson: (person: Person) => Promise<void>;
}

const url = "http://localhost:5000/";

export const useStore = create<State>((set) => ({
  persons: [],
  getData: async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.get<Person[]>(`${url}person`, { headers });
      set({ persons: response.data });
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
      set({ persons: response.data });
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
      set({ persons: response.data });
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
      set({ persons: response.data });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  },
}));
