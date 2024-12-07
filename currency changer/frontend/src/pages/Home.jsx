import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CurrencyConverter.css";
import { Link } from "react-router-dom";
import Logout from "./Logout"; // Import Logout component

function Converter() {
  const [formData, setFormData] = useState([{ from: "", to: "", amount: "" }]);
  const [conversionResults, setConversionResults] = useState([]);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const currencyCodes = ["USD", "EUR", "GBP", "GHS", "JPY", "CAD"];

  // Dummy userId for now, replace with actual userID when you implement login
  const userId = "user123"; // Dummy user ID

  // Load history from localStorage on initial load
  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("conversionHistory")) || [];
    setHistory(storedHistory);
  }, []);

  // Handle input changes for each conversion row
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newFormData = [...formData];
    newFormData[index][name] = value;
    setFormData(newFormData);
  };

  // Add a new conversion row
  const addConversionRow = () => {
    setFormData([...formData, { from: "", to: "", amount: "" }]);
  };

  // Remove a conversion row
  const removeConversionRow = (index) => {
    const newFormData = formData.filter((_, i) => i !== index);
    setFormData(newFormData);
  };

  // Handle form submission for bulk conversion
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/convert",
        {
          conversions: formData,
        },
        {
          headers: {
            "user-id": userId, // Pass userId in headers
          },
        }
      );

      const newHistory = [...history, ...response.data.conversions];
      setHistory(newHistory);
      localStorage.setItem("conversionHistory", JSON.stringify(newHistory)); // Save to localStorage

      setConversionResults(response.data.conversions);
      setError("");
    } catch (err) {
      setError("Error converting currencies.");
    }
  };

  // Handle history reset
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("conversionHistory"); // Clear from localStorage
  };

  return (
    <div>
      <section className="hero">
        <h1>Global Currency Converter</h1>
        <p>
          Convert currencies effortlessly with our reliable and user-friendly
          tool.
        </p>
        {/* Display Logout Button here */}
        <Logout /> {/* You can move this button anywhere within your JSX */}
      </section>

      <section className="converter">
        <form onSubmit={handleSubmit}>
          {formData.map((conversion, index) => (
            <div key={index} className="conversion-row">
              <select
                name="from"
                value={conversion.from}
                onChange={(e) => handleChange(index, e)}
                className="input"
              >
                <option value="">Select From Currency</option>
                {currencyCodes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
              <select
                name="to"
                value={conversion.to}
                onChange={(e) => handleChange(index, e)}
                className="input"
              >
                <option value="">Select To Currency</option>
                {currencyCodes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
              <input
                name="amount"
                value={conversion.amount}
                onChange={(e) => handleChange(index, e)}
                placeholder="Amount"
                type="number"
                className="input"
              />
              {formData.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeConversionRow(index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addConversionRow} className="add-btn">
            Add Conversion
          </button>
          <button type="submit" className="submit-btn">
            Convert
          </button>
        </form>

        {/* Display Conversion Results */}
        {conversionResults.length > 0 && (
          <div className="results">
            <h2>Conversion Results</h2>
            {conversionResults.map((result, index) => (
              <div key={index} className="result">
                <p>
                  {result.amount} {result.from} = {result.convertedAmount}{" "}
                  {result.to}
                </p>
                <p>Conversion Rate: {result.conversionRate}</p>
                {result.error && <p className="error">{result.error}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Display Conversion History */}
        {history.length > 0 && (
          <div className="history">
            <h2>Conversion History</h2>
            <table>
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Amount</th>
                  <th>Converted Amount</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.from}</td>
                    <td>{entry.to}</td>
                    <td>{entry.amount}</td>
                    <td>{entry.convertedAmount}</td>
                    <td>{entry.conversionRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={clearHistory} className="clear-history-btn">
              Clear History
            </button>
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </section>
    </div>
  );
}

export default Converter;
