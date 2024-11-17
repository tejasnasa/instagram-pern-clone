// src/components/Header.tsx
import React from "react";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();

  let title = "Default Page Title";

  switch (location.pathname) {
    case "/":
      title = "Instagram";
      break;
    case "/login":
      title = "Login - Instagram";
      break;
    case "/signup":
      title = "Sign up - Instagram";
      break;
    case "/profile/:id":
      title = "Profile";
      break;
    case "/post/:id":
      title = "Post";
      break;
    case "/create":
      title = "Create Post";
      break;
    case "/people":
      title = "People";
      break;
    default:
      title = "Page Not Found";
  }

  React.useEffect(() => {
    document.title = title;
  }, [location.pathname]);

  return (
    <header className="bg-black text-white p-4">
    </header>
  );
};

export default Header;
