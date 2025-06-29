import { useState, useEffect } from "react";
import "./styles/App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");

  // Fetch notes from the backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes");
        const data = await response.json();
        if (response.ok) {
          setNotes(data.notes);
        } else {
          console.error(data.error || "Failed to fetch notes");
        }
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };

    fetchNotes();
  }, []);

  // Add a new note
  const handleAddNote = async () => {
    if (noteInput.trim() === "") return;
    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: noteInput }),
      });
      const data = await response.json();
      if (response.ok) {
        setNotes((prevNotes) => [...prevNotes, data.note]);
        setNoteInput("");
      } else {
        console.error(data.error || "Failed to add note");
      }
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  // Delete a note
  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      } else {
        console.error(data.error || "Failed to delete note");
      }
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <div className="App">
      <h1>Note-Taking Application</h1>
      <div className="note-input">
        <input
          type="text"
          placeholder="Write a note..."
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
      <div className="notes-list">
        {notes.length === 0 ? (
          <p>No notes available. Start adding some!</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="note-item">
              <p>{note.content}</p>
              <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
