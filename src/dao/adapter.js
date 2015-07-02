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

Dao.prototype.rest = function(path, params, callack){
    var self = this;
    switch (path) {
        case "/balance":
            callack(null, Math.random());
            break;
        case "/creatives":
            callack(null, Math.random());
            break;
        default :
            callack(new error());
    }
};

exports.Dao = Dao;
