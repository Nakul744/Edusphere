import UserNavbar from "../components/UserComponents/UserNavbar";
import UserFooter from "../components/UserComponents/UserFooter";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <UserNavbar />

      <div className="flex-grow max-w-6xl mx-auto px-6 py-12 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Student Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            to="/usercourses"
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition text-center"
          >
            Browse Courses
          </Link>

          <Link
            to="/my-courses"
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition text-center"
          >
            My Courses
          </Link>
          <Link
            to="/my-attendance"
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition"
          >
            My Attendance
          </Link>
        </div>
      </div>

      <UserFooter />
    </div>
  );
}

export default Dashboard;
