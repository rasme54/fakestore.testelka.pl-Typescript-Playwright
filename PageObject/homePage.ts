import { Page } from "@playwright/test";

class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectLogInPage(): Promise<void> {
    await this.page.locator("li[id='menu-item-201'] > a").click();
  }
}

export default HomePage;
