import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout"; // Include the Logout button
import "../Dashboard.css"; // Optional: Add custom styles for the dashboard

function Dashboard() {
  const [conversionHistory, setConversionHistory] = useState([]);
  const username = localStorage.getItem("loggedInUser"); // Assuming username is stored in localStorage

  useEffect(() => {
    // Fetch conversion history from localStorage (or API)
    const history = JSON.parse(localStorage.getItem("conversionHistory")) || [];
    setConversionHistory(history);
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {username}!</h1> {/* Display the username */}
        <Logout /> {/* Logout button */}
      </header>

      <main className="dashboard-main">
        <h2>Your Conversion History</h2>
        
        {conversionHistory.length > 0 ? (
          <table className="history-table">
            <thead>
              <tr>
                <th>From Currency</th>
                <th>To Currency</th>
                <th>Amount</th>
                <th>Converted Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {conversionHistory.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.fromCurrency}</td>
                  <td>{entry.toCurrency}</td>
                  <td>{entry.amount}</td>
                  <td>{entry.convertedAmount}</td>
                  <td>{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No conversion history found.</p>
        )}

        {/* Optionally, add links for other pages */}
        <div className="dashboard-links">
          <Link to="/currencyconverter">Go to Currency Converter</Link>
          
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
