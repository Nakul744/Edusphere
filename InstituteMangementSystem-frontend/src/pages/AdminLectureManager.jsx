import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import AdminNavbar from "../components/adminComponents/AdminNavbar";
import Footer from "../components/Footer";
import { Trash2, Pencil } from "lucide-react";

function AdminLectureManager() {

  const { courseId } = useParams();

  const [lectures, setLectures] = useState([]);
  const [editingLecture, setEditingLecture] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    pdfUrl: "",
    order: ""
  });

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const res = await API.get(`/lectures/${courseId}`);
      setLectures(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteLecture = async (lectureId) => {
    const confirmDelete = window.confirm("Delete this lecture?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/lectures/${lectureId}`);
      setLectures(lectures.filter((l) => l.id !== lectureId));
    } catch (err) {
      alert("Delete failed");
    }
  };

  const openEditModal = (lecture) => {
    setEditingLecture(lecture);

    setFormData({
      title: lecture.title,
      videoUrl: lecture.videoUrl,
      pdfUrl: lecture.pdfUrl,
      order: lecture.order
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const updateLecture = async () => {
    try {

      await API.put(`/lectures/${editingLecture.id}`, formData);

      alert("Lecture updated successfully");

      setEditingLecture(null);

      fetchLectures();

    } catch (err) {

      alert("Update failed");

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <AdminNavbar />

      <div className="max-w-6xl mx-auto p-10 flex-grow">

        <h2 className="text-3xl font-bold mb-8">
          Manage Lectures
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {lectures.map((lecture) => (

            <div
              key={lecture.id}
              className="bg-white shadow-lg rounded-xl p-6"
            >

              <h3 className="text-xl font-bold mb-2">
                {lecture.order}. {lecture.title}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                Video: {lecture.videoUrl}
              </p>

              <div className="flex gap-3">

                <button
                  onClick={() => openEditModal(lecture)}
                  className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() => deleteLecture(lecture.id)}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      <Footer />

      {/* EDIT MODAL */}

      {editingLecture && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

          <div className="bg-white rounded-xl p-8 w-[500px]">

            <h2 className="text-2xl font-bold mb-6">
              Edit Lecture
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Lecture Title"
              />

              <input
                type="text"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Video URL"
              />

              <input
                type="text"
                name="pdfUrl"
                value={formData.pdfUrl}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="PDF URL"
              />

              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Lecture Order"
              />

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setEditingLecture(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={updateLecture}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminLectureManager;