var express = require('express');
var router = express.Router();
var UserModel = require('./../models/User');

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

module.exports = router;
