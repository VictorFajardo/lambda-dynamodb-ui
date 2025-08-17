import { useCallback, useEffect, useState } from 'react';
import { getNotes } from './services/api';
import type { Note } from './services/api';
import { NoteItem } from './components/NoteItem';
import { AddNote } from './components/AddNote';
import { Loading } from './components/Loading';
import LoginButton from './components/LoginButton';
import { useAuth } from 'react-oidc-context';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const auth = useAuth();

  const fetchNotes = useCallback(async () => {
    console.log('fetchNotes', auth.user?.profile.email);
    try {
      setLoading(true);
      const data = await getNotes(auth.user);
      console.log('notes fetched');
      setNotes(data);
    } catch (err: unknown) {
      setError(`Failed to fetch notes, error: ${err}`);
    } finally {
      setLoading(false);
    }
  }, [auth.user]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchNotes();
    }
  }, [auth.isAuthenticated, fetchNotes]);

  return (
    <main className="p-4 max-w-xl mx-auto font-sans text-gray-100">
      <div className="flex">
        <h1 className="flex-col flex-1 text-2xl font-bold mb-4">📝 Notes</h1>
        <div className="flex-col items-end gap-1 shrink-0">
          <LoginButton />
        </div>
      </div>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <AddNote onChange={fetchNotes} onError={setError} />

      {loading ? (
        <Loading />
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} onChange={fetchNotes} />
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
