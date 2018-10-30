var express = require('express');
var router = express.Router();
var GoodsModel = require('./../models/Goods');

router.get('/list', (req, res, next)=>{
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let sort = req.param("sort");
    let params = {};
    let priceLevel = req.param("priceLevel");
    let startPrice = 0, endPrice = 0;
    if("all" != priceLevel){
        switch(priceLevel){
            case '0':startPrice = 0;endPrice = 100; break;
            case '1':startPrice = 100;endPrice = 500; break;
            case '2':startPrice = 500;endPrice = 1000; break;
            case '3':startPrice = 1000;endPrice = 2000; break;
        }
        params = {
            'salePrice': {
                $gt: startPrice,
                $lte: endPrice,
            }
        };
    }
    let goods_model = GoodsModel.find(params).skip((page-1)*pageSize).limit(pageSize);
    goods_model.sort({"salePrice": sort});
    goods_model.exec((err, doc)=>{
        if(err){
            res.json({
                code: 1,
                count: 0,
                msg: err.message,
                data:[]
            });
        }else{
            res.json({
                code: 0,
                count: doc.length,
                msg: "操作成功~",
                data: doc
            });
        }
    });
});

module.exports = router;