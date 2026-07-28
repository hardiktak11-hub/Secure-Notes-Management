import api from "./api";

// Get all notes
export const getNotes = async (
  search = "",
  sort = "newest",
  page = 1,
  limit = 10
) => {
  const response = await api.get("/notes", {
    params: {
      search,
      sort,
      page,
      limit,
    },
  });

  return response.data;
};

// Create a new note
export const createNote = async (noteData) => {
  const response = await api.post("/notes", noteData);
  return response.data;
};

// Get a single note
export const getNoteById = async (id) => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

// Update a note
export const updateNote = async (id, noteData) => {
  const response = await api.put(`/notes/${id}`, noteData);
  return response.data;
};

// Delete a note
export const deleteNote = async (id) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};

// Pin / Unpin a note
export const pinUnpinNote = async (id) => {
  const response = await api.patch(`/notes/${id}/pin`);
  return response.data;
};