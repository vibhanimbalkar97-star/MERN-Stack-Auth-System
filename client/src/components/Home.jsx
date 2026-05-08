import { useSelector } from "react-redux";

const Home = () => {
  const { user, accessToken } = useSelector((state) => state.auth);

  return (
    <>
      {!accessToken ? (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              MERN Authentication System
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl">
              Secure authentication system using JWT Access Token, Refresh
              Token, Role Based Access Control and Redux Toolkit.
            </p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 p-6">
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h1 className="text-3xl font-bold">Welcome, {user?.username}</h1>

            <p className="text-gray-600 mt-2">
              You are successfully logged in.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-semibold mb-2">Email</h2>
              <p>{user?.email}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-semibold mb-2">Role</h2>
              <p>{user?.role}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-semibold mb-2">Status</h2>
              <p className="text-green-600">Authenticated</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Home;
