const { getProductService, createProductService , getUpdateProductService, getBulkUpdateProductService, getDeleteProductService, getBulkDeleteProductService} = require('../services/product.services');


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
    const {limit} = req.query;
    try {
        const products = await getProductService(limit);
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

module.exports.updateProduct = async (req, res, _next) =>{
    const {id} = req.params;
    const data = req.body;
    try {
        const result = await getUpdateProductService(id, data);
        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            data: "Can't update data.",
            message: error.message
        })
    }
}


module.exports.bulkUpdateProduct = async (req, res, _next) =>{
    const data = req.body;
    // console.log(data.ids.data);
    try {
        const result = await getBulkUpdateProductService(data);
        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            data: "Can't update data.",
            message: error.message
        })
    }
}


module.exports.deleteProduct = async (req, res, _next) =>{
    const {id} = req.params;
    try {
        const result = await getDeleteProductService(id);
        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                data: "Can't delete data.",
                message: "Insert a valid id"
            })
        }
        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            data: "Can't delete data.",
            message: error.message
        })
    }
}


module.exports.bulkDeleteProduct = async (req, res, _next) =>{
    try {
        const result = await getBulkDeleteProductService(req.body);
        if (! result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                data: "Couldn't deleted data.",
                message: "Please insert valid Ids"
            })
        }
        res.status(200).json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            data: "Couldn't delete data.",
            message: error.message
        })
    }
}

