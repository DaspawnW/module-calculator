/**
 * Created by bjoern-mbp on 01.05.17.
 */

describe('CalculatorCtrl test', function () {

    var $controller, $rootScope, ModuleListService;

    beforeEach(module('calculator'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _ModuleListService_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        ModuleListService = _ModuleListService_;
    }));

    var createCtrl = function () {
        var scope = $rootScope.$new();
        $controller('CalculatorCtrl', {
            $scope: scope
        });
        return scope;
    };

    it('should have specified methods', function() {
        var scope = createCtrl();

        expect(scope.save).toBeDefined();
        expect(scope.delete).toBeDefined();
        expect(scope.sum).toBeDefined();
    });

    it('should request ModuleListService for items from Storage', function () {
        // init
        spyOn(ModuleListService, 'getFromStorage').and.returnValue([{name: 'modulename', credits: 3, grade: 2}]);
        //when
        var scope = createCtrl();
        //then
        expect(ModuleListService.getFromStorage).toHaveBeenCalled();
        expect(scope.moduleList.length).toEqual(1);
    });

    it('should delete from ModuleList', function () {
        // init
        spyOn(ModuleListService, 'getFromStorage').and.returnValue([{name: 'modulename', credits: 3, grade: 2}, {name: 'modulename2', credits: 3, grade: 2}]);
        var scope = createCtrl();
        // when
        scope.delete(1);
        //then
        expect(scope.moduleList.length).toEqual(1);
        expect(scope.moduleList[0].name).toEqual('modulename');
    });

    it('should update ModuleListService on delete', function () {
        // init
        spyOn(ModuleListService, 'getFromStorage').and.returnValue([{name: 'modulename', credits: 3, grade: 2}, {name: 'modulename2', credits: 3, grade: 2}]);
        spyOn(ModuleListService, 'writeToStorage');
        var scope = createCtrl();
        // when
        scope.delete(1);
        //then
        expect(ModuleListService.writeToStorage).toHaveBeenCalled();
    });

    it('should handle save', function () {
        // init
        spyOn(ModuleListService, 'getFromStorage').and.returnValue([]);
        spyOn(ModuleListService, 'writeToStorage').and.returnValue([]);
        var scope = createCtrl();
        scope.module = {
            name: 'modulename',
            credits: 3,
            grade: 2
        };
        //when
        scope.save();
        //then
        expect(scope.moduleList.length).toEqual(1);
        expect(scope.module).toEqual({});
        expect(ModuleListService.writeToStorage).toHaveBeenCalled();
    });
});