const Conversion = require("../models/conversion.model.js"); // MongoDB model

// Function to handle conversions
const convertCurrencies = async (req, res) => {
  try {
    const { conversions, userId } = req.body; // Get conversion data and user ID from the request

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Process and save each conversion
    const savedConversions = await Promise.all(
      conversions.map(async (conversion) => {
        const conversionRate = 1.2; // Replace with actual conversion rate logic
        const convertedAmount = conversion.amount * conversionRate;

        const newConversion = new Conversion({
          userId,
          from: conversion.from,
          to: conversion.to,
          amount: conversion.amount,
          convertedAmount,
          conversionRate,
        });

        await newConversion.save();

        return {
          from: conversion.from,
          to: conversion.to,
          amount: conversion.amount,
          convertedAmount,
          conversionRate,
        };
      })
    );

    res.status(200).json({ conversions: savedConversions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  convertCurrencies,
};
