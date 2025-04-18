import { expect, Page } from "@playwright/test";

class ProductPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectCategoryOfProduct(index: number): Promise<void> {
    const numberOfElements = await this.page.locator("ul[class='product-categories'] > li").count();
    for (let i = 0; i < numberOfElements; i++) {
      const element = this.page.locator("ul[class='product-categories'] > li").nth(i);
    }
  }

  async verifyProduct(name: string): Promise<void> {
    const productName = await this.page.locator("h1[class='product_title entry-title']").textContent();
    expect(productName).toContain(name);
  }
}

export default ProductPage;
