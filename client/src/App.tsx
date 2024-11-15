import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import SignUpPage from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import PeoplePage from "./pages/People";
import PostDetails from "./pages/Post";

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

  return (
    <Router>
      <div>
        <nav>
          {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
        </nav>

        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={
              !isAuthenticated ? (
                <SignUpPage
                  setAuth={setIsAuthenticated}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginPage
                  setAuth={setIsAuthenticated}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/post/:postid"
            element={
              isAuthenticated ? <PostDetails/> : <Navigate to="/login" />
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
      </div>
    </Router>
  );
};

export default App;
