import { useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import UserNavbar from "../components/UserComponents/UserNavbar";
import UserFooter from "../components/UserComponents/UserFooter";

function SubmitAssignment() {

  const { assignmentId } = useParams();

  const [answer, setAnswer] = useState("");

  const submitAssignment = async () => {

    if (!answer.trim()) {
      alert("Please write your answer before submitting.");
      return;
    }

    try {

      await API.post("/assignments/submit", {
        assignmentId,
        answerText: answer,
      });

      alert("Assignment submitted successfully!");

      setAnswer("");

    } catch (err) {

      alert(err.response?.data?.message || "Submission failed");

    }

  };

  return (

    <div className="min-h-screen flex flex-col bg-gray-100">

      <UserNavbar />

      <div className="flex-grow flex justify-center items-center p-10">

        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">

          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Submit Assignment
          </h2>

          <textarea
            placeholder="Write your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border rounded-lg p-4 h-40 focus:ring-2 focus:ring-indigo-400 outline-none mb-6"
          />

          <button
            onClick={submitAssignment}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Submit Assignment
          </button>

        </div>

      </div>

      <UserFooter />

    </div>
  );
}

export default SubmitAssignment;