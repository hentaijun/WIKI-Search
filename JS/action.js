var app = angular.module('WikiApp', []);
app.controller('MainCtrl', function($scope,$http){
	var form = $('form');
	var input = $('input');
	var search = $('#search');
	var help = $('#help');
    var clean = $('#delete');
	$scope.result = [];

	$scope.search = function(){
        var title = input.val();
        if(title){
        	$scope.results = [];
			help.addClass('hide');
			search.removeClass('fullHeight');
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
			search.addClass('fullHeight');
			help.removeClass('hide');
        }
	}

	$scope.deleteS = function(){
			/* Act on the event */
			clean.show();
			}

	$scope.deleteH = function(){
		clean.hide();
	}
	$scope.deleteT = function(){
		var title = input.val();
		if(title){
			clean.show();
		}else{
			clean.hide();
		}
	}

	clean.on('click', function(event) {
		if($scope.searchTxt !=''){
			$scope.searchTxt = '';
		}
		 $scope.results = [];
         $scope.$apply();
         return false;
	});
});
