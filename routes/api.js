var Questions = require('../models/Questions').Questions;
var Answers = require('../models/Answers').Answers;
var Users = require('../models/Users').Users;

questions = new Questions();
answers = new Answers();
users = new Users();

questionsController = {
    getAll: function(req, res){
        questions.getAll(function(error, questions){
           res.json(questions || {});
        });
    },

    getAllTags: function(req, res){
        questions.getAllTags(function(error, tags){
            res.json(tags || {});
        });
    },

    getById: function (req, res){
        questions.getById(req.params.id, function(error, question){
           res.json(question || {});
        });
    },

    getByUserId: function (req, res){
        questions.getByUserId(req.params.id, function(error, questions){
            res.json(questions || {});
        });
    },

    getByTag: function(req, res){
        questions.getByTag(req.params.tag, function(error, questions){
            res.json(questions || {});
        });
    }
};

usersController = {
    getAll: function(req, res){
        users.getAll(function(error, users){
            res.json(users || {});
        });
    },

    getById: function(req, res){
        users.getById(req.params.id, function(error, user){
           res.json(user || {});
        });
    }
};

answersController = {
    getForQuestion: function(req, res){
        answers.getForQuestion(req.params.questionId, function(error, answers){
            res.json(answers || {});
        });
    },

    getForUser: function(req, res){
        answers.getForUser(req.params.id, function(error, answers){
           res.json(answers);
        });
    },

    addAnswer: function(req, res){
        // TODO: The userId is hard coded, change it
        var answer = { questionId: req.params.questionId, userId: 1, content: req.body.content };
        answers.addAnswer(answer, function(error, answer){
           res.json(answer);
        });
    },
};

exports.questionsController = questionsController;
exports.answersController = answersController;
exports.usersController = usersController;