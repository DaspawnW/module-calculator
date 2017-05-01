var app = angular.module('calculator', []);

app.controller('CalculatorCtrl', function ($scope, ModuleListService) {
    $scope.moduleList = ModuleListService.getFromStorage();
    $scope.module = {};

    $scope.save = function () {
        $scope.moduleList.push(angular.copy($scope.module));
        $scope.module = {};
        ModuleListService.writeToStorage($scope.moduleList);
    };

    $scope.delete = function (index) {
        $scope.moduleList.splice(index, 1);
        ModuleListService.writeToStorage($scope.moduleList);
    };

    $scope.sum = function() {
        return ModuleListService.calcSum($scope.moduleList);
    }

});

app.factory('ModuleListService', function () {
    return {
        getFromStorage: function () {
            var storage = localStorage.getItem('moduleList');

            if (storage != null) {
                return JSON.parse(storage);
            }

            return [];
        },
        writeToStorage: function (moduleList) {
            localStorage.setItem('moduleList', angular.toJson(moduleList));
        },
        calcSum: function (moduleList) {
            var sum = 0;
            moduleList.forEach(function (value) {
                sum += value.grade;
            });

            if (sum == 0) {
                return 0;
            }

            return sum / moduleList.length;
        }
    }
});

app.directive('moduleItem', function () {
    return {
        restrict: 'A',
        templateUrl: 'module-item.html',
        scope: {
            onDelete: '&',
            item: '='
        },
        link: function (scope) {
            scope.delete = function () {
                scope.onDelete();
            };
        }
    }
});