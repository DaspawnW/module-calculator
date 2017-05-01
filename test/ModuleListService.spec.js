/**
 * Created by bjoern-mbp on 01.05.17.
 */
describe('ModuleListService test', function () {

    var $controller, $rootScope, ModuleListService;
    var serializedModuleList = '[{"name":"asd","credits":2,"grade":2}]';

    beforeEach(module('calculator'));

    beforeEach(inject(function (_ModuleListService_) {
        ModuleListService = _ModuleListService_;
    }));

    it('should get empty list from storage and return', function () {
        // init
        spyOn(localStorage, 'getItem').and.returnValue(null);
        // when
        var moduleList = ModuleListService.getFromStorage();
        // then
        expect(localStorage.getItem).toHaveBeenCalledWith('moduleList');
        expect(moduleList).toEqual([]);
    });

    it('should parse item from local storage and return', function () {
        // init
        spyOn(localStorage, 'getItem').and.returnValue(serializedModuleList);
        // when
        var moduleList = ModuleListService.getFromStorage();
        // then
        expect(moduleList.length).toEqual(1);
        expect(moduleList[0]).toEqual({
            name: 'asd',
            credits: 2,
            grade: 2
        });
    });

    it('should write moduleList to local storage', function () {
        // init
        spyOn(localStorage, 'setItem');
        var moduleList = JSON.parse(serializedModuleList);
        // when
        ModuleListService.writeToStorage(moduleList);
        // then
        expect(localStorage.setItem).toHaveBeenCalledWith('moduleList', serializedModuleList);
    });

    it('should sum grades and calc average', function () {
        // init
        var moduleList = [{grade: 1}, {grade: 2}, {grade: 3}];
        // when
        var sum = ModuleListService.calcSum(moduleList);
        // then
        expect(sum).toEqual(2);
    });

    it('should return 0 if division by 0', function () {
        // init
        var moduleList = [];
        // when
        var sum = ModuleListService.calcSum(moduleList);
        // then
        expect(sum).toEqual(0);
    });
});