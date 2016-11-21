var challengeApp = angular.module('challengeApp', ['ngRoute']);
challengeApp.controller('challengeController', function($scope, $route, $http, $location){

	var gitHubURL = 'https://api.github.com/search/users?q=';
	var gitHubUser = 'https://api.github.com/users/';
	var perPage = '&per_page=10'
	
	$scope.gitHubSearch = function(){
		$http({
			method: 'GET',
			url: gitHubURL + $scope.queryString + perPage
			}).then(function successFunction(searchData){
				$scope.gitHubArray = searchData.data.items;
				console.log(searchData);
				$location.path('/search');
				if ($scope.queryString.includes('ron')){
					$location.path('/ron');
				}
			},function failureFunction(searchData){
				
			}
		);
	}

	$scope.gitHubUser = function(userName){
		$scope.gitHubUserArray = [];
		$http({
			method: 'GET',
			url: gitHubUser + userName
			}).then(function successFunction(searchData){
				$scope.gitHubUserArray.push(searchData.data);
				return searchData.data
				
			},function failureFunction(searchData){
				
			}
		);
			console.log($scope.gitHubUserArray);
	}
});

challengeApp.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl: 'views/main.html',
		controller: 'challengeController'
	})
	.when('/search',{
		templateUrl: 'views/search.html',
		controller: 'challengeController'
	})
	.when('/ron',{
		templateUrl: 'views/ron.html',
		controller: 'challengeController'
	})
});