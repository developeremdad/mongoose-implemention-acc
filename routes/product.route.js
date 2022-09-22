const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

console.log("product controller", productController);

router
  .route("/")
    .post(productController.createProduct)
    .get(productController.getProducts)

router.route("/:id")
    .patch(productController.updateProduct)

module.exports = router;