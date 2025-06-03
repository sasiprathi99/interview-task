import React, { useState, useEffect } from "react";
import hmeStyle from "./home.module.scss";
import { useRouter } from "next/router";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const router = useRouter();

  // signin user
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      router.push("/signin");
    } else {
      setUser(loggedInUser);
      const savedNotes = JSON.parse(localStorage.getItem(`notes_${loggedInUser.email}`)) || [];
      setNotes(savedNotes);
    }
  }, []);

 
  useEffect(() => {
    if (user) {
      localStorage.setItem(`notes_${user.email}`, JSON.stringify(notes));
    }
  }, [notes, user]);

  // Add Note
  function openAddPopup() {
    setTitle("");
    setDescription("");
    setIsEditing(false);
    setEditId(null);
    setShowPopup(true);
  }

  // Edit Note
  function openEditPopup(note) {
    setTitle(note.title);
    setDescription(note.description);
    setIsEditing(true);
    setEditId(note.id);
    setShowPopup(true);
  }

  function saveNote() {
    if (title.trim() === "" || description.trim() === "") {
      alert("Please enter both title and description.");
      return;
    }

    if (isEditing) {
      const updatedNotes = notes.map(note =>
        note.id === editId ? { id: editId, title, description } : note
      );
      setNotes(updatedNotes);
    } else {
      const newNote = { id: Date.now(), title, description };
      setNotes([...notes, newNote]);
    }

    setShowPopup(false);
    setTitle("");
    setDescription("");
    setIsEditing(false);
    setEditId(null);
  }

  // Delete Note
  function deleteNote(id) {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (confirmed) {
      const filtered = notes.filter(note => note.id !== id);
      setNotes(filtered);
    }
  }

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    router.push("/signin");
  }

  return (
    <section className={hmeStyle.hmeSec}>
      <div className={hmeStyle.container}>
        <div className={hmeStyle.topBar}>
          <button className={hmeStyle.addBtn} onClick={openAddPopup}>Add Note</button>
          <button className={hmeStyle.logBtn} onClick={handleLogout}>Logout</button>
        </div>

        {user && <h2 className={hmeStyle.welcome}>Welcome, {user.username}!</h2>}

        <h1>All Notes</h1>

        {notes.length === 0 && <p>No notes available. Please add a note.</p>}

        <div className={hmeStyle.listBox}>
          {notes.map(note => (
            <div key={note.id} className={hmeStyle.listItem}>
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <div className={hmeStyle.actions}>
                <button className={hmeStyle.addBtn} onClick={() => openEditPopup(note)}>Edit</button>
                <button className={hmeStyle.logBtn} onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {showPopup && (
          <div className={hmeStyle.mdldiv}>
            <div className={hmeStyle.mdl}>
              <h2>{isEditing ? "Edit Note" : "Add Note"}</h2>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <button className={hmeStyle.addBtn} onClick={saveNote}>
                {isEditing ? "Update" : "Save"}
              </button>
              <button className={hmeStyle.logBtn} onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
