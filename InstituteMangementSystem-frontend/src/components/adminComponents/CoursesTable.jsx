import { useNavigate } from "react-router-dom";

function CoursesTable({ courses }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-xl font-semibold">All Courses</h2>

        <div className="flex gap-3">

          <button
            onClick={() => navigate("/courses")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            View All Courses
          </button>

          <button
            onClick={() => navigate("/admin/create-course")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            + Create Course
          </button>

        </div>

      </div>

      <table className="min-w-full text-left">

        <thead>
          <tr className="border-b text-gray-600 text-sm">
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Price</th>
          </tr>
        </thead>

        <tbody>

          {courses.slice(0,5).map((course, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">{course.title}</td>
              <td className="py-3 px-4 text-green-600 font-semibold">
                ₹ {course.price}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default CoursesTable;