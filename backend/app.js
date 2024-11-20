require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const PORT = process.env.PORT || 5000;
const app = express();

const API_URL = "https://v6.exchangerate-api.com/v6/";
const API_KEY = process.env.EXCHANGE_RATE_API_KEY;

// Rate Limiter Middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

// CORS Options
const corsOptions = {
  origin: ["http://localhost:5173"],
};

// Middlewares
app.use(express.json());
app.use(apiLimiter);
app.use(cors(corsOptions));

// Currency Conversion Endpoint for Bulk Conversion
app.post('/api/convert', async (req, res) => {
  try {
    const { conversions } = req.body;
    if (!conversions || conversions.length === 0) {
      return res.status(400).json({ message: "No conversions provided" });
    }

    const conversionResults = [];

    for (const conversion of conversions) {
      const { from, to, amount } = conversion;
      console.log({ from, to, amount });

      // Construct the API URL for each conversion
      const url = `${API_URL}/${API_KEY}/pair/${from}/${to}/${amount}`;
      const response = await axios.get(url);

      if (response.data && response.data.result === 'success') {
        conversionResults.push({
          from,
          to,
          amount,
          conversionRate: response.data.conversion_rate,
          convertedAmount: response.data.conversion_result,
        });
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
    res.status(500).json({ message: "Error converting currency", details: error.message });
  }
});

// Start the Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));


