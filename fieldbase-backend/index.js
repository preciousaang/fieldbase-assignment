const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const apiRoutes = require("./routes/api");
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
require("./core/db");

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
