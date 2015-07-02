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
              },//get the user info

              balance : function(callback){
                  dao.rest("/balance", {id : req.user}, callback)
              },//get the balance info
              creatives : function(callback){
                  dao.rest("/creatives", {id : req.user}, callback)
              }
          },//get the creatives info
          function(err, results){
              if(err){
                  res.render("error", {message : "fail to get user"});
              }else{
                  if(results.user.length == 0){
                      res.render("error", {message : "not existed user"});
                  }else{
                      res.render("user", {
                          user : results.user[0],
                          balance : results.balance,
                          creatives : results.creatives
                      });
                  }
              }
          }
      );
  }else{
      res.redirect("/");
  }
});

router.post("/login", passport.authenticate('local', {
    successRedirect: "/users/",
    failureRedirect : "/users/fail"
}));

router.get("/signup", function(req, res, next){
    res.render("signup", {});
});

router.post('/register', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    var dao = req.app.get("dao");
    dao.get("logins",
        {
            username : username
        },
        function(error, docs)
        {
            if(error){
                res.render("error", {error : "未知错误"});
            }else{
                if(docs.length == 0){
                    dao.add("logins", {
                        username : username,
                        password : password
                    }, function(error, docs){
                        if(error){
                            res.render("error", {error : "未知错误"});
                        }else{
                            if(docs.length == 0){
                                res.render("error", {error : "未知错误"});
                            }else{
                                res.redirect("/")
                            }
                        }
                    });
                }else{
                    res.render("error", {error : "账户已经存在"});
                }
            }
        });
});

router.get("/signout", function(req, res, next){
    if(req.user){
        req.logout();
        res.redirect("/");
    }else{
        res.redirect("/");
    }
});

router.post("/detail", function(req, res, next){
    var dao = req.app.get("dao");
    if(req.user){
        dao.set(
            "users",
            {
                id : req.user
            },
            {
                nickname : req.body.nickname,
                email : req.body.email,
                address : req.body.address
            },
            function(error, docs){
                if(error){
                    res.render("error", {});
                }else{
                    res.redirect("/users/");
                }
            }
        );
    }else{
        res.render("error", {message:"please log in first"});
    }
});

module.exports = router;
