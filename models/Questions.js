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
users.getById(1, function(error, user){
    var questions = new Questions();

    questions.save({
        userId : user.id, 
        title : "How do I think in AngularJS if I have a jQuery background?", 
        content : "Suppose I'm familiar with developing client-side applications in jQuery, but now I'd like to start using AngularJS. Can you describe the paradigm shift that is necessary? I'm not looking for a detailed comparison between jQuery and AngularJS.", 
        tags : ["jQuery", "AngularJS"]
    }, function(err, question) {});

    questions.save({
        userId : user.id, 
        title : "Databinding in AngularJS", 
        content : "Could someone explain to me how databinding works in the AngularJS framework? I haven't found technical details on their site. It's more or less clear how it works when data is propagated from view to model. But how does AngularJS track changes of model properties without setters and getters? I found that there are JavaScript watchers that may do this work. But they are not supported in IE 6 and 7. So how does AngularJS know that I changed and reflect this change on a view?", 
        tags : ["JavaScript", "AngularJS"]
    }, function(err, question) {});

    questions.save({
        userId : user.id, 
        title : "Angular.js: service vs provider vs factory", 
        content : "I'm sure this has bothered you - it has bothered me for some time now. What are the differences between AngularJS module's service, provider and factory?", 
        tags : ["AngularJS"]
    }, function(err, question) {});
});

exports.Questions = Questions;