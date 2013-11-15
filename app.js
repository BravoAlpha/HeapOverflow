var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Users = require('./models/Users').Users;
var path = require('path');
var routes = require('./routes');
var api = require('./routes/api');

var app = express();

// ================== Authentication =================
passport.use(new LocalStrategy(function(username, password, done) {
	var users = new Users();
	users.authenticate(username, password, function(error, user) {
		if (error) {
			return done(error);
		}

		if (!user) {
			return done(null, false, { message: 'Incorrect password.' });
		}

		return done(null, user);
	});
}));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	var users = new Users();
	users.getById(id, function(error, user) {
		done(error, user);
	});
});

var auth = function(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	}
	else {
		res.send(401);
	}
};
// ================== Authentication =================

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view options', {layout : false, pretty : true});
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('32517f69-c8ba-4de2-8f9c-e92d495cb708'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

app.post('/login', passport.authenticate('local'), routes.login);
app.post('/logout', routes.logout);

app.get('/api/v1.0/questions', api.questionsController.getAll);
app.get('/api/v1.0/questions/:id', api.questionsController.getById);
app.get('/api/v1.0/questions/:questionId/answers', api.answersController.getForQuestion);
app.get('/api/v1.0/tags', api.questionsController.getAllTags);
app.get('/api/v1.0/questions/tagged/:tag', api.questionsController.getByTag);

app.post('/api/v1.0/questions', auth, api.questionsController.addQuestion);
app.post('/api/v1.0/questions/:questionId/answers', auth, api.answersController.addAnswer);

app.get('/api/v1.0/users', api.usersController.getAll);
app.get('/api/v1.0/users/:id', api.usersController.getById);
app.get('/api/v1.0/users/:id/questions', api.questionsController.getByUserId);
app.get('/api/v1.0/users/:id/answers', api.answersController.getForUser);

app.listen(app.get('port'));
