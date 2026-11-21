import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import AdminNavbar from "../components/adminComponents/AdminNavbar";
import Footer from "../components/Footer";

function CreateAdmin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/admin/create-admin", {
        email: formData.email,
        password: formData.password,
      });

      alert("Admin created successfully 🚀");
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create New Admin
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-600 mb-1">Admin Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter admin email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter password"
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
              {loading ? "Creating..." : "Create Admin"}
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
    </div>
  );
}

export default CreateAdmin;