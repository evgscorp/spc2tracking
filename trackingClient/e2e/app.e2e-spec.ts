import { TrackingClientPage } from './app.po';

describe('tracking-client App', () => {
  let page: TrackingClientPage;

  beforeEach(() => {
    page = new TrackingClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
