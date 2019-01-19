var mongoose = require('./../utils/db');
var Schema = mongoose.Schema;
var productSchema = new Schema({
    "productId": {type: String},
    "productName": {type: String},
    "salePrice": {type: Number},
    "productImage": {type: String},
    "checked":String,
    "productNum":Number,    
});

module.exports = mongoose.model('Goods', productSchema, 'goods');