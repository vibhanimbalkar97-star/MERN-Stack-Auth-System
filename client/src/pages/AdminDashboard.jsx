import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, removeUser, setPage } from "../features/user/userSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users, page, totalPages, isError, isLoading, message } = useSelector(
    (state) => state.user,
  );
  const { accessToken } = useSelector((state) => state.auth);

  // fetch users
  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUsers({ page, limit: 2 }));
    }
  }, [page, accessToken, dispatch]);

  console.log(users);

  // 🗑 delete
  const handleDelete = (id) => {
    dispatch(removeUser(id));
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6 mt-10">
      <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
      {isError && <p className="text-red-500 mb-4">{message}</p>}
      <h3 className="text-lg font-semibold">User Mangement</h3>
      <ul className="space-y-2">
        {users?.map((user) => (
          <li key={user._id}>
            <span>
              {user.username} ({user.email}) - {user.role}
            </span>
            {user.role !== "admin" && (
              <button
                onClick={() => handleDelete(user._id)}
                className="ml-4 bg-red-600 text-white p-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div>
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              className={`px-3 py-1 rounded ${
                page === pageNumber ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              key={pageNumber}
              onClick={() => dispatch(setPage(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
