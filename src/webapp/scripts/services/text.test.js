import textService from './text';

describe('Text Service', () => {
  it('should remove first line when it\'s empty', () => {
    const text = `
second line
third line`;
    expect(textService.removeBlankFirstLine(text)).toEqual(`second line
third line`);
  });

  it('should not remove first line when it\'s not empty', () => {
    const text = 'first line';
    expect(textService.removeBlankFirstLine(text)).toEqual('first line');
  });
});
