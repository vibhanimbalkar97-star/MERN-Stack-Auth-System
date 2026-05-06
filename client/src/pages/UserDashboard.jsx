import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/user/userSlice";
import { useEffect } from "react";

const UserDashboard = () => {
  const dispatch = useDispatch();

  const { profile, isLoading, isError, message } = useSelector(
    (state) => state.user,
  );

  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchProfile());
    }
  }, [accessToken, dispatch]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      {isError && <p className="text-red-500 mb-4">{message}</p>}
      {profile && (
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold">Profile Information</h3>
          <p>
            <strong>Username:</strong> {profile.username}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Role:</strong> {profile.role}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
