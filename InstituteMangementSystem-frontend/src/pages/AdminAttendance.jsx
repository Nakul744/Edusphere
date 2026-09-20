import { useEffect, useState } from "react";
import API from "../services/api";

import AdminNavbar from "../components/adminComponents/AdminNavbar";
import Footer from "../components/Footer";
import AttendanceTable from "../components/adminComponents/AttendanceTable";

function AdminAttendance() {

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await API.get("/courses");
    setCourses(res.data.data);
  };

  const handleCourseChange = async (courseId) => {

    setSelectedCourse(courseId);

    try {
      const res = await API.get(`/admin/enrollments/${courseId}`);

      setStudents(res.data.data);

    } catch (err) {
      console.log("Error fetching students");
    }
  };

  const markAttendance = async (studentEmail, present) => {

    try {
      await API.post(
        `/attendance/mark?courseId=${selectedCourse}&studentEmail=${studentEmail}&present=${present}`
      );

    } catch {
      alert("Error marking attendance");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <AdminNavbar />

      <div className="max-w-6xl mx-auto p-8 flex-grow">

        <h1 className="text-3xl font-bold mb-6">
          Attendance Management
        </h1>

        {/* Course Selector */}

        <select
          onChange={(e) => handleCourseChange(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6"
        >

          <option>Select Course</option>

          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}

        </select>

        {/* Attendance Table */}

        {students.length > 0 && (
          <AttendanceTable
            students={students}
            markAttendance={markAttendance}
          />
        )}

      </div>

      <Footer />

    </div>
  );
}

export default AdminAttendance;