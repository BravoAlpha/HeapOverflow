
var express = require('express');
var path = require('path');
var routes = require('./routes');
var api = require('./routes/api');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view options', {layout : false, pretty : true});
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

app.get('/api/v1.0/questions', api.questionsController.getAll);
app.get('/api/v1.0/questions/:id', api.questionsController.getById);
app.get('/api/v1.0/questions/:questionId/answers', api.answersController.getForQuestion);
app.post('/api/v1.0/questions', api.questionsController.addQuestion);
app.post('/api/v1.0/questions/:questionId/answers', api.answersController.addAnswer);
app.get('/api/v1.0/tags', api.questionsController.getAllTags);
app.get('/api/v1.0/questions/tagged/:tag', api.questionsController.getByTag);

app.get('/api/v1.0/users', api.usersController.getAll);
app.get('/api/v1.0/users/:id', api.usersController.getById);
app.get('/api/v1.0/users/:id/questions', api.questionsController.getByUserId);
app.get('/api/v1.0/users/:id/answers', api.answersController.getForUser);

app.listen(app.get('port'));
