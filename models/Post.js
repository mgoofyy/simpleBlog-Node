/**
 * Created by goofy on 8/8/16.
 */
var mongodb = require('./db');


function Post(name,title,content) {
    this.name = name;
    this.title = title;
    this.content = content;
}

module.exports = Post;

//实例方法
Post.prototype.save = function(callback) {
    var date = new Date();
    var time = {
        date : date,
        year : date.getFullYear(),
        month : date.getFullYear() + ' - ' + (date.getMonth() + 1),
        day : date.getFullYear() + ' - ' + (date.getMonth() + 1) + ' - ' + date.getDay(),
        minute : date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay() + '-' + date.getMinutes(),
    }

    var post = {
        time : time,
        name : this.name,
        title : this.title,
        content : this.content
    };

    mongodb.open(function(err,db){
        if(err) {
            return callback(err);
        }
        db.collection('post',function(err,colleciton){
            if(err) {
                mongodb.close();
                return callback(err);
            }
            colleciton.insert(post,
                {
                    safe: true
                }, function (err) {
                    mongodb.close();
                    if(err) {
                        return callback(err);
                    }
                    callback(null);
                });
        });
    });
}

//工厂模式 - 类方法

Post.get = function(name,callback) {
    mongodb.open(function(err,db){
        if(err) {
            return callback(err);
        }
        db.collection('post',function(err,post){
            if(err) {
                mongodb.close();
                return callback(err);
            }
            collection.find({name:name}).sort({time : -1})
                .toArray(function(err,docs){
                    mongodb.close();
                    if(err){
                        return callback(err);
                    }
                    callback(null,docs);
                });

        });
    });
};


Post.prototype.hello = function(callback) {
    console.log('hello helo');
    return callback('i can get a result');
};