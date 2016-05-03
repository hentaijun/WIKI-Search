var app = angular.module('WikiApp', []);
app.controller('MainCtrl', function($scope,$http){
    $scope.show = true;
    $scope.hide = false;
    $scope.fullHeight = "fullHeight";
	$scope.result = [];

	$scope.search = function(){
        var title = $scope.searchTxt;
        if(title){
        	$scope.results = [];
        	$scope.hide = true;
			$scope.fullHeight = '';
			var api = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
			var cb = '&callback=JSON_CALLBACK';
	        var page = 'http://en.wikipedia.org/?curid=';
	        $http.jsonp(api + title +cb).success(function(data){
        	var results = data.query.pages;
        	angular.forEach(results, function(v,k)  {
            	$scope.results.push({title: v.title, body: v.extract, page: page + v.pageid});
        	});
        });
        }else{
			$scope.fullHeight = "fullHeight";
			$scope.hide = false;
        }
	}
	$scope.showDelete = function(){
		if($scope.show = true){
			$scope.show = false;
		}
	}
	// $scope.deleteS = function(){
	// 		/* Act on the event */
	// 		clean.show();
	// 		}

	$scope.hideDelete = function(){
		if($scope.show != true){
			$scope.show = true;
		}
	}

	// clean.on('click', function(event) {
	// 	if($scope.searchTxt !=''){
	// 		$scope.searchTxt = '';
	// 	}
	// 	 $scope.results = [];
 //         $scope.$apply();
 //         return false;
	// });
	$scope.clean = function(){
		if($scope.searchTxt != ''){
			$scope.searchTxt = '';
		}
		$scope.results = [];
        return false;
	}
	});
