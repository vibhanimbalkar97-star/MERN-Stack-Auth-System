const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route.js");
const userRoutes = require("./routes/users.route.js");
const errorHandler = require("./middleware/error.middleware.js");

// db connection
connectDB();

app.use(express.json());

app.use(
  cors({
    origin: "https://mern-stack-auth-system.vercel.app", //FE url
    credentials: true,
  }),
);

app.use(cookieParser());

// for cookies important on render
app.set("trust proxy", 1);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// error middleware always at bottom
app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log(`Port started at ${PORT}`);
});
