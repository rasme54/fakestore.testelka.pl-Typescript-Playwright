import { expect, Page, Locator } from "@playwright/test";

class ProductPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyProduct(name: string): Promise<void> {
    const productName = await this.page.locator("h1[class='product_title entry-title']").textContent();
    expect(productName).toContain(name);
  }

  async selectCategoryOfProduct(index: number): Promise<void> {
    /**
     * 1 - Windsurfing
     * 2 - Wspinaczka
     * 3 - Yoga i pilates
     * 4 - Żeglarstwo
     */
    const option = index - 1;
    await this.page.locator("ul[class='product-categories'] > li > a").nth(option).click();
  }
}

export default ProductPage;
