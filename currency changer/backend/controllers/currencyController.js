const axios = require("axios");

const API_URL = "https://v6.exchangerate-api.com/v6/";
const API_KEY = process.env.EXCHANGE_RATE_API_KEY;

// Simulate in-memory storage for user-specific data (for simplicity)
const userDashboards = {}; // This will store recent conversions and favorite pairs

exports.convertCurrencies = async (req, res) => {
  try {
    const { conversions } = req.body; // You still use the same conversions format as before
    const userId = req.headers["user-id"]; // Retrieve user ID from headers (for example)
    console.log("Received userId:", userId);

    if (!conversions || conversions.length === 0) {
      return res.status(400).json({ message: "No conversions provided" });
    }

    const conversionResults = [];

    for (const conversion of conversions) {
      const { from, to, amount } = conversion;

      // Construct the API URL for each conversion
      const url = `${API_URL}/${API_KEY}/pair/${from}/${to}/${amount}`;
      const response = await axios.get(url);

      if (response.data && response.data.result === "success") {
        const result = {
          from,
          to,
          amount,
          conversionRate: response.data.conversion_rate,
          convertedAmount: response.data.conversion_result,
        };
        conversionResults.push(result);

        // Store the conversion result in userDashboards if userId exists
        if (userId) {
          if (!userDashboards[userId]) {
            userDashboards[userId] = {
              recentConversions: [],
              favoritePairs: [],
            };
          }

          // Add to the recent conversions array
          userDashboards[userId].recentConversions.unshift(result);
          // Keep only the latest 10 conversions
          if (userDashboards[userId].recentConversions.length > 10) {
            userDashboards[userId].recentConversions.pop();
          }
        }
      } else {
        conversionResults.push({
          from,
          to,
          amount,
          error: "Error converting currency",
          details: response.data,
        });
      }
    }

    res.json({ conversions: conversionResults });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error converting currency", details: error.message });
  }
};
