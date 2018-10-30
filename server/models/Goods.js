var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
    "productId": {type: String},
    "productName": {type: String},
    "salePrice": {type: Number},
    "productImage": {type: String}
});
var config = require('./../config');

mongoose.connect(config.MONGOOSE_URL);

mongoose.connection.on("connected", ()=>{
    console.log("MongoDB connected success");
});

mongoose.connection.on("error", ()=>{
    console.log("MongoDB connected fail");
});

mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB disconnected");
});

module.exports = mongoose.model('Goods', productSchema, 'goods');