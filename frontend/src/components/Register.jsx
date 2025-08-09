import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const Register = () => {
  // State Variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    // console.log(username, email, password);

    const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/signup`;
    const body = { user_name: username, password };
    const headers = { "Content-Type": "application/json" };
    // console.log(body);

    // POST user data to /signup on backend
    axios
      .post(url, body, { headers })
      .then((res) => {
        if (res.data.success) {
          setHint(res.data.message);
          navigate("/login");
        }
      })
      .catch((err) => {
        // console.log(err.response.data);
        if (err.response?.data?.error) {
          setHint(err.response.data.error);
        } else {
          setHint("User validation failed. Input valid credentials");
        }
      });
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white font-sans flex items-center justify-center bg-pattern">
      <div className="glass-effect rounded-2xl p-8 shadow-soft w-11/12 sm:w-9/12 md:w-7/12 lg:w-5/12">
        <div className="mb-6">
          <h1 className="text-4xl font-bold">It's our pleasure to have you here.</h1>
          <p className="capitalize text-2xl mt-3 text-gray-300">Let's register you!</p>
        </div>

        {hint && (
          <p className="w-full text-center mb-4 text-base text-gray-200">{hint}</p>
        )}

        <div className="space-y-3">
          <input
            type="text"
            className="input-modern w-full"
            placeholder="Username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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

        <button className="btn-primary w-full mt-5" onClick={handleSubmit}>
          Submit
        </button>

        <p className="text-center text-gray-300 mt-3">
          Have an account already?&nbsp;
          <Link to="/login" className="underline text-primary-400 hover:text-primary-300">
            Login to your account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
