import { useEffect, useState } from 'react';
import { getNotes } from './services/api';
import type { Note } from './services/api';
import { NoteItem } from './components/NoteItem';
import { AddNote } from './components/AddNote';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState('');

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      console.log("notes fetched");
      setNotes(data);
    } catch (err) {
      setError('Failed to fetch notes');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);


  return (
    <main className="p-4 max-w-xl mx-auto font-sans text-gray-100">
      <h1 className="text-2xl font-bold mb-4">📝 Notes</h1>

      <AddNote onChange={fetchNotes} onError={setError} />

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <ul className="space-y-4">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} onChange={fetchNotes} />
        ))}
      </ul>
    </main>
  );
}

export default App;
