import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { FaBell } from "react-icons/fa";

function AdminNavbar() {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");

  let email = "";
  let firstLetter = "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      email = decoded.sub;
      firstLetter = email.charAt(0).toUpperCase();
    } catch {}
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (

    <div className="flex justify-between items-center bg-white shadow px-8 py-4 relative z-50">

      {/* Logo */}
      <h1 className="text-xl font-bold text-indigo-600">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-6">

        {/* Bell */}
        <div
          onClick={() => navigate("/notices")}
          className="cursor-pointer transition hover:scale-110"
        >
          <FaBell size={22} className="text-gray-700 hover:text-indigo-600" />
        </div>

        {/* Avatar */}
        <div className="relative">

          <div
            onClick={() => setOpen(!open)}
            className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-full cursor-pointer font-semibold hover:scale-105 transition"
          >
            {firstLetter}
          </div>

          {open && (

            <div className="absolute right-0 mt-3 w-56 bg-white border rounded-xl shadow-xl z-[999] animate-fadeIn">

              {/* Admin Info */}
              <div className="px-4 py-3 border-b bg-gray-50 rounded-t-xl">
                <p className="text-sm font-semibold text-gray-700">{email}</p>
              </div>

              {/* Actions */}
              <button
                onClick={() => navigate("/admin/create-course")}
                className="w-full text-left px-4 py-2 hover:bg-indigo-50 transition"
              >
                Create Course
              </button>

              <button
                onClick={() => navigate("/admin/attendance")}
                className="w-full text-left px-4 py-2 hover:bg-indigo-50 transition"
              >
                Attendance
              </button>

              <button
                onClick={() => navigate("/admin/create-notice")}
                className="w-full text-left px-4 py-2 hover:bg-indigo-50 transition"
              >
                Create Notice
              </button>

              <button
                onClick={() => navigate("/admin/create-admin")}
                className="w-full text-left px-4 py-2 hover:bg-indigo-50 transition"
              >
                Create Admin
              </button>

              {/* Logout */}
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 border-t"
              >
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default AdminNavbar;