var express = require('express');
var router = express.Router();
var passport = require("passport");
var async = require("async");
var utils = require("../src/utils");

router.use(utils.loginRouter);

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.user_info){
      res.render("puttings", {
          user : req.user_info
      });
  }else{
      res.redirect("/");
  }
});

module.exports = router;
