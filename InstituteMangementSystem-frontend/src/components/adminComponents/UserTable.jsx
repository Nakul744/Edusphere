function UsersTable({
  users,
  page,
  setPage,
  totalPages,
  handleDelete,
  currentUserEmail
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-10">

      <h2 className="text-xl font-semibold mb-4">All Users</h2>

      <table className="min-w-full text-left">

        <thead>
          <tr className="border-b text-gray-600 text-sm">
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-50"
            >

              <td className="py-3 px-4">{user.email}</td>

              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.role === "ADMIN"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {user.role}
                </span>
              </td>

              {/* Delete Button */}
              <td className="py-3 px-4">

                {user.email !== currentUserEmail && (
                  <button
                    onClick={() => handleDelete(user.email)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                )}

              </td>

            </tr>
          ))}

        </tbody>

      </table>

      {/* Pagination */}

      <div className="flex justify-between items-center mt-6">

        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Previous
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

        <button
          disabled={page + 1 === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default UsersTable;