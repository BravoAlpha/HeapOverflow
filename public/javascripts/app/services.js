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
			}
		};
	});