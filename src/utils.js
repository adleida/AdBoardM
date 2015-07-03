/**
 * Created by kliu on 03/07/2015.
 */

var utils = {
    loginRouter : function(req, res, next){
        if(req.user){
            var dao = req.app.get("dao");
            dao.get("users", {
                id : req.user
            }, function(error,docs){
                if(error){
                    res.render("error", {message : "服务器出了点问题"});
                }else{
                    if(docs.length == 0){
                        res.render("error", {message : "未能找到您的个人资料"});
                    }else{
                        req.user_info = docs[0];
                        next();
                    }
                }
            });
        }else{
            res.render("error", {message : "请先登录"});
        }
    }
};

module.exports = utils;