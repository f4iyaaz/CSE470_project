import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefrshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user has a token in localStorage, they are authenticated
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);

      // If the user is on login, signup, or the home page, redirect to /currencyconverter
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        // Replace the current page with the /currencyconverter page
        navigate("/currencyconverter", { replace: true });
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefrshHandler;
