const { getProductService, getSingleProductService, createProductService, getUpdateProductService, getBulkUpdateProductService, getDeleteProductService, getBulkDeleteProductService } = require('../services/product.services');

// ========================= GET METHOD ============================
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
// get all data => http://localhost:5050/api/v1/product/
// http://localhost:5050/api/v1/product/?sort=price,quantity&page=1&limit=2
// 
module.exports.getProducts = async (req, res, _next) => {
    try {
        let filters = { ...req.query };

        // sort, page, limit --> exclude
        const excludeFields = ['sort', 'page', 'limit'];
        excludeFields.forEach(field => delete filters[field]);

        // gt, lt, gte, lte
        //Convert {price:{ gt:'50'}} to {price:{$ gt:50}}
        // http://localhost:5050/api/v1/product/?price[lt]=150
        let filterString = JSON.stringify(req.query)
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        // filterString = filterString.replace(/\b(gt|gte|lt|lte|in)\b/g , '$$' + "$1");
        filters = JSON.parse(filterString);

        let queries = {};

        // http://localhost:5050/api/v1/product/?page=1&limit=2
        if(req.query.page || req.query.limit){
            const {page = 1, limit = 4} = req.query;   // "3" "10"
            const skip = (page -1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        // price, quantity -> 'price quantity'
        // http://localhost:5050/api/v1/product/?sort=-price,quantity
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        }

        //fields: 'name,description' -> fields: 'name,description'
        //http://localhost:5050/api/v1/product/?fields=name,price,-_id
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        }

        const products = await getProductService(filters, queries);
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

// GET SINGLE PRODUCT => http://localhost:5050/api/v1/product/632742d18ab3d71f447c1dac
module.exports.getSingleProducts = async (req, res, _next) => {
    try {
        const product = await getSingleProductService();
        res.status(200).json({
            status: "success",
            data: product
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            data: "Can't get data.",
            message: error.message
        })
    }
}



// ========================= UPDATE METHOD ============================
// Update a single data => http://localhost:5050/api/v1/product/632742d18ab3d71f447c1dac
module.exports.updateProduct = async (req, res, _next) => {
    const { id } = req.params;
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

// ========================= BULK-UPDATE METHOD ============================
// Update multiple data => http://localhost:5050/api/v1/product/bulk-update
module.exports.bulkUpdateProduct = async (req, res, _next) => {
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

// ========================= DELETE METHOD ============================
// Delete a single product data => http://localhost:5050/api/v1/product/63222246e6df9a0bd4bb84eb
module.exports.deleteProduct = async (req, res, _next) => {
    const { id } = req.params;
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

// ========================= BULK-DELETE METHOD ============================
// Delete multiple data => http://localhost:5050/api/v1/product/bulk-delete
module.exports.bulkDeleteProduct = async (req, res, _next) => {
    try {
        const result = await getBulkDeleteProductService(req.body);
        if (!result.deletedCount) {
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

