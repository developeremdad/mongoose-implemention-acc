const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

console.log("product controller", productController);

router
    .route("/")
    .post(productController.createProduct)
    .get(productController.getProducts)

router.route("/bulk-update")
    .patch(productController.bulkUpdateProduct)
router.route("/bulk-delete")
    .delete(productController.bulkDeleteProduct)

router.route("/:id")
    .patch(productController.updateProduct)

    router.route("/:id")
    .delete(productController.deleteProduct)


module.exports = router;