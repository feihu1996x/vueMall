var mongoose = require('mongoose');
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

module.exports = mongoose;