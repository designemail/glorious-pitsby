describe('Viewport', () => {
  let compile, element;

  beforeEach(() => {
    angular.mock.module('app');
    inject(($rootScope, $compile) => {
      const scope = $rootScope.$new(true);
      compile = (content = '') => {
        const template = `<p-viewport>${content}</p-viewport>`;
        element = $compile(template)(scope);
        scope.$digest();
      };
    });
  });

  it('should have appropriate css class', () => {
    compile();
    expect(element.find('div').attr('class')).toEqual('p-viewport');
  });

  it('should transclude some content', () => {
    compile('<h1>Hello!</h1>');
    expect(element.find('h1').text()).toEqual('Hello!');
  });
});