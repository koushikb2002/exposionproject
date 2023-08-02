import {useReducer, useEffect } from "react";
import AuthReducer from "./context/AuthReducer";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Mainp from "./pages/mainpage/Mainp";
import Elib from "./pages/elibrary/Elib";
import Student from "./pages/studentaffairs/Student";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate,useLocation } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";
import Pypapers from "./pages/pypapers/Pypapers";
import Progrmmaterial from "./pages/progrmmaterial/Progrmmaterial";
import Rspapers from "./pages/rspapers/Rspapers";
import Studymaterials from "./pages/studymaterials/Studymaterials";


const userExpiration = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

function checkUserExpiration() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && (Date.now() - storedUser.timestamp < userExpiration)) {
    // Update the user's timestamp to the current time
    storedUser.timestamp = Date.now();
    localStorage.setItem("user", JSON.stringify(storedUser));
    return storedUser.user;
  }

  // User data has expired, remove it from local storage
  localStorage.removeItem("user");
  return null;
}

const App = () => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: checkUserExpiration(),
    isFetching: false,
    error: false,
  });

  useEffect(() => {
    if (state.user) {
      localStorage.setItem(
        "user",
        JSON.stringify({ user: state.user, timestamp: Date.now() })
      );
    }
  }, [state.user]);


  // const navigate = useNavigate(); // Get the navigate function from React Router

  // const handleLinkClick = () => {
  //   // Delete the stored user when a particular link is clicked
  //   localStorage.removeItem("user");
  //   navigate("/login"); // Redirect to the "/login" page
  // };
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              state.user ? <Mainp /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/home"
            element={
              state.user ? <Mainp /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/feeds"
            element={
              state.user ? <Home /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/feeds/profile/:username"
            element={
              state.user ? <Profile /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/elibrary"
            element={
              state.user ? <Elib /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/progrmmaterial"
            element={
              state.user ? <Progrmmaterial /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/pypapers"
            element={
              state.user ? <Pypapers /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/rspapers"
            element={
              state.user ? <Rspapers /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/studymaterials"
            element={
              state.user ? <Studymaterials /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/register"
            element={
              state.user ? <Navigate to="/" replace /> : <Register />
            }
          />
          <Route
            path="/login"
            element={
              state.user ? <Navigate to="/" replace /> : <Login />
            }
          />
          <Route
            path="/studentaffairs"
            element={
              state.user ? <Student /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/profile/:username"
            element={
              state.user ? <Profile /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/logout"
            element={<Link to="/" onClick={DeleteUserLink} />}
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};
const DeleteUserLink = () => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    // Delete the stored user when a particular link is clicked
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <Link to="/" onClick={handleLinkClick} />
      <Login />
    </>
  );
};
export default App;
