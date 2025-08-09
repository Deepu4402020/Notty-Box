import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../AuthContext";

const Login = () => {
  // State Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hint, setHint] = useState("");

  // Initialize navigate (v6+)
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  // TODO: CHECK IF USER IS LOGGED IN ALREADY
  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  // Functions
  const handleSubmit = () => {
    const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/signin`;
    const body = { user_name: email, password };
    const options = {
      withCredentials: true,
      Credential: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    // POST user data to /signin on backend
    axios
      .post(url, body, options)
      .then((res) => {
        setIsLoading(true);

        if (res.data.success) {
          console.log(res.data);
          setHint(res.data.message);
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsLoggedIn(false);
        if (err.response?.data?.error) {
          setHint(err.response.data.error);
        } else {
          setHint("Please input valid credentials");
        }
      });
  };
  return (
    <div className="min-h-screen bg-dark-900 text-white font-sans flex items-center justify-center bg-pattern">
      <div className="glass-effect rounded-2xl p-8 shadow-soft w-11/12 sm:w-9/12 md:w-7/12 lg:w-5/12">
        <div className="mb-6">
          <h1 className="text-4xl font-bold">Let's sign you in.</h1>
          <p className="capitalize text-2xl mt-3 text-gray-300">
            Welcome back. We missed you.
          </p>
        </div>

        {hint && (
          <p className="w-full text-center mb-4 text-base text-gray-200">
            {hint}
          </p>
        )}

        <div className="space-y-3">
          <input
            type="email"
            className="input-modern w-full"
            placeholder="Email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input-modern w-full"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full mt-5"
          onClick={handleSubmit}
        >
          Submit
        </button>

        <p className="text-center text-gray-300 mt-3">
          Don't have an account?&nbsp;
          <Link to="/register" className="underline text-primary-400 hover:text-primary-300">
            Register a new user
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
