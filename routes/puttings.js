var express = require('express');
var router = express.Router();
var passport = require("passport");
var async = require("async");

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.user){
      dao = req.app.get("dao");
      async.parallel(
          {
              user : function(callback){
                  dao.get("users", {id : req.user}, callback);
              }
          },
          function(error, results){
              res.render("puttings", {
                  user : results.user[0]
              });
          }
      );
  }else{
      res.redirect("/");
  }
});

module.exports = router;
