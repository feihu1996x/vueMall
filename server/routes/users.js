var express = require('express');
var router = express.Router();
var UserModel = require('./../models/User');
var common = require('./../utils/common');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', (req, res, next) => {
    let params = {
        userName: req.body.userName,
        userPwd: req.body.userPwd,
    };
    UserModel.findOne(params, (err, userDoc)=>{
        if(err){
            res.json({
                code: 1,
                count: 0,
                msg: err.message,
                data: []
            });
        }else{
            if(userDoc){
                res.cookie("userId", userDoc.userId, {
                    path: "/",
                    maxAge: 1000*60*60,
                });     
                // req.session.user = userDoc;
                res.json({
                    code: 0,
                    count: userDoc.length,
                    msg: "操作成功~",
                    data: userDoc
                });
            }else{
                res.json({
                    code: 1,
                    count: 0,
                    msg: "用户不存在~",
                    data: []
                });
            }
        }
    });
});

router.post("/logout", (req, res, next)=>{
    res.cookie("userId", "", {
        path: "/",
        maxAge: -1,
    });
    res.json({
        code: 0,
        count: 0,
        msg: "操作成功~",
        data: [],
    });
});

router.get("/checkLogin", (req, res, next)=>{
    let userId = req.cookies.userId;
    if(userId){
        UserModel.findOne({userId}, (err, userDoc)=>{
            if(err){
                res.json({
                    code: 1,
                    count: 0,
                    msg: err.messages,
                    data: []
                });
            }else{
                if(userDoc){
                    res.json({
                        code: 0,
                        count: 1,
                        msg: "操作成功~",
                        data: userDoc
                    });
                }else{
                    res.json({
                        code: 1,
                        count: 0,
                        msg: "用户不存在～",
                        data: []                        
                    });                    
                }
            }
        });
    }else{
        res.json({
            code: 1,
            count: 0,
            msg: "用户未登录～",
            data: []                        
        });             
    }
});

router.get("/cartList", (req, res, next)=>{
    let userId = req.cookies.userId;
    UserModel.findOne({userId}, (err, userDoc)=>{
        if(err){
            res.json({
                code: 1,
                count: 0,
                msg: err.message,
                data: []
            });
        }else{
            if(userDoc){
                res.json({
                    code: 0,
                    count: userDoc.cartList.length,
                    msg: "操作成功~",
                    data: userDoc.cartList
                });
            }else{
                res.json({
                    code: 1,
                    count: 0,
                    msg: "用户不存在~",
                    data: []
                });
            }
        }
    });
});

router.post("/delCart", (req, res, next)=>{
    let userId = req.cookies.userId;
    let productId = req.body.productId;
    UserModel.update({userId},{
        $pull: {
            "cartList": {
                productId
            }
        }
    }, (err, userDoc)=>{
        if(err){
            res.json({
                code: 1,
                count: 0,
                msg: err.message,
                data: []
            });
        }else{
            res.json({
                code: 0,
                count: 1,
                msg: "操作成功~",
                data: userDoc
            });
        }
    });
});

router.post("/cartEdit", (req, res, next)=>{
    let userId = req.cookies.userId,
        productId = req.body.productId,
        productNum = req.body.productNum,
        checked = req.body.checked;
    UserModel.update({
        "userId": userId,
        "cartList.productId": productId,
    }, {
        "cartList.$.productNum": productNum,
        "cartList.$.checked": checked,
    }, (err, userDoc)=>{
        if(err){
            res.json({
                code: 1,
                count: 0,
                msg: err.message,
                data: []
            });
        }else{
            res.json({
                code: 0,
                count: 1,
                msg: "操作成功～",
                data: userDoc
            });
        }
    });
});

router.post("/editCheckAll", (req, res, next)=>{
    let userId = req.cookies.userId,
        checkAll = req.body.checkAll;
    UserModel.findOne({userId},(err, userDoc)=>{
        if(err){
            res.json({
                code: 1,
                count: 0,
                msg: err.message,
                data: []
            });
        }else{
            if(userDoc){
                userDoc.cartList.forEach((item)=>{
                    item.checked = checkAll?"1":"0";
                });
                userDoc.save((err, userDoc)=>{
                    if(err){
                        res.json({
                            code: 1,
                            count: 0,
                            msg: err.message,
                            data: []
                        });                        
                    }else{
                        res.json({
                            code: 0,
                            count: 1,
                            msg: "操作成功~",
                            data: userDoc
                        });
                    }
                });
            }else{
                res.json({
                    code: 1,
                    count: 0,
                    msg: "用户不存在~",
                    data: []
                });
            }
        }
    });
});

router.get("/addressList", (req, res, next)=>{
    let userId = req.cookies.userId;
    UserModel.findOne({
        userId
    }, (err, userDoc)=>{
        if(err){
            res.json({
                code: 1,
                count: 0,
                msg: err.message,
                data: []
            });
        }else{
            if(userDoc){
                res.json({
                    code: 0,
                    count: userDoc.addressList.length,
                    msg: "操作成功~",
                    data: userDoc.addressList
                });
            }else{
                res.json({
                    code: 1,
                    count: 0,
                    msg: "用户不存在~",
                    data: []
                });
            }
        }
    });
});

