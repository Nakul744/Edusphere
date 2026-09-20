import { useEffect, useState } from "react";
import API from "../services/api";
import UserNavbar from "../components/UserComponents/UserNavbar";
import UserFooter from "../components/UserComponents/UserFooter";

function UserCourses() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data.data);
    } catch (err) {
      console.log("Error fetching courses", err);
    }
  };

  const handlePayment = async (courseId, price) => {

    if (!window.confirm(`Confirm payment of ₹${price}?`)) return;

    try {
      await API.post(`/payments/${courseId}?amount=${price}`);
      alert("Payment successful! You are now enrolled.");
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <UserNavbar />

      <div className="max-w-6xl mx-auto px-6 py-12 flex-grow">

        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Available Courses
        </h2>

        {courses.length === 0 ? (
          <p className="text-gray-500">No courses available.</p>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {courses.map((course) => (

              <div
                key={course.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
              >

                {/* Course Image */}

                <img
                  src={course.photoUrl}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />

                {/* Course Content */}

                <div className="p-6">

                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h3>

                  <p className="text-gray-500 text-sm mb-4">
                    {course.description}
                  </p>

                  <div className="flex justify-between items-center">

                    <span className="text-lg font-bold text-indigo-600">
                      ₹{course.price}
                    </span>

                    <button
                      onClick={() => handlePayment(course.id, course.price)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Pay & Enroll
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

export default UserCourses;