import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { user, accessToken, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // ✅ only check token
  if (accessToken && user) {
    return <Navigate to="/" replace />;
  }

  return children;
}