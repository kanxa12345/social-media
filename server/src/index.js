// index.js
const express = require("express");
const userRoute = require("./routes/userRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", userRoute); // Prefix routes with /api for clarity

const port = process.env.PORT || 3000; // Fallback port

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
