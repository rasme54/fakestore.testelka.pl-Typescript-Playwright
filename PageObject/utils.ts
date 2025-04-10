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

  async isStringContians(locator: string, expectedString: string): Promise<void> {
    const element = this.page.locator(locator);
    expect(element).toBeVisible();
    await element.textContent().then((text) => {
      expect(text).toContain(expectedString);
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
  async selectFromDropdown(value: string): Promise<void> {
    await this.page.locator("span[class='select2-selection__arrow']").click({ force: true });
    await this.page.locator("input[class='select2-search__field']").fill(value);
    await this.page.keyboard.press("Enter");
  }

  async turnOffPopUp(locator: string, button: string): Promise<void> {
    const element = this.page.locator(locator);
    if (element) {
      await this.page.locator(button).click();
    }
  }
}

export default Utils;
