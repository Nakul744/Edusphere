import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">

      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Edusphere
          </h2>
          <p className="text-sm text-gray-400">
            A modern institute management system designed for seamless
            administration, student management, course tracking,
            payments, and analytics.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/dashboard" className="hover:text-white">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-white">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/my-courses" className="hover:text-white">
                My Courses
              </Link>
            </li>
          </ul>
        </div>

        {/* Admin Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Admin
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/admin/dashboard" className="hover:text-white">
                Admin Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/create-admin" className="hover:text-white">
                Create Admin
              </Link>
            </li>
            <li>
              <Link to="/admin/create-course" className="hover:text-white">
                Create Course
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Contact
          </h3>

          <ul className="space-y-2 text-sm">
            <li>Email: support@smartcollege.com</li>
            <li>Phone: +91 9876543210</li>
            <li>Pune, Maharashtra, India</li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SmartCollegeERP. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;
