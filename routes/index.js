var express = require('express');
var router = express.Router();
var utils = require("../src/utils");

/* GET home page. */
router.use(utils.loginRouter);

router.get('/', function(req, res, next) {
    res.render('index', {
        title: '投放管理系统' ,
        user : req.user_info
    });
});

module.exports = router;
