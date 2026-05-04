import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const { accessToken } = useSelector((state) => state.auth);
  

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = async () => {
     try {
      await dispatch(logoutUser()).unwrap(); // throws error if failed
      navigate('/login')
     } catch(error) {
       console.error("Logout failed", error)
     }
  }

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white mr-4">
          Home
        </Link>
        <div>
          {accessToken ? (
            <>
              <button className="bg-red-600 py-2 px-3 rounded-lg hover:bg-red-700" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">Login</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
