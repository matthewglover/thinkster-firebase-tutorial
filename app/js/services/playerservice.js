'use strict';

/**
* fantasyApp.services.players Module
*
* Description
*/
angular.module( 'fantasyApp.services.players', ['fantasyApp.services.firebaseRefs'] )
  .factory( 'Players', ['FBURL', 'Firebase', 'angularFireCollection', 'FireRef',
    function( FBURL, Firebase, angularFireCollection, FireRef ) {
      return {
        collection: function () {
          return angularFireCollection( FireRef.players() );
        },
        find: function ( playerId ) {
          return FireRef.players().child( playerId );
        }
      };
    }
  ]);