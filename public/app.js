var app = angular.module('AtWork', [
  'atwork.system', 
  'atwork.users', 
  'atwork.posts', 
  'atwork.streams',
  'atwork.blogs', 
  'atwork.galleries', 
  'atwork.chats', 
  'atwork.activities', 
  'atwork.notifications', 
  'atwork.settings', 
  'ngMaterial',
]).config(['$qProvider', function ($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);
/*
.config(['$routeProvider','ngMetaProvider',function($routeProvider, ngMetaProvider) {
  ngMetaProvider.setDefaultTitle('First ever social network for Tamizhans');
  ngMetaProvider.setDefaultTag('description', 'Taking TN to the next level');
}])
.run(['ngMeta', function(ngMeta) {
  ngMeta.init();
}]);
*/
app.controller('AppCtrl', [
  '$scope', 
  '$route',
  '$rootScope',
  '$mdMedia', 
  '$mdSidenav',
  '$mdBottomSheet',
  '$location',
  '$timeout',
  'appLocation',
  'appAuth',
  'appWebSocket',
  'appSettings',
  'appSettingsValid',
  'appToast',
  function($scope, $route, $rootScope, $mdMedia, $mdSidenav, $mdBottomSheet, $location, $timeout, appLocation, appAuth, appWebSocket, appSettings, appSettingsValid, appToast) {
    $scope.barTitle = '';
    $scope.search = '';
    $scope.showSideNav = true;

    $scope.toggleSidenav = function(menuId) {
      $scope.showSideNav = !$scope.showSideNav;
      if(!$mdMedia('gt-sm')){
        $mdSidenav(menuId).toggle();
      }
    };

    $scope.updateLoginStatus = function() {
      $scope.isLoggedIn = appAuth.isLoggedIn();
      $scope.user = appAuth.getUser();
      $rootScope.currUserId = $scope.user._id;
      $rootScope.currUserRoles = $scope.user.roles;
      $rootScope.currUserDesig = $scope.user.designation? $scope.user.designation : "user";
      $rootScope.isAdmin = appAuth.getUser().roles?(appAuth.getUser().roles.indexOf('admin') !== -1): false;
    };

    $scope.goHome = function() {
      appLocation.url('/');
    };

    $scope.showUserActions = function($event) {
      $mdBottomSheet.show({
        templateUrl: '/modules/users/views/user-list.html',
        controller: 'UserSheet',
        targetEvent: $event
      }).then(function(clickedItem) {
        $scope.alert = clickedItem.name + ' clicked!';
      });
    };

    var initiateSettings = function(cb) {
      appSettings.fetch(function(settings) {
        $rootScope.systemSettings = settings;
        if (cb) {
          cb();
        }
      });
    };

    /**
     * Scroll the view to top on route change
     */
    $scope.$on('$routeChangeSuccess', function() {
      console.log("routeChanged");
      angular.element('*[md-scroll-y]').animate({scrollTop: 0}, 300);
      $mdSidenav('left').close();
    });

    $scope.$on('loggedIn', function() {
      $scope.updateLoginStatus();
      $scope.barTitle = '';
      $scope.$broadcast('updateNotifications');
      appWebSocket.conn.emit('online', {token: appAuth.getToken()});
      appAuth.refreshUser(function(user) {
        $scope.user = user;
      });
      /**
       * Fetch settings and get the app ready
       */
      initiateSettings(function() {
        $scope.$on('$routeChangeStart', function (event, toState) {
          console.log("routeChangeStart");
          var valid = appSettingsValid();
          if (!valid) {
            appToast('Please complete the setup first.');
          }
        });
        $scope.appReady = true;
        $scope.barTitle = $rootScope.systemSettings.tagline;
        $timeout(appSettingsValid);
      });
      
    });

    $scope.$on('loggedOut', function() {
      $scope.updateLoginStatus();
      appWebSocket.conn.emit('logout', {token: appAuth.getToken()});
    });

    appWebSocket.conn.on('connect', function() {
      if (appAuth.isLoggedIn()) {
        appWebSocket.conn.emit('online', {token: appAuth.getToken()});
      }
    });

    $scope.updateLoginStatus();
    $timeout(function() {
      if (!appAuth.isLoggedIn()) {
        if (window.location.href.indexOf('/activate/') == -1 && window.location.href.indexOf('/changePassword/') == -1 && window.location.href.indexOf('/blog/') == -1 && window.location.href.indexOf('/post/') == -1) {
          appLocation.url('/login');
        }
        initiateSettings();
        $scope.appReady = true;
      } else {
        $scope.barTitle = '';
        $scope.$broadcast('loggedIn');
      }
      
    });
  }
]);

app.factory('UploadService', function(){
  return{
    getFilesSrc: getFilesSrc,
    setFilesSrc: setFilesSrc,
    getFilesToUpload: getFilesToUpload,
    setFilesToUpload: setFilesToUpload,
    clearFilesSrc: clearFilesSrc,
  }

  var filesToUpload = [];
  var filesSrc = [];

  function getFilesToUpload(){
    return this.filesToUpload;
  }
  function setFilesToUpload(filesToUpload){
    this.filesToUpload = filesToUpload;
  }

  function getFilesSrc(){
    return this.filesToUpload;
  }
  function setFilesSrc(filesSrc){
    this.filesSrc = filesSrc;
  }
  function clearFilesSrc(filesSrc){
    this.filesSrc = [];
  }

})