/**
 * Created by Haizhou on 5/8/2015.
 */
'use strict';
var moduleName = 'ROIClientAppLookBackModule';
angular.module(moduleName, [])
    .controller('backCtrl', ['$scope', '$http', function ($scope, $http) {
        // tooltips
        $scope.brandTooltips = 'brandTooltips';
        $scope.attrTooltips = 'attrTooltips';
        $scope.beginPeriodTooltips = 'beginPeriodTooltips';
        $scope.endPeriodTooltips = 'endPeriodTooltips';
        $scope.spendTooltips = 'spendTooltips';
        $scope.includeTooltips = 'includeTooltips';

        // nav bar
        $scope.nav = {};
        $scope.nav.current = 'Initial Input';

        // data default
        $scope.lookBack = {};
        $scope.lookBack.include = true;

        // Brand
        $scope.brands = ['Shutterfly'];
        $scope.lookBack.brand = $scope.brands[0];

        // Attribution
        $scope.lookBack.attribution = 'MTA';

        // calendar
        $scope.opened = {};
        $scope.format = 'MMMM-yy';
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            minMode: 'month'
        };

        $scope.today = function () {
            $scope.lookBack.beginPeriod = new Date();
            $scope.lookBack.endPeriod = new Date();
            $scope.maxDate = new Date();
        };
        $scope.today();
        $scope.open = function ($event, model) {
            $event.preventDefault();
            $event.stopPropagation();

            if (model === 'lookBackBeginPeriod') {
                $scope.opened.lookBackBeginPeriod = true;
                $scope.opened.lookBackEndPeriod = false;
            } else {
                $scope.minDate = new Date($scope.lookBack.beginPeriod);
                $scope.opened.lookBackBeginPeriod = false;
                $scope.opened.lookBackEndPeriod = true;
            }
        };


        $scope.lookBack.input = {};
        $scope.lookBack.input.semTSB = 0;

        $scope.calculate = function () {
            $http.get('/ROIClientApp/dummy_data/output/1430764474_63.json').success(function (data) {
                $scope.lookBack.output = data;
                $scope.lookBack.dataThrough = new Date($scope.lookBack.endPeriod);
                $scope.lookBack.dataThrough.setMonth($scope.lookBack.include ? $scope.lookBack.endPeriod.getMonth() : $scope.lookBack.endPeriod.getMonth() - 1);

                $scope.lookBack.input.semBSB = $scope.lookBack.output.semBLB - 1 + 1;
                $scope.lookBack.input.semCSB = $scope.lookBack.output.semCLB - 1 + 1;
                $scope.lookBack.input.semPSB = $scope.lookBack.output.semPLB - 1 + 1;
                $scope.lookBack.input.semOSB = $scope.lookBack.output.semOLB - 1 + 1;
                $scope.lookBack.input.disSB = $scope.lookBack.output.disLB - 1 + 1;
                $scope.lookBack.input.socSB = $scope.lookBack.output.socLB - 1 + 1;
                $scope.lookBack.input.affSB = $scope.lookBack.output.affLB - 1 + 1;
                $scope.lookBack.input.parSB = $scope.lookBack.output.parLB - 1 + 1;
                $scope.lookBack.output.semTLB = ($scope.lookBack.output.semBLB - 1) + ($scope.lookBack.output.semCLB - 1) + ($scope.lookBack.output.semPLB - 1) + ($scope.lookBack.output.semOLB - 1) + 4;
                $scope.lookBack.output.semTUB = ($scope.lookBack.output.semBUB - 1) + ($scope.lookBack.output.semCUB - 1) + ($scope.lookBack.output.semPUB - 1) + ($scope.lookBack.output.semOUB - 1) + 4;
                $scope.lookBack.input.semTSB = $scope.lookBack.input.semBSB + $scope.lookBack.input.semCSB + $scope.lookBack.input.semPSB + $scope.lookBack.input.semOSB;

                console.log($scope.lookBack.input.semTSB);
                $scope.nav.current = 'Output';
            });
        }
    }])
    .directive('format', ['$filter', function ($filter) {
        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;


                ctrl.$formatters.unshift(function (a) {
                    return $filter(attrs.format)(ctrl.$modelValue)
                });


                ctrl.$parsers.unshift(function (viewValue) {
                    var plainNumber = viewValue;
                    elem.val($filter(attrs.format)(plainNumber));
                    console.log(plainNumber);
                    return plainNumber;
                });
            }
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
    })
    .filter('formatCurrency', function () {
        return function (input) {
            input = input || 0;
            var output = Number(input).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString();
            return "$" + output.substr(0, output.length - 3);
        }
    });