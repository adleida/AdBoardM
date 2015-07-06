/**
 * Created by kliu on 01/07/2015.
 */

var express = require('express');
var router = express.Router();
var utils = require("../src/utils");

/**
 * list all current screens
 */
router.use(utils.loginRouter);
router.get('/', function(req, res, next) {
    var data = {};
    if(req.user_info){
        data['user'] = req.user_info;
    }
    res.render("screens", data);
});

module.exports = router;