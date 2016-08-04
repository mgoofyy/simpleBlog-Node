
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
	password = md5.update(req.body.password).digest('hex');
	console.log('------md5----' + password);

	var newUser = new User({
		name : name,
		password : password,
		email : email
	});
	console.log(newUser);
	//check
	User.get(newUser.name,function(err,user){
		if (err) {
			req.flash('error','user isexist');
			return res.redirect('reg');
		}
		newUser.save(function(error,user){

			if (err) {
				req.flash('error',err);
				return res.redirect('reg');
			}

			req.session.user = user;
			req.flash('success','register success');
			res.redirect('/');

		});
	
	})

	
	// res.redirect('login',{title:'register success'});
};

exports.login = function(req, res) {
	var name = req.body.name;
	var password = req.body.password;
	if (password != undefined) {
		var md5 = crypto.createHash('md5');
		password = md5.update(req.body.password).digest('hex');

	} else {
		return res.render('login',{'title':'please login with your name and password'});
	}

	User.get(name,function(error,user){
		if (!user) {
			req.flash('error','user is not in sql');
			res.render('index', {title: name});
			return;
		}
		if (user.password != password) {
			req.flash('error','password is error');
			return res.redirect('/login');
		}
		req.session.user = user;
		req.flash('success','login success');
		res.redirect('/');
	});
};

exports.logout = function(req, res) {
	res.render('logout', {title: 'logout'});
};

exports.error = function(req, res) {
	res.render('error', {title: '404'});
};
