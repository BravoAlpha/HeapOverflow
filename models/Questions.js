var _ = require('underscore');
var Users = require('./Users').Users;

users = new Users();
var questionCounter = 1;
var Questions = function () {};
Questions.prototype.data = [];
Questions.prototype.tags = [];

Questions.prototype.getAll = function(callback) {
    setTimeout(callback.bind(null, null, this.data), 0);
};

Questions.prototype.getAllTags = function(callback){
    setTimeout(callback.bind(null, null, this.tags), 0);
};

Questions.prototype.getById = function(id, callback){
    var result = null;
    for (var i=0; i<this.data.length; ++i){
        // Intentionally using '==' and not '===' because the id parameter can be a string (extracted from the url)
        if (this.data[i].id == id){
            result = this.data[i];
            break;
        }
    }
    setTimeout(callback.bind(null, null, result), 0);
};

Questions.prototype.getByUserId = function(userId, callback){
    var results = [];
    for (var i=0; i<this.data.length; ++i){
        // Intentionally using '==' and not '===' because the id parameter can be a string (extracted from the url)
        if (this.data[i].userId == userId){
            results[results.length] = this.data[i];
        }
    }
    setTimeout(callback.bind(null, null, results), 0);
};

Questions.prototype.getByTag = function(tag, callback){
    var results = [];
    for (var i=0; i<this.data.length; ++i){
        if (_.contains(this.data[i].tags, tag)){
            results[results.length] = this.data[i];
        }
    }
    setTimeout(callback.bind(null, null, results), 0);
};

Questions.prototype.save = function (question, callback){
    question.id = questionCounter++;
    question.creation_date = new Date();
    this.data[this.data.length] = question;

    // Setting this.tags will set a local property instead of using the one declared on the prototype
    Questions.prototype.tags = _.union(Questions.prototype.tags, question.tags);

    setTimeout(callback.bind(null, null, question), 0);
};

//question {id, userId, creation_date, title, content, tags}
users.getById(0, function(error, user){
    var questions = new Questions();
    questions.save({userId : user.id, title : "This is question number 1", content : "Content of question number 1", tags : ["Node", "ASP.NET"]}, function(err, question) {});
    questions.save({userId : user.id, title : "This is question number 2", content : "Content of question number 2", tags : ["Express", "Angular"]}, function(err, question) {});
    questions.save({userId : user.id, title : "This is question number 3", content : "Content of question number 3", tags : ["Express"]}, function(err, question) {});
});

exports.Questions = Questions;