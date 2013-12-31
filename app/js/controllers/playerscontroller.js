'use strict';

/**
* fantasyApp.controllers.players Module
*
* Description
*/
angular.module( 'fantasyApp.controllers.players', ['fantasyApp.services.players'] )
  .controller( 'PlayersController', [ '$scope', '$routeParams', 'angularFire', 'NFL', 'Players',
      function ($scope, $routeParams, angularFire, NFL, Players) {
        
        $scope.positions = NFL.positions;
        $scope.nflteams = NFL.teams;
        $scope.searchsize = {
          limit: 10
        };
        $scope.strictsearch = {};

        $scope.findPlayers = function () {
          $scope.players = Players.collection();
        };

        $scope.findOnePlayer = function () {
          angularFire( Players.find( $routeParams.playerId ), $scope, 'player' );
        };
      }
  ]);