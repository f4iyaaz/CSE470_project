const express = require("express");
const router = express.Router();
const { convertCurrencies } = require("../controllers/conversionController.js");

// Route for handling conversions
router.post("/convert", convertCurrencies);

module.exports = router;
