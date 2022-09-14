const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");


app.use(express.json());
app.use(cors());

// SCHEMA --> MODEL --> QUERY
// ================================= SCHEMA DESIGN ====================================
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide e name.'],
    trim: true,
    unique: [true, 'Name must be unique.'],
    minLength: [3, 'Name must be at least 3 character.'],
    maxLength: [100, 'Name is too large.']
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price can not be negative.']
  },
  unit: {
    type: String,
    required: true,
    enum: {
      values: ["kg", "litre", "pcs"],
      message: "unit value can't be {VALUE}, must be kg/liter/pcs"
    }
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "quantity can be negative."],
    validator: (value) => {
      const isInteger = Number.isInteger(value)
      if (isInteger) {
        return true
      }
      else {
        return false
      }
    },
    message: "Quantity must be an integer."
  },
  status: {
    type: String,
    enum: {
      values: ["in-stock", "out-of-stock", "discontinued"],
      message: "status can't be {VALUE}"
    }
  },
//   supplier:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Supplier"
//   },
//   categories:[{
//     name: {
//       type: String,
//       required: true
//     },
//     _id: mongoose.Schema.Types.ObjectId
// }]



  /* createdAt:{   //custom date add.
    type: Date,
    default: Date.now,
  },
  updatedAt:{   //custom date add.
    type: Date,
    default: Date.now
  } */
}, {
// it's provide mongodb auto create and update date for every schema.
// see documentation for more feature.
timestamps: true,
// _id: false
})

// ================================= MODEL ====================================
// model name must be capital letter like.
// model are accept 2 parameter. 1) model name, 2) schema name(jei schema ke model banabo.).
const Product = mongoose.model('Product', productSchema);

// ========================= CREATE ROUTE AND APPLY CRUD ============================
app.post('/api/v1/product', async (req, res, _next) =>{
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.status(200).json({
      success: true,
      message: "Data successfully inserted.",
      data: result.insertedId
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      data: "data can't store"
    })
  }
})






app.get("/", (_req, res) => {
  res.send("Route is working! YaY!");
});


module.exports = app;
