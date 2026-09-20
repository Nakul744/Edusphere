import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

import UserNavbar from "../components/UserComponents/UserNavbar";
import UserFooter from "../components/UserComponents/UserFooter";

function MyCourses() {

  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const res = await API.get("/courses/my");
      setCourses(res.data.data);
    } catch (err) {
      console.log("Error fetching enrolled courses", err);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex flex-col">

      <UserNavbar />

      <div className="max-w-6xl mx-auto px-6 py-12 flex-grow">

        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          My Enrolled Courses
        </h2>

        {courses.length === 0 ? (

          <p className="text-gray-500 text-center">
            You have not enrolled in any courses yet.
          </p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {courses.map((course) => (

              <div
                key={course.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
              >

                {/* Course Image */}
                <div className="relative overflow-hidden">

                  <img
                    src={course.photoUrl}
                    alt={course.title}
                    className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
                  />

                  <span className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm shadow">
                    Enrolled
                  </span>

                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between min-h-[200px]">

                  <div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition">
                      {course.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>

                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between">

                    <span className="text-indigo-600 font-bold text-xl">
                      ₹{course.price}
                    </span>

                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-4">

                    <button
                      onClick={() => navigate(`/course/${course.id}`)}
                      className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                      Start Learning
                    </button>

                    <button
                      onClick={() => navigate(`/assignments/${course.id}`)}
                      className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Assignments
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      <UserFooter />

    </div>
  );
}

export default MyCourses;