const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error: ${error.message}");
    process.exit(1);
  }
};