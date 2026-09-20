import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import API from "../services/api";

import UserNavbar from "../components/UserComponents/UserNavbar";
import UserFooter from "../components/UserComponents/UserFooter";

function MyAttendance() {

  const [attendance, setAttendance] = useState([]);
  const [courses, setCourses] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);

  const token = localStorage.getItem("token");

  let email = "";

  if (token) {
    const decoded = jwtDecode(token);
    email = decoded.sub;
  }

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {

    try {

      const res = await API.get(`/attendance/student/${email}`);
      const records = res.data.data;

      setAttendance(records);

      const coursesRes = await API.get("/courses");

      const map = {};
      coursesRes.data.data.forEach(course => {
        map[course.id] = course.title;
      });

      setCourses(map);

    } catch (err) {
      console.log("Error loading attendance");
    }
  };

  // group attendance by course
  const grouped = attendance.reduce((acc, record) => {

    if (!acc[record.courseId]) {
      acc[record.courseId] = [];
    }

    acc[record.courseId].push(record);

    return acc;

  }, {});

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <UserNavbar />

      <div className="max-w-6xl mx-auto p-8 flex-grow">

        <h1 className="text-3xl font-bold mb-8 text-center">
          My Attendance
        </h1>

        {/* COURSE CARDS */}

        {!selectedCourse && (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {Object.keys(grouped).map((courseId) => {

              const records = grouped[courseId];

              const presentCount =
                records.filter(r => r.present).length;

              const total = records.length;

              const percentage =
                ((presentCount / total) * 100).toFixed(0);

              return (

                <div
                  key={courseId}
                  onClick={() => setSelectedCourse(courseId)}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl cursor-pointer transition"
                >

                  <h2 className="text-xl font-semibold mb-2">
                    {courses[courseId] || "Course"}
                  </h2>

                  <p className="text-gray-500 mb-4">
                    Click to view full attendance
                  </p>

                  {/* progress bar */}

                  <div className="mb-4">

                    <div className="flex justify-between text-sm mb-1">
                      <span>Attendance</span>
                      <span>{percentage}%</span>
                    </div>

                    <div className="w-full bg-gray-200 h-2 rounded-full">

                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />

                    </div>

                  </div>

                  <p className="text-sm text-gray-600">
                    Present: {presentCount}
                    <br />
                    Total Classes: {total}
                  </p>

                </div>

              );

            })}

          </div>

        )}

        {/* ATTENDANCE TABLE */}

        {selectedCourse && (

          <div className="bg-white rounded-xl shadow-md p-6">

            <button
              onClick={() => setSelectedCourse(null)}
              className="mb-4 text-indigo-600 hover:underline"
            >
              ← Back
            </button>

            <h2 className="text-2xl font-semibold mb-4">
              {courses[selectedCourse]} Attendance
            </h2>

            <table className="w-full text-left">

              <thead>

                <tr className="border-b text-gray-600">

                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>

                </tr>

              </thead>

              <tbody>

                {grouped[selectedCourse].map((record, index) => (

                  <tr key={index} className="border-b">

                    <td className="p-3">
                      {record.date}
                    </td>

                    <td className="p-3">

                      {record.present ? (

                        <span className="text-green-600 font-semibold">
                          Present
                        </span>

                      ) : (

                        <span className="text-red-600 font-semibold">
                          Absent
                        </span>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      <UserFooter />

    </div>
  );
}

export default MyAttendance;