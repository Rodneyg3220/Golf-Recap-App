import React, { useEffect, useState } from "react";

export default function NoteListPage() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(""); 

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("/");
      const json = await response.json();

      if (response.ok) {
        setNotes(json);
      }
    };

    fetchNotes();
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
  
    if (newNote.trim() !== "") {
      const newNoteObj = {
        title: newNote,
        _id: Date.now(), 
      };

      setNotes([...notes, newNoteObj]);
      setNewNote("");
    }
  
  };

  return (
    <>
    <h1>Note List Page</h1>
      <form onSubmit={handleSubmit}> 
        <input
          type="text"
          placeholder="Enter a new note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">Add Note</button> 
      </form>
      <div className="notes">
        {notes.length !== 0 ? (
          notes.map((note) => (
            <p key={note._id}>{note.title}</p>
          ))
        ) : (
          <p>No Notes Yet!</p>
        )}
      </div>
    </>
  );
}
