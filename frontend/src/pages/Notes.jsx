import React, { useEffect, useState } from "react";
import CreateNote from "../components/CreateNote";
import NoteCard from "../components/NoteCard";
import { createNote, deleteNote, getNotes } from "../api/notes";
const Notes = () => {
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes(token);
      setNotes(data);
    };
    fetchNotes();
  }, []);

  const handleCreate = async (title, content) => {
    const newNote = await createNote(token, { title, content });
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleDelete = async (id) => {
    await deleteNote(token, id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };
  return (
    <div className="p-6">
      <CreateNote onCreate={handleCreate} />
      <div className="grid gap-4 mt-4">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
