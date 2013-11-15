angular.module('heapOverflow.controllers', ['heapOverflow.services'])
	.controller('IndexCtrl', function IndexCtrl($scope) {

	})

	.controller('NavigationCtrl', function NavigationCtrl($scope, authenticationFactory) {
		$scope.logout = function() {
			authenticationFactory.logout();
		};
	})

	.controller('LoginCtrl', function IndexCtrl($scope, authenticationFactory) {
		$scope.login = function(user) {
			authenticationFactory.login(user.username, user.password);
		};
	})

	.controller('QuestionsController', function QuestionsController($scope, questionFactory) {
		questionFactory.getAll(function (questions) {
			$scope.questions = questions;
		});
	})

	.controller('QuestionsByTagController', function QuestionsByTagController($scope, $routeParams, questionFactory) {
		questionFactory.getByTag($routeParams.tag, function (questions) {
			$scope.questions = questions;
		});
	})

	.controller('QuestionController', function QuestionController($scope, $routeParams, questionFactory, answerFactory) {

		questionFactory.getById($routeParams.id, function(question) {
			$scope.question = question;
		});

		answerFactory.getForQuestion($routeParams.id, function(answers) {
			$scope.answers = answers;
		});

		$scope.addAnswer = function(answer) {
			answerFactory.addAnswer($routeParams.id, answer, function(submittedAnswer) {
				$scope.answers.push(submittedAnswer);
			});
		};
	})

	.controller('AddQuestionController', function AddQuestionController($scope, $location, questionFactory) {
		$scope.addQuestion = function(question) {
			questionFactory.addQuestion(question, function(submittedQuestion) {
				$location.path('/questions/' + submittedQuestion.id);
			});
		};
	})

	.controller('TagsController', function TagsController($scope, questionFactory) {
		questionFactory.getAllTags(function(tags) {
			$scope.tags = tags;
		});
	});