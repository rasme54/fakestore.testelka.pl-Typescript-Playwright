import { test, expect, Page, Locator } from "@playwright/test";

class Utils {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async areElementsVisible(elements: Array<Locator>): Promise<void> {
    for (const element of elements) {
      const locator = element;
      await expect(locator).toBeVisible();
    }
  }

  // async isElementVisible(locator: string): Promise<void> {
  //   const element = this.page.locator(locator);
  //   expect(element).toBeVisible();
  // }

  async isPageValid(urlString: string): Promise<void> {
    const url = this.page.url();
    expect(url).toContain(urlString);
  }

  async isStringContains(locator: string, string: string): Promise<void> {
    const element = this.page.locator(locator);
    expect(element).toBeVisible();
    await element.textContent().then((text) => {
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

  async gatherElementsIntoArray(locator: string): Promise<Array<any>> {
    let arrayOfElements: Locator[] = [];
    const element = this.page.locator(locator);
    const numberOfElements = await this.page.locator(locator).count();
    for (let i = 0; i < numberOfElements; i++) {
      arrayOfElements.push(element.nth(i));
    }
    return arrayOfElements;
  }
}

export default Utils;
