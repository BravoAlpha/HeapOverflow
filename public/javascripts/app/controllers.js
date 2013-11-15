angular.module('heapOverflow.controllers', ['heapOverflow.services'])
	.controller('IndexCtrl', function IndexCtrl($scope) {

	})

	.controller('NavigationCtrl', function NavigationCtrl($scope, authenticationFactory, usersFactory) {
		$scope.logout = function() {
			authenticationFactory.logout();
		};
	})

	.controller('LoginCtrl', function IndexCtrl($scope, authenticationFactory) {
		$scope.login = function(user) {
			authenticationFactory.login(user.username, user.password);
		};
	})

	.controller('SignupCtrl', function SignupCtrl($scope, $location, usersFactory) {
		$scope.signup = function(user) {
			usersFactory.addUser(user.username, user.password, function(user) {
				$location.url('/');
			});
		}
	})

	.controller('QuestionsCtrl', function QuestionsCtrl($scope, questionFactory) {
		questionFactory.getAll(function (questions) {
			$scope.questions = questions;
		});
	})

	.controller('QuestionsByTagCtrl', function QuestionsByTagCtrl($scope, $routeParams, questionFactory) {
		questionFactory.getByTag($routeParams.tag, function (questions) {
			$scope.questions = questions;
		});
	})

	.controller('QuestionCtrl', function QuestionCtrl($scope, $routeParams, questionFactory, answerFactory, usersFactory) {

		questionFactory.getById($routeParams.id, function(question) {
			$scope.question = question;

			usersFactory.getById(question.userId, function(user) {
				$scope.user = user;
			});
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

	.controller('AddQuestionCtrl', function AddQuestionCtrl($scope, $location, questionFactory) {
		$scope.addQuestion = function(question) {
			questionFactory.addQuestion(question, function(submittedQuestion) {
				$location.path('/questions/' + submittedQuestion.id);
			});
		};
	})

	.controller('TagsCtrl', function TagsCtrl($scope, questionFactory) {
		questionFactory.getAllTags(function(tags) {
			$scope.tags = tags;
		});
	})

	.controller('UsersCtrl', function UsersCtrl($scope, usersFactory) {
		usersFactory.getAll(function(users) {
			$scope.users = users;
		});
	})

	.controller('UserCtrl', function UsersCtrl($scope, $routeParams, usersFactory, questionFactory, answerFactory) {
		usersFactory.getById($routeParams.id, function(user) {
			$scope.user = user;
		});

		questionFactory.getByUser($routeParams.id, function(questions) {
			$scope.questions = questions;
		});

		answerFactory.getByUser($routeParams.id, function(answers) {
			$scope.answers = answers;
		});
	});