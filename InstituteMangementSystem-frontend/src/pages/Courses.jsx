import { useEffect, useState } from "react";
import API from "../services/api";
import AdminNavbar from "../components/adminComponents/AdminNavbar";
import Footer from "../components/Footer";
import { Trash2, BookOpen, Plus, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    API.get("/courses")
      .then((res) => setCourses(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = async (courseId) => {
    const confirmDelete = window.confirm("Delete this course?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/courses/${courseId}`);
      setCourses(courses.filter((course) => course.id !== courseId));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />

      <div className="flex-grow bg-gradient-to-br from-gray-100 to-blue-100 p-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Manage Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
            >
              {/* Course Image */}
              <div className="overflow-hidden">
                <img
                  src={course.photoUrl}
                  alt={course.title}
                  className="w-full h-52 object-cover hover:scale-110 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between min-h-[220px]">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-indigo-600">
                    ₹{course.price}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/add-lecture?courseId=${course.id}`)
                    }
                    className="flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    <Plus size={16} />
                    Add Lecture
                  </button>

                  <button
                    onClick={() => navigate(`/admin/lectures/${course.id}`)}
                    className="flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    <BookOpen size={16} />
                    Manage
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/admin/create-assignment?courseId=${course.id}`)
                    }
                    className="flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    <ClipboardList size={16} />
                    Create Assignment
                  </button>

                  {/* NEW BUTTON */}

                  <button
                    onClick={() => navigate(`/admin/assignments/${course.id}`)}
                    className="flex items-center justify-center gap-2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    <ClipboardList size={16} />
                    View Submissions
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition col-span-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Courses;
