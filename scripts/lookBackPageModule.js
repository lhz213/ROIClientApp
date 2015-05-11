/**
 * Created by Haizhou on 5/8/2015.
 */
'use strict';
var moduleName = 'ROIClientAppLookBackModule';
angular.module(moduleName, [])
    .controller('backCtrl', ['$scope', '$filter', function ($scope, $filter) {
        // tooltips
        $scope.brandTooltips = 'brandTooltips';
        $scope.attrTooltips = 'attrTooltips';
        $scope.beginPeriodTooltips = 'beginPeriodTooltips';
        $scope.endPeriodTooltips = 'endPeriodTooltips';
        $scope.spendTooltips = 'spendTooltips';
        $scope.includeTooltips = 'includeTooltips';

        // nav bar
        $scope.nav = {};
        $scope.nav.items = [];
        $scope.nav.items[0] = '<a href="">Dash Board</a>';
        $scope.nav.items[1] = '<a href="#lookback">Look Back</a>';
        $scope.nav.items[2] = 'Initial Input';

        // data default
        $scope.lookBack = {};
        $scope.lookBack.include = true;

        // Brand
        $scope.brands = ['Shutterfly'];
        $scope.lookBack.brand = $scope.brands[0];

        // Attribution
        $scope.lookBack.attribution = 'MAT';

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

        $scope.formatCurrency = function () {
            $scope.lookBack.spend = $filter('formatCurrency')($scope.lookBack.spend);
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
            return Number(input).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
    });