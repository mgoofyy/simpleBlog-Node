
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.reg = function(req, res) {
	res.render('reg',{title:'register'});
};

exports.login = function(req, res) {
	res.render('login', {title: 'login'});
};

exports.logout = function(req, res) {
	res.render('logout', {title: 'logout'});
};

exports.error = function(req, res) {
	res.render('error', {title: '404'});
};