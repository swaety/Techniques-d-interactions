'use strict';

/**
 * @ngdoc overview
 * @name app1App
 * @description
 * # app1App
 *
 * Main module of the application.
 */
angular
  .module('app1App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/recuit', {
        templateUrl: 'views/recuit.html',
        controller: 'RecuitCtrl',
        controllerAs: 'recuit'
      })
      .otherwise({
        redirectTo: '/404.html'
      });
  });
