
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var MongoStore = require('connect-mongo')(express);
var setting = require('./setting');
var flash = require('connect-flash');
var app = express();
var Post = require('./models/Post');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
//setting mongo connect 
app.use(express.cookieParser());
app.use(express.session({
	secret: setting.cookieSecret,
	key: setting.db,
	cookie:{maxAge: 1000 * 60 * 60 * 24 * 30},
	store:new MongoStore({
		db: setting.db,
		host: setting.host,
    port: setting.port,
    url: 'mongodb://localhost/zhangsan'
	})
}));
app.use(flash());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/reg', routes.reg);
app.post('/reg', routes.reg);
app.get('/login',routes.login);
app.post('/login',routes.login);
app.get('/logout',routes.logout);
app.post('/logout',routes.logout);
app.get('/error',routes.error);
app.post('/error',routes.error);

////test
//var newPost = new Post('zhangsan','lisi','wangwu');
//
//newPost.save(function(err){
//    if(err) {
//        console.log('this is my log save successful');
//    } else {
//        console.log('save is error' + err);
//    }
//});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
    console.log('http://localhost:3000');
});
