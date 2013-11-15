angular.module('heapOverflowApp', [
	'ngRoute', 
	'heapOverflow.services',
	'heapOverflow.controllers'
])
.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {

	$routeProvider.
		when('/', {templateUrl: 'partials/index', controller: "IndexCtrl"}).
		when('/login', {templateUrl: 'partials/login', controller: "LoginCtrl"}).
		when('/questions', {templateUrl: '/partials/questions', controller: "QuestionsController"}).
		when('/questions/tagged/:tag', {templateUrl: '/partials/questions', controller: "QuestionsByTagController"}).
		when('/questions/:id', {templateUrl: '/partials/question', controller: "QuestionController"}).
		when('/addQuestion', {templateUrl: '/partials/addQuestion', controller: "AddQuestionController"}).
		when('/tags', {templateUrl: '/partials/tags', controller: "TagsController"}).
		otherwise({redirectTo: '/'});

	$locationProvider.html5Mode(true);

	$httpProvider.responseInterceptors.push(function($q, $location) {
		return function (promise) {
			return promise.then(
				function(response) {
					return response;
				},

				function(response) {
					if (response.status === 401)
						$location.url('/login');
					return $q.reject(response);
				});
		};
	});
}]);