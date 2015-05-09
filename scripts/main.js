/**
 * Created by ypling on 5/4/15.
 */
'use strict';

var app = angular.module('ROIClientApp', ['ngRoute'])
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
app.controller("indexCtrl",function($scope){
    $scope.users=[];
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var recentDate=" "+ today.toDateString().split(" ").splice(0,3).join("-");
    //var recentDate = " "+today.getMonth()+"/"+today.getDate();

    $scope.users.push({
        name:"Ed",
        recentlyLoginRecord : "Last Logged on"+recentDate
    });



});

app.controller("scenariosCtrl", function ($scope) {
        $scope.path=
            [{title:"Scenarios",link:function(){}},
             {title:"Save",link:function(){}}
            ];
        $scope.scenarios = [];
        $scope.scenarios.push({
            id: "id",
            name: "name",
            note: "note",
            createDate: "createDate",
            beginMonth: "beginMonth",
            endMonth: "endMonth",
            brand: "brand",
            plannedSpend: "plannedSpend",
            AM: "AM",
            historyIncluded: "historyIncluded",
            DataThrough: "DataThrough",
            shared: "shared"
        })
    }
);
