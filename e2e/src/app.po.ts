import { browser } from 'protractor';

export class AppPage {
  navigateTo() {
    browser.wait(browser.get('/'));
  }

  getTitleText() {
    return browser.getTitle();
  }
}
