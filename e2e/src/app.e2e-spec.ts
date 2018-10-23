import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should show title', () => {
    page.navigateTo();

    expect(page.getHeaderText()).toBeTruthy();
  });
});
