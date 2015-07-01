var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.user){
        res.redirect("/users/");
    }else{
        res.render('index', { title: '投放管理系统' });
    }
});

module.exports = router;
