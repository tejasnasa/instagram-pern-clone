import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import SignUpPage from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import PeoplePage from "./pages/People";
import PostDetails from "./pages/ViewPost";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const shouldShowNavbar = () => {
    const location = window.location.pathname;
    return !["/login", "/signup"].includes(location);
  };

  return (
    <Router>
      <main className="flex">
        {isAuthenticated && shouldShowNavbar() && (
          <Navbar handleLogout={handleLogout} />
        )}
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={
              !isAuthenticated ? (
                <SignUpPage setAuth={setIsAuthenticated} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginPage setAuth={setIsAuthenticated} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/post/:postid"
            element={
              isAuthenticated ? <PostDetails /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/create"
            element={
              isAuthenticated ? <CreatePost /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile/:id"
            element={
              isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/people"
            element={
              isAuthenticated ? <PeoplePage /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
