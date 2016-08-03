
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
	console.log(req.body.name);
	res.render('login', {title: name});

};

exports.logout = function(req, res) {
	res.render('logout', {title: 'logout'});
};

exports.error = function(req, res) {
	res.render('error', {title: '404'});
};
