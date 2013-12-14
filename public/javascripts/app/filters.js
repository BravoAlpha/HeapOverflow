angular.module('heapOverflow.filters', [])
	.filter('limit', function(){
		return function(text, limit){
			if (text.length <= limit)
				return text;

			return text.substring(0, limit) + "...";
		};
	});