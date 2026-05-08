import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        
        {/* Error Code */}
        <h1 className="text-6xl font-bold text-red-600 mb-4">
          403
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Access Denied
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          You do not have permission to access this page.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;