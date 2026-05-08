import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, reset } from "../features/auth/authSlice";

const register = () => {
  const [form, setForm] = useState ({
    username: "",
    email: "",
    password: "",
  });

  const { isError, message } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
      dispatch(reset())
    }, [dispatch])

  const handleRegister = async(e) => {
    e.preventDefault()
    try {
    await dispatch(registerUser(form)).unwrap()
    navigate('/login')
    } catch(err){
      console.error(err)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl ">
      {isError && <p className="text-red-500">{message}</p>}
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form className="space-y-4" onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="border w-full p-2 rounded"
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border w-full p-2 rounded"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border w-full p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 border rounded bg-blue-600 text-white hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default register;
