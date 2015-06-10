/**
 * Created by Haizhou on 5/11/2015.
 */
'use strict';
angular.module("ROIClientApp")
    .controller('forwardCtrl', ['$scope', '$filter', '$http', '$location', function ($scope, $filter, $http, $location) {

        // tooltips
        $scope.brandTooltips = 'brandTooltips';
        $scope.attrTooltips = 'attrTooltips';
        $scope.beginPeriodTooltips = 'beginPeriodTooltips';
        $scope.endPeriodTooltips = 'endPeriodTooltips';
        $scope.spendTooltips = 'spendTooltips';
        $scope.includeTooltips = 'includeTooltips';

        // Calendar settings
        $scope.opened = {};
        $scope.format = 'MMMM-dd-yyyy';
        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1,
            minMode: 'month'
        };
        $scope.today = function () {
            var date = new Date();
            $scope.planForward.beginPeriod = new Date(date.getFullYear(), date.getMonth(), 1);
            $scope.planForward.endPeriod = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            $scope.minDate = new Date();
        };
        $scope.open = function ($event, model) {
            $event.preventDefault();
            $event.stopPropagation();

            if (model === 'planForwardBeginPeriod') {
                $scope.opened.planForwardBeginPeriod = !$scope.opened.planForwardBeginPeriod;
                $scope.opened.planForwardEndPeriod = false;
            } else {
                $scope.minDate = new Date($scope.planForward.beginPeriod);
                $scope.opened.planForwardEndPeriod = !$scope.opened.planForwardEndPeriod;
                $scope.opened.planForwardBeginPeriod = false;
            }
        };
        $scope.getLastDate = function () {
            $scope.planForward.endPeriod = new Date($scope.planForward.endPeriod);
            $scope.planForward.endPeriod = new Date($scope.planForward.endPeriod.getFullYear(), $scope.planForward.endPeriod.getMonth() + 1, 0);
        };

        // init data default
        $scope.resetForm = function () {
            // Nav bar
            $scope.nav = {};
            $scope.nav.current = 'Initial Input';

            // Data
            $scope.planForward = {};

            // Brand
            $scope.brands = ['Brilent'];
            $scope.planForward.brand = $scope.brands[0];

            // Attribution
            $scope.planForward.attribution = 'LTA';

            //
            $scope.formatInput = function () {
                $scope.planForward.spend = ($filter('formatCurrency')($scope.planForward.spend)).substr(1);
            };

            // Calendar
            $scope.today();

            // init data output
            $scope.planForward.input = {};
        };
        $scope.resetForm();

        $scope.CInput = function () {
            var length = ($scope.planForward.endPeriod.getFullYear() - $scope.planForward.beginPeriod.getFullYear()) * 12 + ($scope.planForward.endPeriod.getMonth() - $scope.planForward.beginPeriod.getMonth()) + 1;
            $scope.planForward.ControlChannels = [];
            for (var i = 0; i < length; i++) {
                var d = new Date($scope.planForward.beginPeriod);
                d.setMonth(($scope.planForward.beginPeriod.getMonth() + i) % 12);
                d.setFullYear($scope.planForward.beginPeriod.getFullYear() + Math.floor(($scope.planForward.beginPeriod.getMonth() + i) / 12));
                $scope.planForward.ControlChannels.push(d);
            }

            // init plan forward select plan all checked
            $scope.planForward.selectPlan = {};
            $scope.planForward.selectPlan.semTotal = true;
            $scope.planForward.selectPlan.semBrand = true;
            $scope.planForward.selectPlan.semCard = true;
            $scope.planForward.selectPlan.semPhotobook = true;
            $scope.planForward.selectPlan.semOthers = true;
            $scope.planForward.selectPlan.display = true;
            $scope.planForward.selectPlan.social = true;
            $scope.planForward.selectPlan.affiliates = true;
            $scope.planForward.selectPlan.partners = true;

            // get data

            $http.get('/ROIClientApp/dummy_data/output/1430764474_63.json').success(function (data) {
                $scope.planForward.output = data;
                $scope.planForward.dataThrough = new Date($scope.planForward.endPeriod);
                $scope.planForward.dataThrough.setMonth($scope.planForward.include ? $scope.planForward.endPeriod.getMonth() : $scope.planForward.endPeriod.getMonth() - 1);

                $scope.planForward.output.semTLB = Number($scope.planForward.output.semBLB) + Number($scope.planForward.output.semCLB) + Number($scope.planForward.output.semPLB) + Number($scope.planForward.output.semOLB);
                $scope.planForward.output.semTUB = Number($scope.planForward.output.semBUB) + Number($scope.planForward.output.semCUB) + Number($scope.planForward.output.semPUB) + Number($scope.planForward.output.semOUB);

                // set default value of input
                $scope.planForward.input.semMin = $scope.planForward.output.semTLB;
                $scope.planForward.input.semMax = $scope.planForward.output.semTUB;
                $scope.planForward.input.semBMin = $scope.planForward.output.semBLB;
                $scope.planForward.input.semBMax = $scope.planForward.output.semBUB;
                $scope.planForward.input.semCMin = $scope.planForward.output.semCLB;
                $scope.planForward.input.semCMax = $scope.planForward.output.semCUB;
                $scope.planForward.input.semPMin = $scope.planForward.output.semPLB;
                $scope.planForward.input.semPMax = $scope.planForward.output.semPUB;
                $scope.planForward.input.semOMin = $scope.planForward.output.semOLB;
                $scope.planForward.input.semOMax = $scope.planForward.output.semOUB;
                $scope.planForward.input.disMin = Number($scope.planForward.output.disLB);
                $scope.planForward.input.disMax = Number($scope.planForward.output.disUB);
                $scope.planForward.input.socMin = Number($scope.planForward.output.socLB);
                $scope.planForward.input.socMax = Number($scope.planForward.output.socUB);
                $scope.planForward.input.affMin = Number($scope.planForward.output.affLB);
                $scope.planForward.input.affMax = Number($scope.planForward.output.affUB);
                $scope.planForward.input.parMin = Number($scope.planForward.output.parLB);
                $scope.planForward.input.parMax = Number($scope.planForward.output.parUB);
            });
            $scope.nav.current = 'Constraints Input';
        };

        $scope.totCheck = function () {
            if (!$scope.planForward.selectPlan.semTotal) {
                Object.keys($scope.planForward.selectPlan).forEach(function (key) {
                    $scope.planForward.selectPlan[key] = key.toString().indexOf('sem') < 0 ? $scope.planForward.selectPlan[key] : false;
                });
            } else {
                Object.keys($scope.planForward.selectPlan).forEach(function (key) {
                    $scope.planForward.selectPlan[key] = key.toString().indexOf('sem') < 0 ? $scope.planForward.selectPlan[key] : true;
                });
            }
            $scope.semTSP = !$scope.semTSP;
        };
        $scope.subCheck = function () {
            $scope.planForward.selectPlan.semTotal = !!($scope.planForward.selectPlan.semBrand && $scope.planForward.selectPlan.semCard && $scope.planForward.selectPlan.semPhotobook && $scope.planForward.selectPlan.semOthers);
        };

        $scope.calculate = function () {
            // init data
            $scope.planForward.input.semAS = Number($scope.planForward.output.semTLB);
            $scope.planForward.input.disAS = Number($scope.planForward.output.disLB);
            $scope.planForward.input.socAS = Number($scope.planForward.output.socLB);
            $scope.planForward.input.affAS = Number($scope.planForward.output.affLB);
            $scope.planForward.input.parAS = Number($scope.planForward.output.parLB);

            $scope.nav.current = 'Output'
        };

        $scope.$watch('planForward', function () {
            if ($scope.nav.current === 'Constraints Input') {
                $scope.planForward.input.semMin = Number($scope.planForward.input.semBMin) + Number($scope.planForward.input.semCMin) + Number($scope.planForward.input.semPMin) + Number($scope.planForward.input.semOMin);
                $scope.planForward.input.semMax = Number($scope.planForward.input.semBMax) + Number($scope.planForward.input.semCMax) + Number($scope.planForward.input.semPMax) + Number($scope.planForward.input.semOMax);
            } else if ($scope.nav.current === 'Output') {
            }
        }, true);

        $scope.save = function () {
            $location.path('planforward/save');
        }
    }]);