import { useState } from 'react';
import { createNote } from '../services/api';
import type { User } from 'oidc-client-ts';

interface AddNoteProps {
  onChange: () => void;
  onError: (message: string) => void;
  user: User;
}

export function AddNote({ onChange, onError, user }: AddNoteProps) {
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      setLoading(true);
      await createNote(newNote, user);
      setNewNote('');
      onChange();
    } catch (err: unknown) {
      onError(`Failed to create note, error: ${err}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleCreate} className="mb-4">
      <input
        type="text"
        placeholder="Write a note..."
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        className="border p-2 w-full mb-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!user}
      />
      <button
        type="submit"
        className="cursor-pointer text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2 dark:border-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading || !user}
      >
        {loading ? 'Saving...' : 'Add Note'}
      </button>
    </form>
  );
}
