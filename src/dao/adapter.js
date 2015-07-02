/**
 * Created by kliu on 01/07/2015.
 */

var Datastore = require("nedb");

function Dao(param){
    var self = this;
    self.db = {};
    self.db.logins = new Datastore({
        filename: param + "/logins.nedb",
        autoload : true
    });
    self.db.users = new Datastore({
        filename : param + "/users.nedb",
        autoload : true
    });
};

Dao.prototype.add = function(type, docs, callback){
    var self = this;
    self.db[type].insert(docs, callback);
};

Dao.prototype.all = function(type, callback){
    var self = this;
    self.db[type].find({}).exec(callback);
};

Dao.prototype.get = function(type, query, callback){
    var self = this;
    self.db[type].find(query, callback);
};

Dao.prototype.set = function(type, query, fields, callback){
    var self = this;
    self.db[type].update(query,
        {
            $set : fields
        },
        {
            multi : true
        },
    callback);
};

/**
 * message structure
 * from:
 * date:
 * title:
 * body:
 * read:
 * @type {*[]}
 */
var fakeMessages = [
    {
        id   : "sdfasfff",
        from : "物料管理系统",
        date : "2012.12.20",
        title : "物料23x83已经通过审核",
        body : "尊敬的用户，您上传的广告物料‘美味披萨’已经通过了审核，可以开始投放",
        seen : true
    },
    {
        id   : "sdfasdaaaa",
        from : "投放管理系统",
        date : "2013.4.22",
        title : "物料23x83已经开始播放",
        body : "尊敬的用户，您的广告物料‘美味披萨’已经在朝阳区，海淀区的广告屏上开始播放啦"
    },
    {
        id : "sdfaaaaffef",
        from : "账户中心",
        date : "2013.6.10",
        title : "账户余额不足",
        body : "尊敬的用户，您上传的广告物料‘美味披萨’已经通过了审核，可以开始投放",
        seen : true
    },
    {
        id  : "sdfasdfasf",
        from : "物料管理系统",
        date : "2012.12.20",
        title : "物料23x83已经通过审核",
        body : "尊敬的用户，您上传的广告物料‘美味披萨’已经通过了审核，可以开始投放"
    }
];

Dao.prototype.rest = function(path, params, callback){
    var self = this;
    switch (path) {
        case "/balance":
            callback(null, Math.random());
            break;
        case "/creatives":
            callback(null, Math.random());
            break;
        case "/messages":
            callback(null, fakeMessages);
            break;
        default :
            callback({});
    }
};

exports.Dao = Dao;
