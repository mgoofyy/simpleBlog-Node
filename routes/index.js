
/*
 * GET home page.
 */
var crypto = require('crypto');
var User   = require('../models/user.js');
var Post = require('../models/Post.js');

//首页返回index.ejs
exports.index = function(req, res){
  res.render('index', { title: 'Express' ,'user':req.session.user});
};

//注册页返回注册页面，并处理请求
exports.reg = function(req, res) {
	//对当前请求进行判断
	if(isEmptyObject(req.body)) {
		//当前是get请求
		return res.render('reg',{'title':'Register page','user':req.session.user})
	}

	console.log(req.body);
	var name = req.body.name;
	var password = req.body.password;
	var password2 = req.body['password-repeat'];
	var email = req.body.email;
	console.log(name + '   '  +  password + ' ' + password2 + '  ' + email);
	if ((name == undefined) || (password == undefined) || (email == undefined) || (password2 == undefined)) {
		console.log('当前没有输入账户信息');
		return res.render('reg', {title: 'Please Input YOUR Count Info and Renter','user':req.session.user});
	}

	if(password != password2) {
		return res.render('reg', {title: 'this password is not the same as your password-repeqat','user':req.session.user});
	}

	console.log(name + ' ' + password + password2 + ' ' +email )

	var md5 = crypto.createHash('md5');
	password = md5.update(req.body.password).digest('hex');
	console.log('------md5------' + password);

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

			req.session.user = newUser;
			console.log('_____________' + req.session.user);
			req.flash('success','register success');
			res.redirect('/');

		});
	
	})

	
	// res.redirect('login',{title:'register success'});
};

exports.login = function(req, res) {

	if(isEmptyObject(req.body)) {
		//当前是get请求
		return res.render('login',{'title':'Login page','user':req.session.user})
	}
	var name = req.body.name;
	var password = req.body.password;
	if (password != undefined) {
		var md5 = crypto.createHash('md5');
		password = md5.update(req.body.password).digest('hex');

	} else {
		return res.render('login',{'title':'please login with your name and password','user':req.session.user});
	}

	User.get(name,function(error,user){
		if (!user) {
			req.flash('error','user is not in sql');
			res.render('index', {title: name,'user':req.session.user});
			return;
		}
		if (user.password != password) {
			req.flash('error','password is error');
			return res.render('login',{title: 'password is error','user':req.session.user});
		}
		req.session.user = user;
		req.flash('success','login success');
		res.redirect('/');
	});
};

exports.logout = function(req, res) {
	req.session.user = null;
	res.render('logout', {title: 'logout','user': req.session.user});
};

exports.error = function(req, res) {
	res.render('error', {title: '404','user':req.session.user});
};

exports.post = function(req, res) {
	if(isEmptyObject(req.body)) {
		//当前是get请求
		return res.render('post',{title:'Post Page','user':req.session.user});
	}
	console.log(req.body);
//创建模型
	var post = new Post(req.body['title'],req.body['post',req.body['name']]);
	post.save(function(err){
		if(err) {
			console.log('保存失败');
		}
		else {
			console.log('保存成功');
		}
	});

};

//检查字典是否为空
function isEmptyObject(obj){
	for (var n in obj) {
		return false
	}
	return true;
}