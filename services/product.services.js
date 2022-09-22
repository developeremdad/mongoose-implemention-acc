
const Product = require("../models/Product");
exports.getProductService = async (limit) =>{
    const products = await Product.find({}).limit(+limit);
    return products;
}

exports.createProductService = async (data) =>{
    const product = new Product(data);
    const result =  await product.save();
    return result;
}

exports.getUpdateProductService= async (productId, data) =>{
    console.log(productId, data);
    const product = await Product.findById(productId);
    const result = await product.set(data).save();
    return result;
}