var app = angular.module('cricBuzz', ['ngRoute']);

app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
	
	$scope.venues = [];
	$scope.teams = [];
	$scope.matchData = [];
	
	
	$http.get('scripts/json/venue.json').
		success(function(data, status, headers, config) {
			$scope.venues = data;
		}).
		error(function(data, status, headers, config) {
			alert(status);
		});
		
		$http.get('scripts/json/team.json').
		success(function(data, status, headers, config) {
			$scope.teams = data;
		}).
		error(function(data, status, headers, config) {
			alert(status);
		});
	
		$http.get('scripts/json/match.json').
		success(function(data, status, headers, config) {
			for(i in data){
				$scope.matchData[i] = {};
				$scope.matchData[i].date = new Date(data[i].header.start_time*1000).toDateString();
				$scope.matchData[i].venue = $scope.venues[data[i].venue_id].name;
				$scope.matchData[i].status = data[i].header.status;
				$scope.matchData[i].matchDesc = data[i].header.match_desc;
				$scope.matchData[i].team1 = $scope.teams[data[i].team1_id].s_name;
				$scope.matchData[i].team2 = $scope.teams[data[i].team2_id].s_name;
			}
			$scope.actualData = angular.copy($scope.matchData);
		}).
		error(function(data, status, headers, config) {
			alert(status);
		});		
		
		$scope.venueReset = function(){
			$scope.venueI = "";
		};
		$scope.teamReset = function(){
			$scope.teamI = "";
		};
		
		$scope.teamID = function(value){
			return $scope.teamI = value;
		};
		$scope.venueID = function(value){
			return $scope.venueI = value;
		};
		
		$scope.isTeamActive = function(value){
			return $scope.teamI === value;
		};
		$scope.isVenueActive = function(value){
			return $scope.venueI === value;
		};
		
}]);