router.post("/setDefaultAddress", (req, res, next)=>{
    let userId = req.cookies.userId,
         addressId = req.body.addressId;
    if(!addressId){
        res.json({
            code: 1,
            count: 0,
            msg: '操作失败~',
            data: []
        });
    }else{
        UserModel.findOne({
            userId
        }, (err, userDoc)=>{
            if(err){
                res.json({
                    code: 1,
                    count: 0,
                    msg: err.message,
                    data: []
                });
            }else{
                if(!userDoc){
                    res.json({
                        code: 1,
                        count: 0,
                        msg: "操作失败～",
                        data: []
                    });
                }else{
                    let addressList = userDoc.addressList;
                    addressList.forEach((item)=>{
                        if(addressId == item.addressId){
                            item.isDefault = true;
                        }else{
                            item.isDefault = false;
                        }
                    });
                    userDoc.save((err, userDoc)=>{
                        if(err){
                            res.json({
                                code: 1,
                                count: 0,
                                msg: err.message,
                                data: []
                            });
                        }else{
                            res.json({
                                code: 0,
                                count: 1,
                                msg: "操作成功~",
                                data: userDoc
                            });
                        }
                    });
                }
            }
        });
    }
});

router.post("/delAddress", (req, res, next)=>{
    let userId = req.cookies.userId,
         addressId = req.body.addressId;
    UserModel.update({
        userId
    }, {
        $pull: {
            addressList: {
                addressId: addressId
            }
        }
    }, (err, userDoc)=>{
        if(err){
            res.json({
                code: 1,
                count: 0,
                msg: err.message,
                data: []
            });
        }else{
            res.json({
                code: 0,
                count: 1,
                msg: "操作成功~",
                data: userDoc
            });
        }
    });
});

router.post("/payMent", (req, res, next)=>{
    let userId = req.cookies.userId,
         orderTotal = req.body.orderTotal,
         addressId = req.body.addressId;
    UserModel.findOne({
        userId
    }, (err, userDoc)=>{
        if(err){
            res.json({
                code: 1,
                count: 0,
                msg: err.message,
                data: []
            });
        }else{
            if(!userDoc){
                res.json({
                    code: 1,
                    count: 0,
                    msg: "用户不存在~",
                    data: []
                });
            }else{
                let address = null,
                     goodsList = [];
                userDoc.addressList.forEach((item)=>{
                    if(addressId == item.addressId){
                        address = item;
                    }
                });
                userDoc.cartList.forEach((item)=>{
                    if("1" == item.checked){
                        goodsList.push(item);
                    }
                });
                let platForm = '622';
                let r1 = Math.floor(Math.random()*10);
                let r2 = Math.floor(Math.random()*10);
                let sysDate = new Date().Format("yyyyMMddhhmmss");
                let createdTime = new Date().Format('yyyy-MM-dd hh:mm:ss');
                let orderId = platForm + r1 + sysDate + r2 + userId;
                let order = {
                    orderId: orderId,
                    createdTime: createdTime,
                    orderTotal: orderTotal,
                    addressInfo: address,
                    goodsList: goodsList,
                    orderStatus: '1'
                };
                userDoc.orderList.push(order);
                userDoc.save((err, doc)=>{
                    if(err){
                        res.json({
                            code: 1,
                            count: 0,
                            msg: err.message,
                            data: []
                        });
                    }else{
                        res.json({
                            code: 0,
                            count: 1,
                            msg: "操作成功~",
                            data: order,
                        });
                    }
                });
            }
        }
    });
});

router.get("/orderDetail", (req, res, next)=>{
    let userId = req.cookies.userId,
         orderId = req.param("orderId");
    UserModel.findOne({
        userId
    },(err, userDoc)=>{
        if(err){
            res.json({
                code: 1,
                count: 0,
                msg: err.message,
                data: ''
            });
        }else{
            if(userDoc){
                let orderList = userDoc.orderList;
                if(orderList.length>0){
                    let order = null;
                    orderList.forEach((item)=>{
                        if(orderId == item.orderId){
                            order = item;
                        }
                    });
                    if(order){
                        res.json({
                            code: 0,
                            count: 1,
                            msg: "操作成功~",
                            data: order
                        });
                    }else{
                        res.json({
                            code: 1,
                            count: 0,
                            msg: "订单信息不存在~",
                            data: []
                        });                        
                    }
                }else{
                    res.json({
                        code: 1,
                        count: 0,
                        msg: "订单信息不存在~",
                        data: []
                    });
                }
            }else{
                res.json({
                    code: 1,
                    count: 0,
                    msg: "用户不存在~",
                    data: []
                });
            }
        }
    });
});

router.get("/getCartCount", (req, res, next)=>{
    let userId = req.cookies.userId;
    UserModel.findOne({
        userId
    }, (err, userDoc)=>{
        if(err){
            res.json({
                code: 1, 
                count: 0,
                msg: err.message,
                data: []
            });
        }else{
            if(!userDoc){
                res.json({
                    code: 1,
                    count: 0,
                    msg: "用户不存在~",
                    data: []
                });
            }else{
                let cartList = userDoc.cartList,
                     cartCount = 0;
                cartList.forEach((item)=>{
                    cartCount += parseInt(item.productNum);
                });
                res.json({
                    code: 0,
                    count: 1,
                    msg: "操作成功~",
                    data: cartCount
                });
            }
        }
    });
});

module.exports = router;
