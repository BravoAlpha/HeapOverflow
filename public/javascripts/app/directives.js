angular.module('heapOverflow.directives', [])
	.directive('question', function(){
		return {
			restrict: 'E',
			replace: true,
			scope: {
				id : '=',
				title: '=',
				content: '='
			},
			templateUrl:'/partials/questionDirective'
		};
	});