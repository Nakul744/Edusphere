import { useState } from "react";

function AttendanceTable({ students, markAttendance }) {

  const [attendance, setAttendance] = useState({});

  const handleChange = (email, value) => {
    setAttendance({
      ...attendance,
      [email]: value
    });
  };

  const submitAttendance = () => {

    Object.keys(attendance).forEach((email) => {
      markAttendance(email, attendance[email]);
    });

    alert("Attendance submitted");
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">

      <h2 className="text-xl font-semibold mb-4">
        Mark Attendance
      </h2>

      <table className="w-full text-left">

        <thead>
          <tr className="border-b">
            <th className="p-3">Student Email</th>
            <th className="p-3">Present</th>
            <th className="p-3">Absent</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student, index) => (

            <tr key={index} className="border-b">

              <td className="p-3">{student.studentEmail}</td>

              <td className="p-3">
                <input
                  type="radio"
                  name={student.studentEmail}
                  onChange={() => handleChange(student.studentEmail, true)}
                />
              </td>

              <td className="p-3">
                <input
                  type="radio"
                  name={student.studentEmail}
                  onChange={() => handleChange(student.studentEmail, false)}
                />
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <button
        onClick={submitAttendance}
        className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg"
      >
        Save Attendance
      </button>

    </div>
  );
}

export default AttendanceTable;