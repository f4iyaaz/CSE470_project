import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and logged-in user information from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    // Redirect to login page after logging out
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} style={styles.button}>
      Logout
    </button>
  );
}

const styles = {
  button: {
    position: "absolute", // Position the button absolutely
    top: "20px", // Adjust this to control how far from the top
    right: "20px", // Adjust this to control how far from the right
    backgroundColor: "purple",
    color: "white",
    border: "none",
    fontSize: "18px",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Logout;
