import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import MyCourses from "./pages/MyCourses";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import CreateAdmin from "./pages/CreateAdmin";
import CreateCourse from "./pages/CreateCourse";
import UserCourses from "./pages/UserCourses";
import AdminAttendance from "./pages/AdminAttendance";
import MyAttendance from "./pages/MyAttendance";
import Notices from "./pages/Notices";
import CreateNotice from "./pages/CreateNotice";
import RegisterUser from "./pages/RegisterUser";
import CourseLectures from "./pages/CourseLectures";
import AdminAddLecture from "./pages/AdminAddLecture";
import AdminLectureManager from "./pages/AdminLectureManager";
import CreateAssignment from "./pages/CreateAssignment";
import Assignments from "./pages/Assignments";
import SubmitAssignment from "./pages/SubmitAssignment";
import AssignmentSubmissions from "./pages/AssignmentSubmissions";
import AdminAssignments from "./pages/AdminAssignments";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-course"
          element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-admin"
          element={
            <ProtectedRoute>
              <CreateAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usercourses"
          element={
            <ProtectedRoute>
              <UserCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute>
              <AdminAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-attendance"
          element={
            <ProtectedRoute>
              <MyAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notices"
          element={
            <ProtectedRoute>
              <Notices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-notice"
          element={
            <ProtectedRoute>
              <CreateNotice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId"
          element={
            <ProtectedRoute>
              <CourseLectures />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-lecture"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminAddLecture />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/lectures/:courseId"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLectureManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-assignment"
          element={
            <ProtectedRoute adminOnly={true}>
              <CreateAssignment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assignments/:courseId"
          element={
            <ProtectedRoute>
              <Assignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit-assignment/:assignmentId"
          element={
            <ProtectedRoute>
              <SubmitAssignment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/submissions/:assignmentId"
          element={
            <ProtectedRoute adminOnly={true}>
              <AssignmentSubmissions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/assignments/:courseId"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminAssignments />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;