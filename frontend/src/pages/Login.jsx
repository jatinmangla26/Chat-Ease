import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/userSlice.js";

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (error != null) {
      toast.error(error);
    }
  }, [error]);
  function handleInputErrors({ username, password }) {
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return false;
    }
    return true;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const success = handleInputErrors({
      username,
      password,
    });
    if (!success) return;
    dispatch(signInStart());
    try {
      const res = await fetch(`https://chat-ease-qx9h.onrender.com/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        console.log(data.error);
        dispatch(signInFailure(data.error));
        return;
      }
      dispatch(signInSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(signInFailure(err));
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <Link
            to="/signUp"
            className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
