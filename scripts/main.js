/**
 * Created by ypling on 5/4/15.
 */
'use strict';

var app=angular.module('ROIClientApp', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/dashboard', {
                templateUrl: './views/dashboard.html',
                controller:'dashboardCtrl'
            })
            .when('/planforward', {
                templateUrl: './views/planforward.html',
                controller:'forwardCtrl'
            })
            .when('/lookback', {
                templateUrl: './views/lookback.html',
                controller:'backCtrl'
            })
            .when('/mysenarios', {
                templateUrl: './views/mysenarios.html',
                controller:'scenariosCtrl'
            })
            .when('/compare', {
                templateUrl: './views/compare.html',
                controller:'compareCtrl'
            })
            .otherwise({
                templateUrl: './views/dashboard.html',
                controller:''
            })
    });

var compareCtrl = function(){};

