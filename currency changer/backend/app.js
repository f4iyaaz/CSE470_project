require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiLimiter = require("./middlewares/rateLimiter");
const corsOptions = require("./middlewares/corsOptions");
const currencyRoutes = require("./routes/currencyRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes");
const AuthRouter = require("./routes/auth.route.js");
const path = require("path");
const { connectDB } = require("./db.js");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(express.json());
app.use(apiLimiter);
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use("/api", currencyRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", AuthRouter);

// Start the Server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}...`);
});
