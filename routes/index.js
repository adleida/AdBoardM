var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: '投放管理系统' ,
        user : req.user
    });
});

module.exports = router;
