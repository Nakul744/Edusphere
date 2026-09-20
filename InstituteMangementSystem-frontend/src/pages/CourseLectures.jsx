import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import UserNavbar from "../components/UserComponents/UserNavbar";
import UserFooter from "../components/UserComponents/UserFooter";

function CourseLectures() {

  const { courseId } = useParams();

  const [lectures, setLectures] = useState([]);
  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const res = await API.get(`/lectures/${courseId}`);
      setLectures(res.data.data);

      if (res.data.data.length > 0) {
        setCurrentLecture(res.data.data[0]);
      }

    } catch (err) {
      console.log("Error fetching lectures", err);
    }
  };

  return (

    <div className="min-h-screen flex flex-col bg-gray-100">

      <UserNavbar />

      <div className="flex flex-grow">

        {/* LEFT SIDE - Lecture List */}

        <div className="w-1/3 bg-white border-r p-4 overflow-y-auto">

          <h2 className="text-xl font-bold mb-4">
            Course Lectures
          </h2>

          {lectures.map((lecture, index) => (

            <div
              key={lecture.id}
              onClick={() => setCurrentLecture(lecture)}
              className={`p-3 mb-2 rounded-lg cursor-pointer transition
              ${
                currentLecture?.id === lecture.id
                  ? "bg-indigo-100"
                  : "hover:bg-gray-100"
              }`}
            >

              <p className="font-medium">
                {index + 1}. {lecture.title}
              </p>

            </div>

          ))}

        </div>


        {/* RIGHT SIDE - Video Player */}

        <div className="flex-1 p-6">

          {currentLecture ? (

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="text-2xl font-bold mb-4">
                {currentLecture.title}
              </h2>

              {/* Video */}

              <div className="aspect-video mb-6">

                <iframe
                  className="w-full h-full rounded-lg"
                  src={currentLecture.videoUrl}
                  title="Lecture Video"
                  allowFullScreen
                ></iframe>

              </div>

              {/* PDF */}

              {currentLecture.pdfUrl && (
                <a
                  href={currentLecture.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Open Notes PDF
                </a>
              )}

            </div>

          ) : (

            <p>Select a lecture to start learning.</p>

          )}

        </div>

      </div>

      <UserFooter />

    </div>
  );
}

export default CourseLectures;