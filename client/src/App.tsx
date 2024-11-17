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
import PostDetails from "./pages/ViewPost";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import NotFoundPage from "./pages/NotFound";
import Header from "./components/Header";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  const ShowNavbar = () => {
    const location = useLocation();
    const noNavbarRoutes = ["/login", "/signup"];
    return (
      isAuthenticated &&
      !noNavbarRoutes.includes(location.pathname) && (
        <Navbar handleLogout={handleLogout} />
      )
    );
  };

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (isLoading) return null;
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  const PublicRoute = ({ children }: { children: JSX.Element }) => {
    if (isLoading) return null;
    return !isAuthenticated ? children : <Navigate to="/" />;
  };

  const LoadingScreen = () => <Loading />;

  return (
    <Router>
      <main className="flex">
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <ShowNavbar />
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginPage setAuth={setIsAuthenticated} />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <SignUpPage setAuth={setIsAuthenticated} />
                  </PublicRoute>
                }
              />
              <Route
                path="/post/:postid"
                element={
                  <ProtectedRoute>
                    <PostDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile/:id"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </>
        )}
      </main>
    </Router>
  );
};

export default App;
