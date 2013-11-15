angular.module('heapOverflow.services', [])
	.factory('authenticationFactory', function($http, $location, $rootScope) {
		return {
			login: function (username, password, callback) {
				$http.post('/login', {username: username, password: password})
					.success(function(data, status, headers, config) {
						$rootScope.loggedInUser = data;
						$location.url('/');
					});
			},

			logout: function(callback) {
				$http.post('/logout')
					.success(function(data, status, headers, config) {
						delete $rootScope.loggedInUser;
						$location.url('/');
					});
			}
		};
	})

	.factory('questionFactory', function($http) {
		return {
			getAll: function(callback) {
				$http.get('/api/v1.0/questions')
					.success(function(data, status, headers, config) {
						callback(data);
					});
			},

			getByTag: function(tag, callback) {
				$http.get('/api/v1.0/questions/tagged/' + tag)
					.success(function(data, status, headers, config) {
						callback(data);
					});
			},

			getByUser: function(id, callback) {
				$http.get('/api/v1.0/users/' + id + '/questions')
					.success(function(data, status, headers, config) {
						callback(data);
					});
			},

			getById: function(id, callback) {
				$http.get('/api/v1.0/questions/' + id)
					.success(function(data, status, headers, config) {
						callback(data);
					});
			},

			addQuestion: function (question, callback) {
				$http.post('/api/v1.0/questions', question)
					.success(function(data, status, headers, config) {
						callback(data);
					});
			},

			getAllTags: function (callback) {
				$http.get('/api/v1.0/tags')
					.success(function (data, status, headers, config) {
						callback(data);
					});
			}
		};
	})

	.factory('answerFactory', function($http) {
		return {
			getForQuestion: function(id, callback) {
				$http.get('/api/v1.0/questions/' + id + '/answers')
					.success(function(data, status, headers, config){
						callback(data);
					});
			},

			getByUser: function(id, callback) {
				$http.get('/api/v1.0/users/' + id + '/answers')
					.success(function(data, status, headers, config) {
						callback(data);
					});
			},

			addAnswer: function(questionId, answer, callback) {
				$http.post('/api/v1.0/questions/' + questionId + '/answers', answer)
					.success(function(data, status, headers, config) {
						callback(data);
					});
			}
		};
	})

	.factory('usersFactory', function($http, $location, $rootScope) {
		return {
			addUser: function(username, password, callback) {
				$http.post('/api/v1.0/users', {username: username, password: password})
					.success(function(data, status, headers, config) {
						$rootScope.loggedInUser = data;
						$location.url('/');
					});
			},

			getAll: function(callback) {
				$http.get('/api/v1.0/users')
					.success(function(data, status, headers, config) {
						callback(data);
					});
			},

			getById: function(id, callback) {
				$http.get('/api/v1.0/users/' + id)
					.success(function(data, status, headers, config) {
						callback(data);
					});
			}
		};
	});