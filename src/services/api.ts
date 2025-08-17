/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Generate headers dynamically using the auth user token
const getHeaders = (authUser?: any) => ({
  headers: {
    'Content-Type': 'application/json',
    ...(authUser?.access_token ? { Authorization: `Bearer ${authUser.id_token}` } : {}),
  },
  withCredentials: true,
});

export type Note = {
  id: string;
  content: string;
  createdAt: string;
};

// Fetch all notes
export const getNotes = async (authUser?: any): Promise<Note[]> => {
  console.log('✨', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authUser.id_token}`,
    },
    withCredentials: true, // <- here, NOT in headers
  });
  const res = await axios.get(API_BASE_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authUser.id_token}`,
    },
    withCredentials: true, // <- here, NOT in headers
  });
  return res.data.notes.sort((a: Note, b: Note) => a.createdAt.localeCompare(b.createdAt));
};

// Create a new note
export const createNote = async (content: string, authUser?: any): Promise<void> => {
  await axios.post(API_BASE_URL, { content }, { ...getHeaders(authUser), withCredentials: true });
};

// Update a note by ID
export const updateNote = async (id: string, content: string, authUser?: any): Promise<void> => {
  await axios.put(
    `${API_BASE_URL}/${id}`,
    { content },
    { ...getHeaders(authUser), withCredentials: true }
  );
};

// Delete a note by ID
export const deleteNote = async (id: string, authUser?: any): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`, { ...getHeaders(authUser), withCredentials: true });
};
