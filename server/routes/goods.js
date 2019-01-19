var express = require('express');
var router = express.Router();
var GoodsModel = require('./../models/Goods');
var UserModel = require('./../models/User');

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

router.post('/addCart', (req, res, next)=>{
    let userId = '100000077';
    let productId = req.body.productId;
    UserModel.findOne({userId:userId}, (err1, userDoc)=>{
        if(err1){
            res.json({
                code: 1,
                count: 0,
                msg: err1.message,
                data:[]
            });
        }else{
            if(userDoc){
                let goodsItem = '';
                userDoc.cartList.forEach((item)=>{
                    if(productId==item.productId){
                        goodsItem = item;
                        item.productNum++;
                    }
                });
                if(!goodsItem){
                    GoodsModel.findOne({productId}, (err2, goodsDoc)=>{
                        if(err2){
                            res.json({
                                code: 1,
                                count: 0,
                                msg: err2.message,
                                data:[]
                            });                        
                        }else{
                            if(goodsDoc){
                                goodsDoc.productNum = 1;
                                goodsDoc.checked = 1;
                                userDoc.cartList.push(goodsDoc);
                                userDoc.save((err3, doc3)=>{
                                    if(err3){
                                        res.json({
                                            code: 1,
                                            count: 0,
                                            msg: err3.message,
                                            data:[]
                                        });                                           
                                    }else{
                                        res.json({
                                            code: 0,
                                            count: doc3.length,
                                            msg: "操作成功~",
                                            data: doc3
                                        });                                  
                                    }
                                });
                            }
                        }
                    });                    
                }else{
                    userDoc.save((err3, doc3)=>{
                        if(err3){
                            res.json({
                                code: 1,
                                count: 0,
                                msg: err3.message,
                                data:[]
                            });                                           
                        }else{
                            res.json({
                                code: 0,
                                count: doc3.length,
                                msg: "操作成功~",
                                data:doc3
                            });                                  
                        }
                    });                    
                }
            }
        }        
    });
});

module.exports = router;