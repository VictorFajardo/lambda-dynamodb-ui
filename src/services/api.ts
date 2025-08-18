import axios from 'axios';
import type { User } from 'oidc-client-ts';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const REQUIRE_AUTH = import.meta.env.VITE_REQUIRE_AUTH === 'true';

const setConfig = (authUser?: User) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (REQUIRE_AUTH && authUser?.id_token) {
    headers['Authorization'] = `Bearer ${authUser.id_token}`;
  }

  return {
    headers,
    withCredentials: true,
  };
};

export type Note = {
  id: string;
  content: string;
  createdAt: string;
};

// Fetch all notes
export const getNotes = async (authUser?: User): Promise<Note[]> => {
  const res = await axios.get(API_BASE_URL, setConfig(authUser));
  return res.data.notes.sort((a: Note, b: Note) => a.createdAt.localeCompare(b.createdAt));
};

// Create a new note
export const createNote = async (content: string, authUser?: User): Promise<void> => {
  await axios.post(API_BASE_URL, { content }, setConfig(authUser));
};

// Update a note by ID
export const updateNote = async (id: string, content: string, authUser?: User): Promise<void> => {
  await axios.put(`${API_BASE_URL}/${id}`, { content }, setConfig(authUser));
};

// Delete a note by ID
export const deleteNote = async (id: string, authUser?: User): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`, setConfig(authUser));
};
