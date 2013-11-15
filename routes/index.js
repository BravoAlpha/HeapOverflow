exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res){
	var name = req.params.name;
	res.render('partials/' + name);
};

exports.login = function (req, res) {
	res.json(req.user);
};

exports.logout = function (req, res) {
	req.logout();
	res.send(200);
};