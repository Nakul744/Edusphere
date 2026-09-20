import { useState } from "react";
import API from "../services/api";

import AdminNavbar from "../components/adminComponents/AdminNavbar";
import Footer from "../components/Footer";

function CreateNotice() {

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!title || !message) {
      alert("Please fill all fields");
      return;
    }

    try {

      await API.post("/notices", {
        title,
        message
      });

      alert("Notice Published Successfully");

      setTitle("");
      setMessage("");

    } catch {
      alert("Error creating notice");
    }
  };

  return (

    <div className="min-h-screen flex flex-col bg-gray-100">

      <AdminNavbar />

      {/* Page Content */}

      <div className="flex-grow flex items-center justify-center px-4 py-10">

        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create Notice
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Title */}

            <div>
              <label className="block text-gray-600 mb-1">
                Notice Title
              </label>

              <input
                type="text"
                placeholder="Enter notice title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Message */}

            <div>
              <label className="block text-gray-600 mb-1">
                Notice Message
              </label>

              <textarea
                rows="4"
                placeholder="Enter notice message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* Submit */}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Publish Notice
            </button>

          </form>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default CreateNotice;