import { browser, by, element, ElementFinder } from 'protractor';

export class MyActivitiesPage {
  pause() {
    browser.pause();
  }

  waitOnEnabledElement(el) {
    browser.wait(function() {
      return el.isEnabled();
    }, 5000);
  }

  waitOnDisplayedElement(el) {
    browser.wait(function() {
      return el.isDisplayed();
    }, 5000);
  }

  enterRepl() {
    browser.enterRepl();
  }

  navigateTo() {
    browser.wait(browser.get('/myactivities'));
  }

  getNewActivityButton() {
    return element(by.id('button-add-activity'));
  }

  getDisplayedDetailsElement() {
    // only one card-body class element is displayed at a time
    return element(by.css('.card-body'));
  }

  getActivityName() {
    return element(by.id('nameField'));
  }

  getSaveButton() {
    return element(by.css('.buttonSave'));
  }

  setActivityName(name: string): void {
     this.getActivityName().sendKeys(name);
  }

  getPanelElementByIndex(index: number) {
    return element.all(by.css('.card-header')).get(index);
  }
}
