import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

function UserFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Logo Section */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              SmartCollegeERP
            </h2>

            <p className="text-sm text-gray-400">
              A modern platform for managing college learning,
              courses, and student enrollment.
            </p>
          </div>


          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2">

              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-white transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/usercourses"
                  className="hover:text-white transition"
                >
                  Browse Courses
                </Link>
              </li>

              <li>
                <Link
                  to="/my-courses"
                  className="hover:text-white transition"
                >
                  My Courses
                </Link>
              </li>

            </ul>
          </div>


          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Follow Us
            </h3>

            <div className="flex gap-4 text-xl">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                <FaFacebook />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                <FaTwitter />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                <FaGithub />
              </a>

            </div>
          </div>

        </div>


        {/* Bottom Section */}

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">

          © {new Date().getFullYear()} SmartCollegeERP. All rights reserved.

        </div>

      </div>

    </footer>
  );
}

export default UserFooter;