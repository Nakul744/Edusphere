import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import API from "../services/api";

import AdminNavbar from "../components/adminComponents/AdminNavbar";
import StatsCards from "../components/adminComponents/StatsCards";
import UsersTable from "../components/adminComponents/UserTable";
import CoursesTable from "../components/adminComponents/CoursesTable";
import Footer from "../components/Footer";

function AdminDashboard() {

  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // 🔹 Get logged-in admin email from JWT
  const token = localStorage.getItem("token");

  let email = "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      email = decoded.sub;
    } catch {}
  }

  useEffect(() => {
    fetchStats();
    fetchUsers(page);
    fetchCourses();
  }, [page]);

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data.data);
    } catch (err) {
      console.log("Stats error", err);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data.data);
    } catch (err) {
      console.log("Courses error", err);
    }
  };

  const fetchUsers = async (pageNumber) => {
    try {
      const res = await API.get(
        `/admin/users?page=${pageNumber}&size=5&sort=email`
      );

      setUsers(res.data.data.content);
      setTotalPages(res.data.data.totalPages);

    } catch (err) {
      console.log("Users error", err);
    }
  };

  const handleDelete = async (emailToDelete) => {

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await API.delete(`/admin/users/${emailToDelete}`);

      fetchUsers(page);
      fetchStats();

    } catch (err) {
      console.log("Delete failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <AdminNavbar />

      <div className="p-8">

        <StatsCards stats={stats} />

        <UsersTable
          users={users}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          handleDelete={handleDelete}
          currentUserEmail={email}
        />

        <CoursesTable courses={courses} />

      </div>
      <Footer />
    </div>
  );
}

export default AdminDashboard;