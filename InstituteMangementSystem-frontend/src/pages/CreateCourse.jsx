import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import AdminNavbar from "../components/adminComponents/AdminNavbar";
import Footer from "../components/Footer";

function CreateCourse() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.price) {
      alert("Please fill required fields");
      return;
    }

    if (!formData.image) {
      alert("Please upload course image");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("image", formData.image);

      await API.post("/courses", data); // ❗ no headers needed

      alert("Course created successfully 🚀");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create New Course
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-gray-600 mb-1">Course Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter course title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-600 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter description"
                rows="3"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-600 mb-1">Course Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter price"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-600 mb-1">Course Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Creating..." : "Create Course"}
            </button>
          </form>

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="mt-4 w-full text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Back to Dashboard
          </button>
        </div>

        
      </div>
      <Footer />
    </>
  );
}

export default CreateCourse;
