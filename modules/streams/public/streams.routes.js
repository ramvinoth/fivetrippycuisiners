'use strict';

angular.module('atwork.streams')
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/stream/migration', {
        resolve: {
          resolvedFeeds: [
            '$route',
            '$resource',
            function($route, $resource){
              console.log("aaaaa");
              var migration = $resource('/streams/migration');
              migration.save({}, function(){
                console.log("trueeee");
              });
            }
          ]
        }
      })
      .when('/stream/:streamId', {
        templateUrl: '/modules/posts/views/feed.html',
        controller: 'PostsCtrl',
        resolve: {
          resolvedFeeds: [
            '$route',
            'appPostsFeed',
            function($route, appPostsFeed) {
              var deferred = Q.defer();
              var options = angular.extend({
                limitComments: true
              }, $route.current.params);

              appPostsFeed.getFeeds(options, function(response) {
                deferred.resolve(response);
              });

              return deferred.promise;
            }
          ]
        }
      })
      ;
    $locationProvider.html5Mode(true);
  }]);