/**
 * Created by kliu on 01/07/2015.
 */

var Datastore = require("nedb");

function Dao(param){
    var self = this;
    self.db = {};
    self.db.users = new Datastore({
        filename: param + "/users.nedb",
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
}

exports.Dao = Dao;
