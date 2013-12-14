var Answers = function() {};

Answers.prototype.data = {};
Answers.prototype.userAnswers = {};

Answers.prototype.getForQuestion = function (questionId, callback){
    var answers = this.data[questionId] || [];
    setTimeout(callback.bind(null, null, answers), 0);
};

Answers.prototype.getForUser = function (userId, callback){
    var answers = this.userAnswers[userId] || [];
    setTimeout(callback.bind(null, null, answers), 0);
};

Answers.prototype.addAnswer = function(answer, callback){
    if (!this.data.hasOwnProperty(answer.questionId))
        this.data[answer.questionId] = [];

    answer.id = this.data[answer.questionId].length;
    answer.creation_date = new Date();

    this.data[answer.questionId][this.data[answer.questionId].length] = answer;

    if (!this.userAnswers.hasOwnProperty(answer.userId))
        this.userAnswers[answer.userId] = [];

    this.userAnswers[answer.userId][this.userAnswers[answer.userId].length] = answer;

    setTimeout(callback.bind(null, null, answer), 0);
};

new Answers().addAnswer({ 
    questionId: 1, 
    userId: 1, 
    content: 'I find this question interesting, because my first serious exposure to JavaScript programming was Node and Angular. I never learned jQuery, and I guess that is a good thing, because I do not have to unlearn anything. In fact, I actively avoid jQuery solutions to my problems, and instead, solely look for an Angular way to solve them. So, I guess my answer to this question would essentially boil down to, think like someone who never learned jQuery and avoid any temptation to incorporate jQuery directly (obviously Angular uses it to some extent behind the scenes).' 
}, function() {});

exports.Answers = Answers;