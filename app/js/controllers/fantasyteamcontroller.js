'use strict';
 
angular.module('fantasyApp.controllers.fantasyTeams', ['fantasyApp.services.fantasyTeams'])
  .controller('FantasyTeamsController', ['$scope','$routeParams', '$location', 'angularFire', 'Leagues', 'FantasyTeams','FireRef',
    function($scope, $routeParams, $location, angularFire, Leagues, FantasyTeams, FireRef) {
 
      $scope.fantasyTeamId = $routeParams.fantasyTeamId;
      $scope.noFantasyTeam = !$routeParams.fantasyTeamId;
 
      $scope.findFantasyTeams = function() {
        $scope.fantasyTeams = FantasyTeams.collection();
      }
 
      $scope.findOneFantasyTeam = function () {
        if(!!$scope.fantasyTeamId) {
          angularFire(FantasyTeams.find($routeParams.fantasyTeamId), $scope, 'fantasyTeam');
        }
      }
 
      $scope.findLeagues = function () {
        $scope.leagues = Leagues.collection();
      }
 
      $scope.create = function() {
        FantasyTeams.create($scope.fantasyTeam, $scope.auth).then(function(fantasyTeamId) {
          $scope.fantasyTeam = null;
          $location.path('/fantasyteams/'+fantasyTeamId);
        })
      }
 
      $scope.removeFantasyTeam = function(fantasyTeamId) {
        FantasyTeams.removeFantasyTeam(fantasyTeamId);
      }
    }])