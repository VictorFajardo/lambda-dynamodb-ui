import { useEffect, useState } from 'react';
import { getNotes } from './services/api';
import type { Note } from './services/api';
import { NoteItem } from './components/NoteItem';
import { AddNote } from './components/AddNote';
import { Loading } from './components/Loading';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      console.log('notes fetched');
      setNotes(data);
      setLoading(false);
      if (loading) setLoading(false);
    } catch (err: unknown) {
      setError(`Failed to fetch notes, error: ${err}`);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <main className="p-4 max-w-xl mx-auto font-sans text-gray-100">
      <h1 className="text-2xl font-bold mb-4">📝 Notes</h1>

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
