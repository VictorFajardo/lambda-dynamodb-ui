import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const HEADERS = {
  headers: { 'Content-Type': 'application/json' },
};

export type Note = {
  id: string;
  content: string;
  createdAt: string;
};

// Fetch all notes
export const getNotes = async (): Promise<Note[]> => {
  const res = await axios.get(API_BASE_URL, HEADERS);
  return res.data.notes.sort((a: Note, b: Note) => a.createdAt.localeCompare(b.createdAt));
};

// Create a new note
export const createNote = async (content: string): Promise<void> => {
  await axios.post(API_BASE_URL, { content }, HEADERS);
};

// Update a note by ID
export const updateNote = async (id: string, content: string): Promise<void> => {
  await axios.put(`${API_BASE_URL}/${id}`, { content }, HEADERS);
};

// Delete a note by ID
export const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`, HEADERS);
};
