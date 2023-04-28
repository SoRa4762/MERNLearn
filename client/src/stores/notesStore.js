import { create } from "zustand";
import axios from "axios";

const notesStore = create((set) => ({
  notes: null,
  fetchNotes: async () => {
    const res = await axios.get("http://localhost:5000/notes");
    set({ notes: res.data.notes });
    // setNotes(res.data.notes);
  },
}));

export default notesStore;
