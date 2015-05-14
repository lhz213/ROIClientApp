/**
 * Created by Haizhou on 5/8/2015.
 */
'use strict';
var moduleName = 'ROIClientAppLookBackModule';
angular.module(moduleName, [])
    .controller('backCtrl', function ($scope, $http,$location) {
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
            $scope.lookBack.beginPeriod = new Date();
            $scope.lookBack.endPeriod = new Date();
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

        // init data default
        $scope.resetForm = function(){
            // Nav bar
            $scope.nav = {};
            $scope.nav.current = 'Initial Input';

            // Data
            $scope.lookBack = {};

            // Brand
            $scope.brands = ['Brient'];
            $scope.lookBack.brand = $scope.brands[0];

            // Attribution
            $scope.lookBack.attribution = 'MTA';

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
        $scope.showSemItems = true;

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
    })
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