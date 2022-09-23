
const Product = require("../models/Product");
exports.getProductService = async (filters, queries) => {
    console.log("Filters",filters, "queries", queries);
    const products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy)
    const total = await Product.countDocuments(filters)
    const page = Math.ceil(total / queries.limit)
    return {total, page, products};
}
exports.getSingleProductService = async () => {
    const product = await Product.findOne({});
    return product;
}

exports.createProductService = async (data) => {
    const product = new Product(data);
    const result = await product.save();
    return result;
}

exports.getUpdateProductService = async (productId, data) => {
    const result = await Product.updateOne({ _id: productId }, { $set: data }, { runValidators: true })
    // Or
    // const product = await Product.findById(productId);
    // const result = await product.set(data).save();
    return result;
}

// Bulk update receive formate. 
// {
//     "ids": [
//       {
//         "id": "63222246e6df9a0bd4bb84eb",
//         "data": {
//           "price": 130
//         }
//       },
//       {
//         "id": "63222270e6df9a0bd4bb84ed",
//         "data": {
//           "price": 120
//         }
//       }
//     ]
//   }

exports.getBulkUpdateProductService = async (data) => {
    // const result = await Product.updateMany({ _id: data.ids.id }, { $set: data.ids.data }, { runValidators: true })

    let products = [];
    data.ids.forEach(product => {
        products.push(Product.updateOne({ _id: product.id }, product.data));
    });
    const result = await Promise.all(products);
    console.log(result);
    return result;
}


exports.getDeleteProductService = async (productId) => {
    const result = await Product.deleteOne({ _id: productId }, { runValidators: true })
    // Or
    // const product = await Product.findById(productId);
    // const result = await product.set(data).save();
    return result;
}

// Bulk delete input format 
// {
//     "ids": [
//         "632c5028808d971f60e9f85e",
//         "632c46cb3ff8b514e0692829"
//     ]
// }

exports.getBulkDeleteProductService = async (ids) => {
    const result = await Product.deleteMany({ _id: ids.ids });
    return result;
}