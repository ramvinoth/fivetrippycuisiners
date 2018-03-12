'use strict';

angular.module('atwork.blogs')
  .factory('appBlogs', ['$resource',
    function($resource) {
      return {
        single: $resource('blogs/:blogId/:action', {
            blogId: '@_id'
          })
      }
    }
  ])
  ;
  