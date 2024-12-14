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

  const goToDashboard = () => {
    // Redirect to the dashboard page
    navigate("../dashboard");
  };

  return (
    <div style={styles.container}>
      <button onClick={goToDashboard} style={styles.button}>
        Dashboard
      </button>
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  container: {
    position: "absolute",
    top: "20px",
    right: "20px",
    display: "flex",
    gap: "10px", // Space between buttons
  },
  button: {
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
