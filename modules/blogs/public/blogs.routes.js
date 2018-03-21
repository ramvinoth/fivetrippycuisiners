'use strict';

angular.module('atwork.blogs')
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/blogs', {
        templateUrl: '/modules/blogs/views/blogs.html',
        controller: 'BlogsCtrl'
      })
      .when('/blogs/add', {
        templateUrl: '/modules/blogs/views/add-blog.html',
        controller: 'BlogsCtrl'
      })
      ;
    $locationProvider.html5Mode(true);
  }]);