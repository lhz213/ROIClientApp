/**
 * Created by ypling on 5/4/15.
 */
'use strict';

angular.module('ROIClientApp', ['ngRoute', 'ui.bootstrap', 'ROIClientAppLookBackModule', 'ngSanitize'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/planforward', {
                templateUrl: './views/planforward.html',
                controller: 'forwardCtrl'
            })
            .when('/lookback', {
                templateUrl: './views/lookback.html',
                controller: 'backCtrl'
            })
            .when('/mysenarios', {
                templateUrl: './views/mysenarios.html',
                controller: 'scenariosCtrl'
            })
            .when('/compare', {
                templateUrl: './views/compare.html',
                controller: 'compareCtrl'
            })
            .otherwise({
                templateUrl: './views/dashboard.html',
                controller: ''
            })
    });