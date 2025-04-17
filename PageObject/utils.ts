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

  async compareElement(firstElement: any, secondElement: any): Promise<void> {
    expect(firstElement).toEqual(secondElement);
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

  async gatherElementsIntoArray(locator: any, collectingTextContent?: boolean): Promise<Array<any>> {
    /**
     * allowed types of elements:
     * locator
     * string (textContent())
     */
    let arrayOfElements: any[] = [];
    const numberOfElements = await this.page.locator(locator).count();
    const element = this.page.locator(locator);
    if (collectingTextContent) {
      for (let i = 0; i < numberOfElements; i++) {
        const text = await element.nth(i).textContent();
        arrayOfElements.push(text);
      }
      return arrayOfElements;
    } else {
      for (let i = 0; i < numberOfElements; i++) {
        arrayOfElements.push(element.nth(i));
      }
      return arrayOfElements;
    }
  }

  async gatherSigleElementIntoVariable(locator: string, index?: number): Promise<any> {
    if (index) {
      index -= 1;
      const element = await this.page.locator(locator).nth(index).textContent();
      return element;
    } else {
      const element = await this.page.locator(locator).textContent();
      return element;
    }
    // const element = this.page.locator(locator);
    // const text = await element.textContent();
    // return text;
    // const option = index - 1;
    // const categoryName = await this.page.locator(locator).nth(option).innerText();
    // return categoryName;
  }
}

export default Utils;
