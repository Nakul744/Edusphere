function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

      {/* Total Users */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-gray-500 text-sm">Total Users</h3>
        <p className="text-3xl font-bold text-blue-600">
          {stats?.totalUsers || 0}
        </p>
      </div>

      {/* Total Students */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-gray-500 text-sm">Total Students</h3>
        <p className="text-3xl font-bold text-green-600">
          {stats?.totalStudents || 0}
        </p>
      </div>

      {/* Total Enrollments */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-gray-500 text-sm">Total Enrollments</h3>
        <p className="text-3xl font-bold text-purple-600">
          {stats?.totalEnrollments || 0}
        </p>
      </div>

      {/* Total Revenue */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-gray-500 text-sm">Total Revenue</h3>
        <p className="text-3xl font-bold text-emerald-600">
          ₹ {stats?.totalRevenue || 0}
        </p>
      </div>

    </div>
  );
}

export default StatsCards;