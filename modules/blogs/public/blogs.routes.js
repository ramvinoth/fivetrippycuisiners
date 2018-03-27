'use strict';

angular.module('atwork.blogs')
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/blog', {
        templateUrl: '/modules/blogs/views/blogs.html',
        controller: 'BlogsCtrl',
        resolve: {
          resolvedBlogs: resolvedBlogs({limitComments: true})
        }
      })
      .when('/blog/add', {
        templateUrl: '/modules/blogs/views/add-blog.html',
        controller: 'BlogsCtrl',
        resolve: {
          resolvedBlogs: resolvedBlogs({limitComments: true})
        }
      })
      ;
    $locationProvider.html5Mode(true);
  }]);

/**
 * Get configuration for resolved feeds to reuse in routes
 * @param  {Object} params Contains parameters for the options
 * @return {Array}
 */
function resolvedBlogs(params) {
  return [
    '$route',
    'appBlogsFeed',
    function($route, appBlogsFeed) {
      var deferred = Q.defer();
      var options = angular.extend({
        limitComments: params.limitComments
      }, $route.current.params);

      appBlogsFeed.getBlogs(options, function(response) {
        deferred.resolve(response);
      });

      return deferred.promise;
    }
  ];
}