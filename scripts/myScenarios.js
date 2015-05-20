/**
 * Created by ypling on 5/11/15.
 */
angular.module("ROIClientApp")
    .controller("scenariosCtrl",function ($scope,$location) {
        //vars
        var viewNames = ['list', 'export', 'retrieve', 'share'];

        //functions
        function activeCount(arr) {
            var result = 0;
            arr.forEach(function (obj) {
                if (obj.isActive) {
                    result++;
                }
            });
            return result;
        }

        //scope vars
        $scope.operations = {
            compare: {disable: true},
            delete: {disable: true},
            export: {disable: true},
            retrieve: {disable: true},
            share: {disable: true}
        };

        $scope.scenarios = [];
        $scope.scenarios.push({
            isActive: false,
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
        }, {
            isActive: false,
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
        }, {
            isActive: false,
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
        });
        //scope functions

        $scope.switchToView = function (viewName) {
            $location.path("myscenarios/"+viewName);
        };

        $scope.slecteRow = function (obj) {
            obj.isActive = !obj.isActive;
            switch (activeCount($scope.scenarios)) {
                case 0:
                    Object.keys($scope.operations).forEach(function (key) {
                        $scope.operations[key].disable = true;
                    });
                    break;
                case 1:
                    Object.keys($scope.operations).forEach(function (key) {
                        $scope.operations[key].disable = (key === 'compare');
                    });
                    break;
                case 2:
                    Object.keys($scope.operations).forEach(function (key) {
                        $scope.operations[key].disable = (key !== 'delete'&& key!=='compare');
                    });
                    break;
                default:
                    Object.keys($scope.operations).forEach(function (key) {
                        $scope.operations[key].disable = (key !== 'delete');
                    });
                    break;
            }
        };
        //main
    }
)
    .controller("scenariosExportCtrl", function ($scope) {
        //vars

        //functions

        //scope vars

        //scope functions
    }
)
    .controller("scenariosShareCtrl", function ($scope) {
        //vars

        //functions

        //scope vars

        //scope functions
    }
)
    .controller("saveCtrl", function ($scope) {
        //vars

        //functions

        //scope vars

        //scope functions
    }
)
    .controller("scenariosCompareCtrl", function ($scope) {
        //vars
        $scope.compareChartData = [
            {title: "item1", value: 10},
            {title: "item2", value: -50},
            {title: "item3", value: 100},
            {title: "item4", value: 150},
            {title: "item5", value: -90},
            {title: "item6", value: 100}
        ];
        //functions

        //scope vars

        //scope functions
    }
)
    .value('compareChartConfig', {
        width: 400,
        height: 350,
        margin: {left: 0, top: 20, right: 0, bottom: 30}
    });
