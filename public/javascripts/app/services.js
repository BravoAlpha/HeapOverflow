angular.module('heapOverflow.services', [])
	.factory('questionFactory', function($http) {
		return {
			getAll: function(callback) {
				$http.get('/api/v1.0/questions')
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

			addAnswer: function(questionId, answer, callback) {
				$http.post('/api/v1.0/questions/' + questionId + '/answers', answer)
					.success(function(data, status, headers, config) {
						callback(data);
					});
			}
		};
	});