import { Page, expect } from "@playwright/test";
import Utils from "../PageObject/utils";

class HomePage {
  private page: Page;
  private utils: Utils;

  constructor(page: Page, utils: Utils) {
    this.page = page;
    this.utils = utils;
  }

  async selectLogInPage(): Promise<void> {
    await this.page.locator("li[id='menu-item-201'] > a").click();
    await this.utils.isStringContains("div[class='u-column2 col-2'] > h2", "Zarejestruj się");
  }
}

export default HomePage;
