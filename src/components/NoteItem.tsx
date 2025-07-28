import { useState } from 'react';
import { type Note, updateNote, deleteNote } from '../services/api';

interface NoteItemProps {
  note: Note;
  onChange: () => void; // Callback to refresh notes from parent
}

export function NoteItem({ note, onChange }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateNote(note.id, editContent);
      setIsEditing(false);
      onChange();
    } catch (err) {
      setError('Failed to update note');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNote(note.id);
      onChange();
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  return (
    <li className="flex gap-4 border rounded-lg p-3 shadow-sm bg-white dark:bg-gray-800">
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {isEditing ? (
        <>
          <div className="flex flex-col justify-between flex-1">
            <textarea
              className="border rounded p-2 w-full"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <button
              type="button"
              onClick={handleSave}
              className="w-full text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-2 focus:outline-none focus:ring-purple-300 font-medium rounded-md text-xs px-2 py-1 dark:border-purple-500 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-600 dark:focus:ring-purple-800"
              disabled={loading}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="w-full text-gray-700 hover:text-white border border-gray-700 hover:bg-gray-800 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-xs px-2 py-1 dark:border-gray-500 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-between flex-1">
            <p className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
              {note.content}
            </p>
            <small className="text-xs text-gray-500 mt-2">
              {new Date(note.createdAt).toLocaleString()}
            </small>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-md text-xs px-2 py-1 dark:border-green-500 dark:text-green-400 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-md text-xs px-2 py-1 dark:border-red-500 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
