'use strict';

angular.module('atwork.galleries')
  .factory('appGallery', ['$resource',
    function($resource) {
      return {
        single: $resource('blogs/:blogId/:action', {
            blogId: '@_id'
          }, {
            like: {
              method: 'POST',
              params: {action: 'like'}
            },
            unlike: {
              method: 'POST',
              params: {action: 'unlike'}
            },
            comment: {
              method: 'POST',
              params: {action: 'comment'}
            },
            likes: {
              method: 'GET',
              params: {action: 'likes'}
            }
          }),
        feed: $resource('blogs/'),
      }
    }
  ])
  .directive('awGalleryPop', [
    'appGallery',
    'appWebSocket',
    'appAuth',
    'appDialog',
    function(appGallery, appWebSocket, appAuth, appDialog) {
      return {
        templateUrl: '/modules/galleries/views/popup.html',
        controller: [
          '$scope',
          function($scope) {

          }
        ]
      }
    }
  ])