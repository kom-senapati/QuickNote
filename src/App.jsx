import { useState } from "react";
import QuickNote from "./components/QuickNote";

function App() {
  const [notes, setnotes] = useState([]);

  function addNote() {
    setnotes([
      ...notes,
      { id: Date.now(), text: "Click edit to write your note" },
    ]);
  }
  function updateNote(id, newText) {
    setnotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id == id ? { id, text: newText } : note
      )
    );
  }
  function deleteNote(id) {
    setnotes((previousNotes) => previousNotes.filter((note) => note.id !== id));
  }

  return (
    <>
      <h1 className="text-white font-bold text-5xl italic m-3 ml-5">
        Quick Note
      </h1>
      <div className="text-center">
        <button
          onClick={addNote}
          className="text-white hover:bg-green-500 px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-wrap">
        {notes.map((note) => (
          <QuickNote
            key={note.id}
            id={note.id}
            text={note.text}
            onUpdate={updateNote}
            onDelete={() => deleteNote(note.id)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
