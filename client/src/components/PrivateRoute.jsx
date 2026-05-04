import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children, allowedRoles }) {
  const { user, accessToken, isLoading } = useSelector(
    (state) => state.auth
  );

  //  loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  //  not logged in
  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  //  role check
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" />; 
  }

  return children;
}