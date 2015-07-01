var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.user){
      res.render("user", {
          user : req.user
      });
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
    dao.get("users", {
        username : username
    }, function(error, docs){
        if(error){
            res.render("error", {error : "未知错误"});
        }else{
            if(docs.length == 0){
                dao.add("users", {
                    username : username,
                    password : password
                }, function(error, docs){
                    if(error){
                        res.render("error", {error : "未知错误"});
                    }else{
                        if(docs.length == 0){
                            res.render("error", {error : "未知错误"});
                        }else{
                            delete docs[0].password;
                            req.login(docs[0]);
                            res.redirect("/users/")
                        }
                    }
                });
            }else{
                res.render("error", {error : "账户已经存在"});
            }
        }
    });
});

module.exports = router;
