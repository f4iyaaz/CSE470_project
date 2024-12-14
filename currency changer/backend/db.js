const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO);
    console.log(`MongoDb Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error: ${error.message}");
    process.exit(1);
  }
};
