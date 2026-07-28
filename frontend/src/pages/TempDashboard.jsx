import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

import {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} from "../services/noteService";

import { logoutUser } from "../services/authService";

function Dashboard() {

  // ==============================
  // Navigation & Authentication
  // ==============================

  const navigate = useNavigate();

  const {
    user,
    setUser,
    setIsAuthenticated,
  } = useAuth();

  // ==============================
  // States
  // ==============================

  const [notes, setNotes] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [editingNoteId, setEditingNoteId] = useState(null);

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  // ==============================
  // Fetch Notes
  // ==============================

  const fetchNotes = async () => {

    try {

      const response = await getNotes(
        search,
        sort,
        page
      );

      setNotes(response.data);

      setTotalPages(response.totalPage);

    } catch (error) {

      console.log(error);

    }

  };

  // ==============================
  // Load Notes
  // ==============================

  useEffect(() => {

    fetchNotes();

  }, [search, sort, page]);

  // ==============================
  // Handle Input Change
  // ==============================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // ==============================
  // Create / Update Note
  // ==============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingNoteId) {

        await updateNote(
          editingNoteId,
          formData
        );

        alert("Note Updated Successfully");

      } else {

        await createNote(formData);

        alert("Note Created Successfully");

      }

      setFormData({
        title: "",
        content: "",
      });

      setEditingNoteId(null);

      setPage(1);

      await fetchNotes();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Operation Failed"
      );

    }

  };
    // ==============================
  // Delete Note
  // ==============================

  const handleDelete = async (id) => {

    try {

      await deleteNote(id);

      alert("Note Deleted Successfully");

      setPage(1);

      await fetchNotes();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to Delete Note"
      );

    }

  };

  // ==============================
  // Edit Note
  // ==============================

  const handleEdit = (note) => {

    setEditingNoteId(note._id);

    setFormData({
      title: note.title,
      content: note.content,
    });

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });

  };

  // ==============================
  // Logout
  // ==============================

  const handleLogout = async () => {

    try {

      await logoutUser();

      setUser(null);

      setIsAuthenticated(false);

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Logout Failed"
      );

    }

  };

  // ==============================
  // UI
  // ==============================

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      {/* ================= Header ================= */}

      <header className="bg-blue-700 text-white shadow-lg">

        <div className="max-w-6xl mx-auto flex justify-between items-center px-8 py-5">

          <h1 className="text-3xl font-bold tracking-wide">
            📝 Secure Notes
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-lg font-medium shadow"
          >
            Logout
          </button>

        </div>

      </header>

      {/* ================= Main Container ================= */}

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* ================= Welcome Card ================= */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <h2 className="text-3xl font-bold text-gray-800">

            Welcome,
            <span className="text-blue-700">
              {" "}{user?.username}
            </span>
            👋

          </h2>

          <p className="text-gray-500 mt-2">
            {user?.email}
          </p>

        </div>

        {/* ================= Search & Sort ================= */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="🔍 Search your notes..."
              value={search}
              onChange={(e) => {

                setSearch(e.target.value);

                setPage(1);

              }}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 rounded-xl px-5 py-3 focus:outline-none"
            >

              <option value="newest">
                Newest First
              </option>

              <option value="oldest">
                Oldest First
              </option>

            </select>

          </div>

        </div>

        {/* ================= Notes ================= */}

        <section>

          <h3 className="text-2xl font-bold text-gray-800 mb-6">

            Your Notes

          </h3>

          <div className="space-y-5">
                    {notes.length === 0 ? (

            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

              <div className="text-6xl mb-4">
                📝
              </div>

              <h4 className="text-2xl font-semibold text-gray-700">

                No Notes Found

              </h4>

              <p className="text-gray-500 mt-3">

                Create your first note to get started.

              </p>

            </div>

          ) : (

            notes.map((note) => (

              <div
                key={note._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-l-4 border-blue-600"
              >

                {/* Note Title */}

                <h4 className="text-2xl font-bold text-blue-700">

                  {note.title}

                </h4>

                {/* Note Content */}

                <p className="text-gray-600 mt-4 leading-7">

                  {note.content}

                </p>

                {/* Buttons */}

                <div className="mt-6 flex gap-3">

                  <button
                    onClick={() => handleEdit(note)}
                    className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-5 py-2 rounded-lg font-medium"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(note._id)}
                    className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-lg font-medium"
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            ))
          )}

          </div>

          {/* ================= Pagination ================= */}

          <div className="flex justify-center items-center gap-5 mt-10">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              ← Previous
            </button>

            <div className="bg-white shadow-md rounded-lg px-5 py-2 font-semibold">

              Page {page} of {totalPages}

            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>

          </div>

        </section>

        {/* ================= Create / Update Form ================= */}

        <section className="mt-12 bg-white rounded-2xl shadow-lg p-8">

          <h3 className="text-2xl font-bold text-gray-800 mb-6">

            {editingNoteId ? "✏️ Edit Note" : "➕ Create New Note"}

          </h3>

          <form onSubmit={handleSubmit}>
                      {/* Title */}

            <input
              type="text"
              name="title"
              placeholder="Enter note title..."
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Content */}

            <textarea
              name="content"
              placeholder="Write your note here..."
              value={formData.content}
              onChange={handleChange}
              rows="6"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Buttons */}

            <div className="flex gap-4">

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl font-semibold shadow"
              >
                {editingNoteId ? "Update Note" : "Create Note"}
              </button>

              {editingNoteId && (

                <button
                  type="button"
                  onClick={() => {

                    setEditingNoteId(null);

                    setFormData({
                      title: "",
                      content: "",
                    });

                  }}
                  className="bg-gray-500 hover:bg-gray-600 transition text-white px-6 py-3 rounded-xl font-semibold shadow"
                >
                  Cancel
                </button>

              )}

            </div>

          </form>

        </section>

        {/* ================= Footer ================= */}

        <footer className="mt-16 border-t border-gray-300 pt-6 text-center text-gray-500">

          <p className="text-sm">
            Secure Notes Management System
          </p>

          <p className="text-sm mt-2">
            Built using React • Node.js • Express • MongoDB
          </p>

        </footer>

      </main>

    </div>

  );

}

export default Dashboard;