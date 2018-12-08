import { AppPage } from './app.po';
import { MyActivitiesPage } from './myactivities.po';
import { protractor, browser } from 'protractor';

describe('Home Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should show title', () => {
    expect(page.getTitleText()).toBeTruthy();
  });

});

describe('myactivities', () => {
  let page: MyActivitiesPage;

  beforeEach(() => {
    page = new MyActivitiesPage();
    page.navigateTo();
  });

  it('should add an activity', () => {
    page.getNewActivityButton().click();
    page.getActivityName().isDisplayed().then(function (isVisible) {
      expect(isVisible).toBeTruthy();
    });

    page.setActivityName('TestName');

    page.waitOnEnabledElement(page.getSaveButton());
    page.getSaveButton().click();

    page.waitOnDisplayedElement(page.getPanelElementByIndex(1));
    // panel index 1 is the panel after "New Activity" panel
    page.getPanelElementByIndex(1).getText().then((text) => {
      expect(text).toContain('TestName');
    });

  });

});
