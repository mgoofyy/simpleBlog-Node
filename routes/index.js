
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
