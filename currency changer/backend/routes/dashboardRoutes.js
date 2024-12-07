const express = require("express");
const {
  getDashboard,
  updateDashboard,
} = require("../controllers/dashboardController");

const router = express.Router();

// Route to get user dashboard (recent conversions and favorite pairs)
router.get("/:userId", getDashboard);

// Route to update user dashboard (e.g., favorite pairs)
router.post("/:userId", updateDashboard);

module.exports = router;
