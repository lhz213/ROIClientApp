/**
 * Created by ypling on 5/4/15.
 */
'use strict';

var app = angular.module('ROIClientApp', ['ngRoute', 'ui.bootstrap', 'ROIClientAppLookBackModule', 'ngSanitize'])
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
    $scope.menuState = {  show: true, cssLeft:"sidebar-before-left",cssRight:"sidebar-before-right" };

    $scope.toggleMenu = function() {
        $scope.menuState.show = !$scope.menuState.show;
        if(!$scope.menuState.show){
            $scope.menuState.cssLeft="sidebar-after-left";
            $scope.menuState.cssRight="sidebar-after-right";
        }
        else{
            $scope.menuState.cssLeft="sidebar-before-left";
            $scope.menuState.cssRight="sidebar-before-right";
        }



    };

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
        function activeCount(arr){
            var result = 0;
            arr.forEach(function(obj){
                if(obj.isActive){
                    result++;
                }
            });
            return result;
        }

        var viewName = ['list','export','retrieve','share'];

        $scope.activeView = viewName[0];
        $scope.path=
            [{title:"Scenarios",link:function(){}},
             {title:"Save",link:function(){}}
            ];
        $scope.operations ={
            Compare:{disable:true},
            Delete:{disable:true},
            Export:{disable:true},
            Retrieve:{disable:true},
            Share:{disable:true}
        };
        $scope.slecteRow = function(obj){
            obj.isActive = !obj.isActive;
            switch (activeCount($scope.scenarios)){
                case 0:
                    Object.keys($scope.operations).forEach(function(key){
                        $scope.operations[key].disable = true;
                    });
                    break;
                case 2:
                    $scope.operations['Compare'].disable = false;
                    break;
                case 1:
                    Object.keys($scope.operations).forEach(function(key){
                    if(key!=='Compare'){
                        $scope.operations[key].disable = false;
                    }else{
                        $scope.operations[key].disable = true;
                    }
                });
                    break;
                default:
                    Object.keys($scope.operations).forEach(function(key){
                        if(key!=='Delete'){
                            $scope.operations[key].disable = true;
                        }else{
                            $scope.operations[key].disable = false;
                        }
                    });
                    break;
            }
        };
        $scope.scenarios = [];
        $scope.scenarios.push({
            isActive:false,
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
        },{
            isActive:false,
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
        },{
            isActive:false,
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
