'use strict';
 
angular.module('fantasyApp.services.fantasyTeams', [])
  .factory('FantasyTeams', ['$q', 'angularFireCollection', 'FireRef',
    function($q, angularFireCollection, FireRef) {
      return {
        collection: function(cb) {
          return angularFireCollection(FireRef.fantasyTeams(),cb);
        },
        find: function(fantasyTeamId) {
          return FireRef.fantasyTeams().child(fantasyTeamId);
        },
        create: function(fantasyTeam, owner, cb) {
          var deferred = $q.defer();
          var name = FireRef.fantasyTeams().push({
            name: fantasyTeam.name,
            leagueId: fantasyTeam.leagueId,
            ownerId: owner.id
          }, cb).name();
          FireRef.leagues().child('/'+fantasyTeam.leagueId+'/fantasyTeams/'+name).set(true);
          FireRef.users().child('/'+owner.id+'/fantasyTeams/'+name).set(true);
          deferred.resolve(name);
          return deferred.promise;
        },
        removeFantasyTeam: function(fantasyTeamId) {
          var fantasyTeam = this.find(fantasyTeamId);
          fantasyTeam.once('value',function(data) {
            FireRef.leagues().child('/'+data.val().leagueId).child('/fantasyTeams/'+fantasyTeamId).remove();
            FireRef.users().child('/'+data.val().ownerId).child('/fantasyTeams/'+fantasyTeamId).remove();
          });
          fantasyTeam.remove();
          return;
        }
      };
    }]);