angular.module('heapOverflowApp', [
	'ngRoute', 
	'heapOverflow.services',
	'heapOverflow.controllers'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.
		when('/', {templateUrl: 'partials/index', controller: "IndexCtrl"}).
		when('/questions', {templateUrl: '/partials/questions', controller: "QuestionsController"}).
		when('/questions/:id', {templateUrl: '/partials/question', controller: "QuestionController"}).
		when('/addQuestion', {templateUrl: '/partials/addQuestion', controller: "AddQuestionController"}).
		when('/tags', {templateUrl: '/partials/tags', controller: "TagsController"}).
		otherwise({redirectTo: '/'});
	$locationProvider.html5Mode(true);
}]);