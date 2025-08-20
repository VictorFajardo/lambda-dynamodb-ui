import { useEffect, useState } from 'react';
import { type Note, updateNote, deleteNote } from '../services/api';
import type { User } from 'oidc-client-ts';
import { Loading } from './Loading';

interface NoteItemProps {
  note: Note;
  onChange: (showLoading: boolean) => void;
  user: User;
}

export function NoteItem({ note, onChange, user }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateNote(note.id, editContent, user);
      setIsEditing(false);
      onChange(false);
    } catch (err: unknown) {
      setError(`Failed to update note, error: ${err}`);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteNote(note.id, user);
      onChange(false);
    } catch (err: unknown) {
      setError(`Failed to delete note, error: ${err}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [note.content]);

  return (
    <li className="flex flex-col relative gap-4 border rounded-lg p-3 shadow-sm bg-white dark:bg-gray-800">
      {error && <p className="w-full text-red-600 text-sm">this error</p>}
      <div className="flex flex-row">
        <div className="flex flex-col flex-1 justify-center item-center">
          {loading ? (
            <Loading />
          ) : isEditing ? (
            <textarea
              className="border rounded p-2 w-full"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          ) : (
            <div className="flex flex-col justify-between item-center flex-1">
              <p className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
                {note.content}
              </p>
              <small className="text-xs text-gray-500 mt-2">
                {new Date(note.createdAt).toLocaleString()}
              </small>
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0 ml-4">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="cursor-pointer w-full text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-1 text-center mb-2 dark:border-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || note.content === editContent}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="cursor-pointer w-full text-white bg-gray-700 border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-2 py-1 text-center dark:border-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="cursor-pointer w-full text-white bg-green-700 border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-2 py-1 text-center mb-2 dark:border-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="cursor-pointer w-full text-white bg-red-700 border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-2 py-1 text-center dark:border-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}
