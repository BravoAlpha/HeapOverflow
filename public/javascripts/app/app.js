angular.module('heapOverflowApp', [
	'ngRoute', 
	'heapOverflow.services',
	'heapOverflow.controllers',
	'heapOverflow.filters'
])
.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {

	$routeProvider.
		when('/', {templateUrl: 'partials/index', controller: "IndexCtrl"}).
		when('/login', {templateUrl: 'partials/login', controller: "LoginCtrl"}).
		when('/signup', {templateUrl: 'partials/signup', controller: "SignupCtrl"}).
		when('/questions', {templateUrl: '/partials/questions', controller: "QuestionsCtrl"}).
		when('/questions/tagged/:tag', {templateUrl: '/partials/questions', controller: "QuestionsByTagCtrl"}).
		when('/questions/:id', {templateUrl: '/partials/question', controller: "QuestionCtrl"}).
		when('/addQuestion', {templateUrl: '/partials/addQuestion', controller: "AddQuestionCtrl"}).
		when('/tags', {templateUrl: '/partials/tags', controller: "TagsCtrl"}).
		when('/users', {templateUrl: '/partials/users', controller: "UsersCtrl"}).
		when('/users/:id', {templateUrl: '/partials/user', controller: "UserCtrl"}).
		otherwise({redirectTo: '/'});

	$locationProvider.html5Mode(true);

	$httpProvider.interceptors.push(function($q, $location) {
		return {
			'responseError': function(rejection){
				if (rejection.status === 401)
					$location.url('/login');

				return $q.reject(rejection);
			}
		};
	});
}]);