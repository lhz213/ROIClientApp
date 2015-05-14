/**
 * Created by Haizhou on 5/11/2015.
 */
'use strict';
var moduleName = 'ROIClientAppPlanForwardModule';
angular.module(moduleName, [])
    .controller('forwardCtrl', ['$scope', function ($scope) {

        // tooltips
        $scope.brandTooltips = 'brandTooltips';
        $scope.attrTooltips = 'attrTooltips';
        $scope.beginPeriodTooltips = 'beginPeriodTooltips';
        $scope.endPeriodTooltips = 'endPeriodTooltips';
        $scope.spendTooltips = 'spendTooltips';
        $scope.includeTooltips = 'includeTooltips';

        // Calendar settings
        $scope.opened = {};
        $scope.format = 'MMMM-yy';
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            minMode: 'month'
        };
        $scope.today = function () {
            $scope.planForward.beginPeriod = new Date();
            $scope.planForward.endPeriod = new Date();
            $scope.maxDate = new Date();
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

        // init data default
        $scope.resetForm = function () {
            // Nav bar
            $scope.nav = {};
            $scope.nav.current = 'Initial Input';

            // Data
            $scope.planForward = {};

            // Brand
            $scope.brands = ['Shutterfly'];
            $scope.planForward.brand = $scope.brands[0];

            // Attribution
            $scope.planForward.attribution = 'LTA';

            // Calendar
            $scope.today();
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
            $scope.nav.current = 'Constraints Input';
        };

        $scope.semTSP = false;

        $scope.totCheck = function () {
            console.log($scope.semTSP);
            if ($scope.semTSP) {
                $scope.planForward.semBSP = false;
                $scope.planForward.semCSP = false;
                $scope.planForward.semOSP = false;
                $scope.planForward.semPSP = false;
            } else {
                $scope.planForward.semBSP = true;
                $scope.planForward.semCSP = true;
                $scope.planForward.semOSP = true;
                $scope.planForward.semPSP = true;
            }
            $scope.semTSP = !$scope.semTSP;
        };
    }])
    .filter('formatDate', function () {
        function format(element, input) {
            switch (element) {
                case 'Month':
                    return input.toDateString().split(' ')[1];
                case 'MM':
                    return input.getMonth() + 1;
                case 'yyyy':
                    return input.getFullYear();
                case 'yy':
                    return input.getYear();
                default :
                    return input.toDateString().split(' ')[1] + "-" + input.getFullYear();
            }
        }

        return function (input, formatStr) {
            input = input || new Date();
            var formatDetail = formatStr ? formatStr.split('-') : ['default'];
            var output = "";
            formatDetail.forEach(function (element) {
                output = output + " " + format(element, input);
            });
            return output;
        };
    });