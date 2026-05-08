import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/auth/authSlice";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { isError, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(loginUser(form)).unwrap();
      dispatch(reset());
      navigate(res.user.role === "admin" ? "/admin" : "/user");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="font-bold text-2xl mb-4">Login</h2>
      {isError && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded p-2 bg-blue-600 text-white hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
