import { test, expect, Page, Locator } from "@playwright/test";

class Utils {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async areElementsVisible(elements: Array<any>): Promise<void> {
    for (const element of elements) {
      const locator = element;
      await expect(locator).toBeVisible();
    }
  }

  async compareElement(firstElement: any, secondElement: any): Promise<void> {
    expect(firstElement).toEqual(secondElement);
  }

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

  async normalizeText(text: string): Promise<string> {
    const normalizedString = text.replace(/\u2013/g, "-").trim();
    return normalizedString;
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

  async gatherElementsIntoArray(locator: any, collectingTextValue?: boolean, useInnerTextMethod?: boolean): Promise<Array<any>> {
    /**
     * allowed types of elementsto gather:
     *  - locator
     *  - string (textContent(), innerText())
     *
     * methods of gatering data:
     * if collectingTextValue == true:
     *  - innerText() if useInnerTextMethod == true
     *  - textContent() if useInnerTextMethod == false/null
     *
     * if collectingTextValue == false/null:
     *  - assigning locators into array
     */
    let arrayOfElements: any[] = [];
    const numberOfElements = await this.page.locator(locator).count();
    //const element = this.page.locator(locator);
    if (collectingTextValue) {
      if (useInnerTextMethod) {
        for (let i = 0; i < numberOfElements; i++) {
          const text = await this.page.locator(locator).nth(i).textContent();
          arrayOfElements.push(text);
        }
      } else {
        for (let i = 0; i < numberOfElements; i++) {
          const text = await this.page.locator(locator).nth(i).textContent();
          arrayOfElements.push(text);
        }
      }
      return arrayOfElements;
    } else {
      for (let i = 0; i < numberOfElements; i++) {
        arrayOfElements.push(locator);
      }
      return arrayOfElements;
    }
  }

  async gatherSingleElementIntoVariable(locator: string, index?: number): Promise<any> {
    if (index != null) {
      const element = await this.page.locator(locator).nth(index).textContent();
      return element;
    } else {
      const element = await this.page.locator(locator).textContent();
      return element;
    }
  }

  async scrollIntoElement(element: string): Promise<void> {
    await this.page.locator(element).scrollIntoViewIfNeeded();
  }

  async waitUntilElementsAreVisible(locator: Array<string>): Promise<void> {
    const numberOfElements = locator.length;
    for (let i = 0; i < numberOfElements; i++) {
      const element = this.page.locator(locator[i]).nth(i);
      await expect(element).toBeVisible();
    }
  }
}

export default Utils;
