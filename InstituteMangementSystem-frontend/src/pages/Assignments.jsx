import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

import UserNavbar from "../components/UserComponents/UserNavbar";
import UserFooter from "../components/UserComponents/UserFooter";

function Assignments() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await API.get(`/assignments/${courseId}`);

      console.log(res.data); // 🔴 check this

      setAssignments(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <UserNavbar />

      <div className="max-w-5xl mx-auto p-10 flex-grow">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Course Assignments
        </h2>

        {assignments.length === 0 ? (
          <p className="text-center text-gray-500">
            No assignments available for this course.
          </p>
        ) : (
          <div className="space-y-6">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white shadow-lg rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-indigo-600 mb-2">
                  {assignment.title}
                </h3>

                <p className="text-gray-600 mb-3">{assignment.description}</p>

                <p className="text-sm text-red-500 mb-4">
                  Due: {new Date(assignment.dueDate).toLocaleString()}
                </p>

                <button
                  onClick={() =>
                    navigate(`/submit-assignment/${assignment.id}`)
                  }
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Submit Assignment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <UserFooter />
    </div>
  );
}

export default Assignments;
