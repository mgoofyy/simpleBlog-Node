
/*
 * GET home page.
 */
var crypto = require('crypto');
var User   = require('../models/user.js');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.reg = function(req, res) {
	var name = req.body.name;
	var password = req.body.password;
	var password2 = req.body['password-repeat'];
	var email = req.body.email;

	if (name == undefined) {
		console.log('当前没有输入用户名');
		return res.render('reg',{title:'please Renty again'});
	}

	console.log(name + ' ' + password + ' ' +email )

	var md5 = crypto.createHash('md5');
	// password = md5.update(req.body.password).digest('hex');
	console.log('------md5----' + password);

	var newUser = new User({
		name : name,
		password : password,
		email : email
	});
	newUser.save(function(error,user){

		if (error) {

			return res.redirect('/');
		}

	});
	res.render('login',{title:'login'});
};

exports.login = function(req, res) {
	var name = req.body.name;
	console.log(req.body.name);
	res.render('login', {title: name});

};

exports.logout = function(req, res) {
	res.render('logout', {title: 'logout'});
};

exports.error = function(req, res) {
	res.render('error', {title: '404'});
};
