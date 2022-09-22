const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// routes 
const productRoute = require('./routes/product.route');

// SCHEMA --> MODEL --> QUERY


// ========================= CREATE ROUTE AND APPLY CRUD ============================

app.use("/api/v1/product/", productRoute);


app.get("/", (_req, res) => {
  res.send("Route is working! YaY!");
});


module.exports = app;
