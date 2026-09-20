import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaBell } from "react-icons/fa";

function UserNavbar() {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");

  let email = "";
  let role = "";
  let firstLetter = "";

  if (token) {
    try {

      const decoded = jwtDecode(token);

      email = decoded.sub;
      role = decoded.role;

      if (email) {
        firstLetter = email.charAt(0).toUpperCase();
      }

    } catch {
      console.log("Invalid token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (

    <div className="flex justify-between items-center bg-white shadow-md px-8 py-4">

      {/* Logo */}

      <h1
        onClick={() => navigate("/dashboard")}
        className="text-2xl font-bold text-indigo-600 cursor-pointer"
      >
        SmartCollegeERP
      </h1>

      <div className="flex items-center gap-6">

        {/* 🔔 Bell Icon */}

        <div
          onClick={() => navigate("/notices")}
          className="cursor-pointer"
        >
          <FaBell size={22} className="text-gray-700 hover:text-indigo-600" />
        </div>

        {/* Avatar */}

        <div className="relative">

          <div
            onClick={() => setOpen(!open)}
            className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white font-bold rounded-full cursor-pointer"
          >
            {firstLetter}
          </div>

          {open && (

            <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2">

              <div className="px-4 py-2 border-b">

                <p className="text-sm font-semibold text-gray-700">
                  {email}
                </p>

                <p className="text-xs text-gray-500">
                  {role}
                </p>

              </div>

              <button
                onClick={() => navigate("/my-courses")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                My Courses
              </button>

              <button
                onClick={() => navigate("/usercourses")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Browse Courses
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
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

export default UserNavbar;