const { getProductService, createProductService } = require('../services/product.services');


module.exports.createProduct = async (req, res, _next) => {
    try {
        const result = createProductService(req.body);
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
}

// ========================= GET METHOD ============================
module.exports.getProducts = async (req, res, _next) => {
    try {
        const products = await getProductService();
        res.status(200).json({
            status: "success",
            data: products
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            data: "Can't get data.",
            message: error.message
        })
    }
}

