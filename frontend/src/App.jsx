import { useState, useEffect } from "react";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
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
  const history = useHistory();

  useEffect(() => {
    const URL = `${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/users/is-logged`;
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
      <Router>
        <Switch>
          {/* Auth Routes */}
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>

          {/* protected Routes */}
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
          <Route exact path="/:id">
            <FullNote />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
