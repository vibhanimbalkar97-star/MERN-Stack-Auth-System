const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb connect at ${conn.connection.host}`);
  } catch (err) {
    console.log("Error connecting to Mongodb:", err);
    process.exit(1); //exit the process with failure
  }
};

module.exports = connectDB;
