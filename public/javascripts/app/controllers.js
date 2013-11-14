angular.module('heapOverflow.controllers', ['heapOverflow.services'])
	.controller('IndexCtrl', function IndexCtrl($scope) {

	})

	.controller('QuestionsController', function QuestionsController($scope, questionFactory) {
		questionFactory.getAll(function (questions) {
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
	});