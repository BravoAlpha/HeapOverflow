heapOverflowApp.controller('IndexCtrl', function IndexCtrl($scope){

});

heapOverflowApp.controller('QuestionsController', function QuestionsController($scope, $http){
	
	$http.get('/api/v1.0/questions').
		success(function(data, status, headers, config){
			$scope.questions = data;
		});
});

heapOverflowApp.controller('QuestionController', function QuestionController($scope, $routeParams, $http, $q){

	// TODO: Use the $q service here
	$http.get('/api/v1.0/questions/' + $routeParams.id).
		success(function(data, status, headers, config){
			$scope.question = data;

			$http.get('/api/v1.0/questions/' + $routeParams.id + '/answers').
				success(function(data, status, headers, config){
					$scope.answers = data;
				});
		});
});