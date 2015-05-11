'use strict';

/**
 * @ngdoc overview
 * @name showcaseApp
 * @description
 * # showcaseApp
 *
 * Main module of the application.
 */
angular
    .module('webIHMApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function ($routeProvider) { //traite le chemin aprés les # dans url du site
        $routeProvider
          .when('/', {
            templateUrl: '../views/rechercheEtModification.html',
            controller: 'RechercheCtrl'
            })
            .when('/creation', {
                templateUrl: '../views/creation.html',
                controller: 'CreationCtrl'
            })
            .when('/nouvRole', {
                templateUrl: '../views/nouvRole.html',
                controller: 'NouvRoleCtrl'
            })

            .otherwise({
            redirectTo: '/'
        });
    });

