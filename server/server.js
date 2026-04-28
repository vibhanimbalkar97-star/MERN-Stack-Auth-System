const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route.js");
const userRoutes = require("./routes/users.route.js");

// db connection
connectDB();

app.use(express.json());

app.use(
  cors({
    origin: "http", //FE url
    credentials: true,
  }),
);

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Port started at ${PORT}`);
});
