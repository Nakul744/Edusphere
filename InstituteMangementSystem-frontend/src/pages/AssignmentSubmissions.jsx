import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

import AdminNavbar from "../components/adminComponents/AdminNavbar";
import Footer from "../components/Footer";

function AdminAssignmentSubmissions() {

  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await API.get(`/assignments/submissions/${assignmentId}`);
      setSubmissions(res.data.data || []);
    } catch (err) {
      console.log("Error fetching submissions", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      <AdminNavbar />

      <div className="flex-grow max-w-7xl mx-auto px-6 py-12">

        {/* Page Title */}

        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Assignment Submissions
        </h2>

        {/* Empty State */}

        {submissions.length === 0 ? (
          <div className="text-center text-gray-500 bg-white shadow-md rounded-xl p-10">
            No submissions yet.
          </div>
        ) : (

          <div className="bg-white shadow-xl rounded-xl overflow-hidden">

            {/* Table */}

            <div className="overflow-x-auto">

              <table className="w-full">

                {/* Table Header */}

                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

                  <tr>
                    <th className="p-5 text-left">Student</th>
                    <th className="p-5 text-left">Answer</th>
                    <th className="p-5 text-left">Submitted At</th>
                  </tr>

                </thead>

                {/* Table Body */}

                <tbody>

                  {submissions.map((sub) => (

                    <tr
                      key={sub.id}
                      className="border-b hover:bg-gray-50 align-top transition"
                    >

                      {/* Student */}

                      <td className="p-5 font-semibold text-indigo-600">
                        {sub.studentEmail || "Unknown Student"}
                      </td>

                      {/* Answer */}

                      <td className="p-5">

                        <div className="bg-gray-100 rounded-lg p-4 text-gray-700 whitespace-pre-wrap break-all max-w-3xl">
                          {sub.answerText}
                        </div>

                      </td>

                      {/* Date */}

                      <td className="p-5 text-gray-500 whitespace-nowrap">
                        {new Date(sub.submittedAt).toLocaleString()}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </div>

      <Footer />

    </div>
  );
}

export default AdminAssignmentSubmissions;