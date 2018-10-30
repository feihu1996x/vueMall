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

module.exports = router;
