import { TrclientPage } from './app.po';

describe('trclient App', () => {
  let page: TrclientPage;

  beforeEach(() => {
    page = new TrclientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
