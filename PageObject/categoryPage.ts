import { Page, expect } from "@playwright/test";

class CategoryPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectProduct(number: number): Promise<void> {
    const product = this.page.locator("ul[class='products columns-3'] > li > a[class='woocommerce-LoopProduct-link woocommerce-loop-product__link']");
    await product.nth(number).click();
  }

  async collectCategoryNameIntoVariable(locator: string, index: number): Promise<string> {
    const option = index - 1;
    const categoryName = await this.page.locator(locator).nth(option).innerText();
    return categoryName;
  }
}

export default CategoryPage;
