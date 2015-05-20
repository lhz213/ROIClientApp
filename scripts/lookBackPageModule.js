/**
 * Created by Haizhou on 5/8/2015.
 */
'use strict';
var moduleName = 'ROIClientAppLookBackModule';
angular.module(moduleName, [])
    .controller('backCtrl', ['$scope', '$http','$location', function ($scope, $http, $location) {
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
            $scope.lookBack.beginPeriod = new Date(date.getFullYear(), date.getMonth(), 1);
            $scope.lookBack.endPeriod = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            $scope.maxDate = new Date();
        };
        $scope.open = function ($event, model) {
            $event.preventDefault();
            $event.stopPropagation();

            if (model === 'lookBackBeginPeriod') {
                $scope.opened.lookBackBeginPeriod = !$scope.opened.lookBackBeginPeriod;
                $scope.opened.lookBackEndPeriod = false;
            } else {
                $scope.minDate = new Date($scope.lookBack.beginPeriod);
                $scope.opened.lookBackEndPeriod = !$scope.opened.lookBackEndPeriod;
                $scope.opened.lookBackBeginPeriod = false;
            }
        };
        $scope.getLastDate = function () {
            $scope.lookBack.endPeriod = new Date($scope.lookBack.endPeriod);
            $scope.lookBack.endPeriod = new Date($scope.lookBack.endPeriod.getFullYear(), $scope.lookBack.endPeriod.getMonth() + 1, 0);
        };

        // init data default
        $scope.resetForm = function () {
            // Nav bar
            $scope.nav = {};
            $scope.nav.current = 'Initial Input';

            // Data
            $scope.lookBack = {};

            // Brand
            $scope.brands = ['Brilent'];
            $scope.lookBack.brand = $scope.brands[0];

            // Attribution
            $scope.lookBack.attribution = 'MTA';

            //
            $scope.formatInput = function () {
                $scope.lookBack.spend = ($filter('formatCurrency')($scope.lookBack.spend)).substr(1);
            };

            // Include data
            $scope.lookBack.include = true;

            // Calendar
            $scope.today();

            // Table
            $scope.lookBack.input = {};
        };
        $scope.resetForm();

        // table
        // sem-brand, sem-card, sem-photobook, sem-other show and hide
        $scope.showSemItems = false;

        $scope.calculate = function () {
            $http.get('/ROIClientApp/dummy_data/output/1430764474_63.json').success(function (data) {
                $scope.lookBack.output = data;
                $scope.lookBack.dataThrough = new Date($scope.lookBack.endPeriod);
                $scope.lookBack.dataThrough.setMonth($scope.lookBack.include ? $scope.lookBack.endPeriod.getMonth() : $scope.lookBack.endPeriod.getMonth() - 1);

                // set default value of input
                $scope.lookBack.input.semBSB = Number($scope.lookBack.output.semBLB);
                $scope.lookBack.input.semCSB = Number($scope.lookBack.output.semCLB);
                $scope.lookBack.input.semPSB = Number($scope.lookBack.output.semPLB);
                $scope.lookBack.input.semOSB = Number($scope.lookBack.output.semOLB);
                $scope.lookBack.input.disSB = Number($scope.lookBack.output.disLB);
                $scope.lookBack.input.socSB = Number($scope.lookBack.output.socLB);
                $scope.lookBack.input.affSB = Number($scope.lookBack.output.affLB);
                $scope.lookBack.input.parSB = Number($scope.lookBack.output.parLB);

                // jump to output page
                $scope.nav.current = 'Output';
            });
        };
        $scope.save = function () {
            $location.path('lookback/save');
        }
    }])
    .directive('formatInput', ['$filter', function ($filter) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModel) {
                if (!ngModel) return;

                ngModel.$formatters.unshift(function (a) {
                    return $filter('formatCurrency')(ngModel.$modelValue)
                });

                ngModel.$parsers.unshift(function (viewValue) {
                    var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                    elem.val($filter('formatCurrency')(plainNumber));
                    return plainNumber;
                });
            }
        };
    }])
    .directive('stringToNumber', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (value) {
                    return '' + value;
                });
                ngModel.$formatters.push(function (value) {
                    return parseFloat(value, 10);
                });
            }
        };
    })
    .filter('formatDate', function () {
        function formatDateFilter(element, input) {
            switch (element) {
                case 'dd':
                    return input.getDate();
                case 'Month':
                    return input.toDateString().split(' ')[1];
                case 'MM':
                    return input.getMonth() + 1;
                case 'yyyy':
                    return input.getFullYear();
                case 'yy':
                    return input.getYear();
                default :
                    return input.toDateString().split(' ')[1] + "-" + input.getDate() + "-" + input.getFullYear();
            }
        }

        return function (input, formatStr) {
            input = input || new Date();
            var formatDetail = formatStr ? formatStr.split('-') : ['default'];
            var output = "";
            formatDetail.forEach(function (element) {
                output = output + " " + formatDateFilter(element, input);
            });
            return output;
        };
    })
    .filter('formatCurrency', function () {
        return function (input) {
            input = input || 0;
            if (typeof input === 'string') {
                input = input.split(',').join('');
            }
            var output = Number(input).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').toString();
            return "$" + output.substr(0, output.length - 3);
        }
    });