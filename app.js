const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");


app.use(express.json());
app.use(cors());

// routes 
const productRoute = require('./routes/product.route');

// SCHEMA --> MODEL --> QUERY


// ========================= CREATE ROUTE AND APPLY CRUD ============================
// ========================= POST METHOD ============================

// ============================= create instance ===========================
// Mongoose middlewares for saving data: pre / post
// this process are work after execute this code. before saved. 
// code : const product = new Product(req.body);
productSchema.pre('save', function(next){
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }
  console.log("Before saving.");
  next();
});

productSchema.post('save', function (doc, next) {
  console.log("After saving.");
  next();
})

// create custom method and use this route. 
productSchema.methods.logger = function () {
  console.log(`Data save ${this.name}`);
}

app.use("/api/v1/product/", productRoute);




app.get("/", (_req, res) => {
  res.send("Route is working! YaY!");
});


module.exports = app;
