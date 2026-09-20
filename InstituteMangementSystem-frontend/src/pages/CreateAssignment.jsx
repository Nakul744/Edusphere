import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import AdminNavbar from "../components/adminComponents/AdminNavbar";
import Footer from "../components/Footer";

function CreateAssignment() {

  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");

  const [assignment, setAssignment] = useState({
    courseId: "",
    title: "",
    description: "",
    dueDate: ""
  });

  useEffect(() => {
    if (courseId) {
      setAssignment((prev) => ({
        ...prev,
        courseId: courseId
      }));
    }
  }, [courseId]);

  const handleChange = (e) => {
    setAssignment({
      ...assignment,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/assignments", assignment);

      alert("Assignment created successfully!");

      setAssignment({
        courseId: courseId,
        title: "",
        description: "",
        dueDate: ""
      });

    } catch (err) {

      alert("Failed to create assignment");

    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <AdminNavbar />

      <div className="flex-grow flex justify-center items-center p-10">

        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">

          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Create Assignment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Course ID */}
            <div>
              <label className="block font-semibold mb-1">
                Course ID
              </label>

              <input
                type="text"
                value={assignment.courseId}
                disabled
                className="w-full border p-3 rounded bg-gray-100"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block font-semibold mb-1">
                Assignment Title
              </label>

              <input
                type="text"
                name="title"
                value={assignment.title}
                onChange={handleChange}
                placeholder="Example: Build a HTML Portfolio Page"
                className="w-full border p-3 rounded"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold mb-1">
                Description
              </label>

              <textarea
                name="description"
                value={assignment.description}
                onChange={handleChange}
                placeholder="Create a portfolio page using HTML headings, images and lists."
                className="w-full border p-3 rounded h-28"
                required
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block font-semibold mb-1">
                Due Date
              </label>

              <input
                type="datetime-local"
                name="dueDate"
                value={assignment.dueDate}
                onChange={handleChange}
                className="w-full border p-3 rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Create Assignment
            </button>

          </form>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default CreateAssignment;