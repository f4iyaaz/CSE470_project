import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css"; // Import the new CSS file for Dashboard

function Dashboard({ userId }) {
  const [dashboard, setDashboard] = useState({
    recentConversions: [],
    favoritePairs: [],
    layout: "default",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/dashboard/${userId}`, {
        headers: { "user-id": userId }, // Send userId in headers
      })
      .then((response) => {
        setDashboard(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, [userId]);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">User Dashboard</h1>
      <div className="dashboard-content">
        <div className="dashboard-item">
          <h3>Recent Conversions</h3>
          <ul>
            {dashboard.recentConversions.map((conversion, index) => (
              <li key={index}>
                {conversion.from} to {conversion.to}:{" "}
                {conversion.convertedAmount} ({conversion.conversionRate})
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-item">
          <h3>Favorite Currency Pairs</h3>
          <ul>
            {dashboard.favoritePairs.map((pair, index) => (
              <li key={index}>
                {pair.from} - {pair.to}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
