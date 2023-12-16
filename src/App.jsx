import { useState, useEffect } from "react";
import QuickNote from "./components/QuickNote";
import { supabase } from "./supabaseClient";

function App() {
  const [notes, setnotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      let { data, error } = await supabase.from("notes").select("*");
      if (error) {
        throw error;
      }
      setnotes(data || []);
    } catch (error) {
      console.error("Error fetching notes", error);
    }
  };

  async function addNote() {
    try {
      const { data, error } = await supabase
        .from("notes")
        .insert([{ text: "Click edit to write your note" }])
        .select();
      if (error) {
        throw error;
      }
      setnotes([...notes, ...data]);
    } catch (error) {
      console.error("Error fetching notes", error);
    }
  }
  async function updateNote(id, newText) {
    try {
      const { data, error } = await supabase
        .from("notes")
        .update({ text: newText })
        .eq("id", id)
        .select();
      if (error) {
        throw error;
      }
      setnotes((previousNotes) =>
        previousNotes.map((note) =>
          note.id == id ? { id, text: newText } : note
        )
      );
    } catch (error) {
      console.error("Error fetching notes", error);
    }
  }
  async function deleteNote(id) {
    try {
      const { error } = await supabase.from("notes").delete().eq("id", id);
      if (error) {
        throw error;
      }
      setnotes((previousNotes) =>
        previousNotes.filter((note) => note.id !== id)
      );
    } catch (error) {
      console.error("Error fetching notes", error);
    }
  }

  return (
    <div className="top-0 bottom-0 left-0 right-0 fixed bg-[#242629]">
      <h1 className="text-[#fffffe] font-bold text-5xl text-center italic m-3 ml-5">
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
    </div>
  );
}

export default App;
