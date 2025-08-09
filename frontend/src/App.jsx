import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Create from "./components/Create";
import Dashboard from "./components/Dashboard";
import FullNote from "./components/FullNote";
import Login from "./components/Login";
import Register from "./components/Register";
import axios from "axios";
// Main component
function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  useEffect(() => {
    const URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/users/is-logged`;
    const options = {
      withCredentials: true,
      Credential: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("in APP");
    axios
      .get(URL, options)
      .then((res) => {
        // console.log(res.data.username);
        if (res.data.success) {
          setUsername(res.data.username);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          if (
            !window.location.href.endsWith("/login") &&
            !window.location.href.endsWith("/register")
          ) {
            window.location.href = "/login";
          }
        }
      })
      .catch((error) => {
        console.log(error.response?.data || error.message);
        setIsLoggedIn(false);
        if (window.location.href.endsWith("/register")) return;
        else if (!window.location.href.endsWith("/login"))
          window.location.href = "/login";
      });
  }, []);

  console.log(username, isLoggedIn);

  return (
    <AuthContext.Provider value={{ username, isLoggedIn, setIsLoggedIn }}>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<FullNote />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
