const express = require("express");
const { convertCurrencies } = require("../controllers/currencyController");

const router = express.Router();

// Define the currency conversion route
router.post("/convert", convertCurrencies);

module.exports = router;
