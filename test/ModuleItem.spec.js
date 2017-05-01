/**
 * Created by bjoern-mbp on 01.05.17.
 */
describe('ModuleItem tests', function () {
    var $compile, $scope;
    beforeEach(module('templates'));
    beforeEach(module('calculator'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
    }));

    var compileDirective = function (module) {
        var htmlCode = '<tr module-item="" item="module" on-delete="delete()"></tr>'

        $scope.module = module;
        $scope.delete = function () {
        };
        var element = angular.element(htmlCode);
        var compiled = $compile(element)($scope);
        $scope.$digest();

        return compiled;
    };

    it('should show module', function () {
        // init
        // when
        var element = compileDirective({name: 'Modulname', 'grade': 2, 'credits': 3});
        // then
        expect(element.find('td').eq(0).text()).toEqual('Modulname');
        expect(element.find('td').eq(1).text()).toEqual('3');
        expect(element.find('td').eq(2).text()).toEqual('2');
    });

    it('should handle delete', function () {
        // init
        var element = compileDirective({name: 'Modulname', 'grade': 2, 'credits': 3});
        spyOn($scope, 'delete');
        // when
        element.find('button').click();
        // then
        expect($scope.delete).toHaveBeenCalled();
    });
});