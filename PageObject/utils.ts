import { test, expect, Page } from "@playwright/test";

class Utils {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async isPageValid(urlString: string): Promise<void> {
    const url = this.page.url();
    expect(url).toContain(urlString);
  }

  async isStringContians(locator: string, string: string): Promise<void> {
    await this.page
      .locator(locator)
      .textContent()
      .then((text) => {
        expect(text).toContain(string);
      });
  }

  async isStringVisible(locator: string, string: string): Promise<void> {
    await this.page
      .locator(locator)
      .textContent()
      .then((text) => {
        expect(text).toContain(string);
      });
  }

  async turnOffPopUp(locator: string, button: string): Promise<void> {
    const element = this.page.locator(locator);
    if (element) {
      await this.page.locator(button).click();
    }
  }
}

export default Utils;
