import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import AdminNavbar from "../components/adminComponents/AdminNavbar";
import Footer from "../components/Footer";

function AdminAddLecture() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");

  const [lecture, setLecture] = useState({
    courseId: "",
    title: "",
    videoUrl: "",
    pdfUrl: "",
    order: ""
  });

  useEffect(() => {
    if (courseId) {
      setLecture((prev) => ({
        ...prev,
        courseId: courseId
      }));
    }
  }, [courseId]);

  const handleChange = (e) => {
    setLecture({
      ...lecture,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/lectures", lecture);
      alert("Lecture added successfully!");

      setLecture({
        courseId: courseId,
        title: "",
        videoUrl: "",
        pdfUrl: "",
        order: ""
      });

    } catch (err) {
      alert(err.response?.data?.message || "Failed to add lecture");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex flex-col">

      <AdminNavbar />

      <div className="flex-grow flex justify-center items-center p-10">

        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl p-10">

          <h2 className="text-4xl font-bold text-center text-indigo-600 mb-10">
            Add New Lecture
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Course ID */}
            <div className="md:col-span-2">
              <label className="block font-semibold mb-1">
                Course ID
              </label>

              <input
                type="text"
                value={lecture.courseId}
                disabled
                className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-500"
              />
            </div>

            {/* Lecture Title */}
            <div>
              <label className="block font-semibold mb-1">
                Lecture Title
              </label>

              <input
                type="text"
                name="title"
                value={lecture.title}
                onChange={handleChange}
                placeholder="Example: Introduction to HTML"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
            </div>

            {/* Lecture Order */}
            <div>
              <label className="block font-semibold mb-1">
                Lecture Order
              </label>

              <input
                type="number"
                name="order"
                value={lecture.order}
                onChange={handleChange}
                placeholder="Example: 1"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
            </div>

            {/* Video URL */}
            <div className="md:col-span-2">
              <label className="block font-semibold mb-1">
                Video URL
              </label>

              <input
                type="text"
                name="videoUrl"
                value={lecture.videoUrl}
                onChange={handleChange}
                placeholder="Example: https://www.youtube.com/embed/qz0aGYrrlhU"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
            </div>

            {/* PDF URL */}
            <div className="md:col-span-2">
              <label className="block font-semibold mb-1">
                Notes PDF URL
              </label>

              <input
                type="text"
                name="pdfUrl"
                value={lecture.pdfUrl}
                onChange={handleChange}
                placeholder="Example: https://developer.mozilla.org/en-US/docs/Web/HTML"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            {/* Button */}
            <div className="md:col-span-2 text-center mt-6">

              <button
                type="submit"
                className="bg-indigo-600 text-white px-10 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
              >
                Add Lecture
              </button>

            </div>

          </form>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default AdminAddLecture;