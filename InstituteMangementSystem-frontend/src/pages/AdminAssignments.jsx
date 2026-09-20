import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import AdminNavbar from "../components/adminComponents/AdminNavbar";
import Footer from "../components/Footer";

function AdminAssignments() {

  const { courseId } = useParams();
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {

      const res = await API.get(`/assignments/${courseId}`);

      setAssignments(res.data.data || []);

    } catch (err) {

      console.log(err);

    }
  };

  return (

    <div className="min-h-screen flex flex-col bg-gray-100">

      <AdminNavbar />

      <div className="max-w-6xl mx-auto p-10 flex-grow">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Course Assignments
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {assignments.map((assignment) => (

            <div
              key={assignment.id}
              className="bg-white shadow-lg rounded-xl p-6"
            >

              <h3 className="text-xl font-bold text-indigo-600 mb-2">
                {assignment.title}
              </h3>

              <p className="text-gray-600 mb-4">
                {assignment.description}
              </p>

              <button
                onClick={() =>
                  navigate(`/admin/submissions/${assignment.id}`)
                }
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                View Submissions
              </button>

            </div>

          ))}

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default AdminAssignments;