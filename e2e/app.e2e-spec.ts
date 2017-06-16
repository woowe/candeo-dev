import { SvgTestPage } from './app.po';

describe('svg-test App', () => {
  let page: SvgTestPage;

  beforeEach(() => {
    page = new SvgTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
